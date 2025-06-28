"use client";
import { useEffect, useState } from "react";
import { getAllMovies } from "@/lib/api";
import Image from "next/image";
import defmovie from "../../public/Images/movie.jpg";

type Movie = {
  _id: string;
  title: string;
  description: string;
  posterUrl: string;
  type: string;
  language: string;
  length: number;
  genre: string[];
  averageRating?: number;
};

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllMovies();
        setMovies(data.movies);
      } catch (err) {
        console.error("❌ Failed to fetch movies", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">🎬 Movies & Series</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <div key={movie._id} className="flex flex-col items-center rounded p-4 cursor-pointer border border-[#1E1E1E] dark:border-[#333333] dark:hover:border-[#555555] duration-200"
            onClick={() => {
              window.location.href = `/movies/${movie._id}`;
            }}
          >
            <Image
              src={movie.posterUrl || defmovie}
              alt={movie.title}
              className="object-cover rounded mb-2"
              loading="lazy"
            />
            <div className="flex justify-between gap-5 items-center">
              <h2 className="text-xl font-semibold">{movie.title}</h2>
              <div className="text-sm text-yellow-600">⭐ {typeof movie.averageRating === "number" ? movie.averageRating.toFixed(1) : "0.0"}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
