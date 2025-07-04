"use client";
import { useParams } from "next/navigation";
import Image from "next/image";
import mediaData from "@/assets/moviesdb.json";
import { notFound } from "next/navigation";
import { Movie, TVShow } from "@/types/index";

type Media = Movie | TVShow;

export default function MoviePage() {
  const { movieId } = useParams();

  const { movies, tv_shows } = mediaData as {
    movies: Movie[];
    tv_shows: TVShow[];
  };

  const all: Media[] = [...movies, ...tv_shows];
  const item = all.find((m) => m.id === Number(movieId));

  if (!item) return notFound();

  const title = "title" in item ? item.title : item.name;
  return (
    <div className="flex flex-col items-center p-6 sm:w-[520px] mx-auto">
      <div className="mb-4">
          <Image
            src={item.backdrop_url || item.poster_url}
            alt={title}
            className="object-cover rounded mb-4"
            width={500}
            height={300}
          />
      </div>
      <div className="flex items-center justify-between gap-5 mb-4 w-full">
        <h1 className="text-2xl font-bold">{title}</h1>
        <span className="text-xl text-yellow-600">⭐ {typeof item.vote_average === "number" ? item.vote_average.toFixed(1) : "0.0"}</span>
      </div>
      <p className="mb-2">{item.overview}</p>
    </div>
  );
}
