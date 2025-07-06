import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
}

const TrendingNow = ({ type, title, isLarge }: { type: "movie" | "tv"; title: string; isLarge: boolean }) => {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);

  useEffect(() => {
    console.log("Trending movie IDs:", trendingMovies.map(m => m.id));
  }, [trendingMovies]);

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/trending/${type}/day?language=en-US`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
      }
    };

    fetch(url, options)
      .then(res => res.json())
      .then(data => {
        const filtered = data.results.filter((movie: Movie) => movie.poster_path);
        setTrendingMovies(filtered);
      })
      .catch(err => console.error(err));
  }, [type]);

  if (!trendingMovies.length) return null;

  return (
    <div className={`${isLarge ? "w-full" : "max-w-[1080px]"} w-full mt-10 relative px-2`}>
      <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-bold text-white mb-4">
        Trending {title ? title : "Now"}
      </h2>

      <Carousel opts={{ align: "center" }} className="w-full relative">
        <CarouselContent>
          {trendingMovies.map((movie) => (
            <CarouselItem
              key={movie.id}
              className="
                basis-[90%] 
                sm:basis-[50%] 
                md:basis-[33.33%]
                lg:basis-[25%]
                xl:basis-[20%]
                flex justify-center
              "
            >
              <Link href={`/movie/${movie.id}`} className="p-2">
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title || "Trending Movie"}
                  className="object-cover h-auto rounded-2xl hover:scale-105 transition-transform duration-300"
                  width={280}
                  height={420}
                />
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Buttons */}
        <CarouselPrevious className="left-[-10px] sm:left-[-20px]" />
        <CarouselNext className="right-[-10px] sm:right-[-20px]" />
      </Carousel>
    </div>
  );
};

export default TrendingNow;
