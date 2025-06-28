"use client";
import axios from "@/lib/axios";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import defmovie from "../../../../public/Images/movie.jpg";

type Movie = {
  _id: string;
  title: string;
  description: string;
  posterUrl: string;
  type: string;
  language: string;
  genre: string[];
  length: number;
  cast: string[];
  averageRating?: number;
};

export default function MoviePage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`/movies/${movieId}`);
        setMovie(response.data);
      } catch (error) {
        console.error("Failed to fetch movie", error);
      }
    };

    if (movieId) {
      fetchMovie();
    }
  }, [movieId]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center p-6">
      <div className="mb-4">
        <Image
          src={movie.posterUrl || defmovie}
          alt={movie.title}
          className="object-cover rounded mb-4"
          width={300}
        />
      </div>
      <div className="flex justify-between gap-5">
        <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
        <span className="text-sm text-yellow-600">⭐ {typeof movie.averageRating === "number" ? movie.averageRating.toFixed(1) : "0.0"}</span>
      </div>
      <p className="text-sm mb-1">{movie.type.toUpperCase()} | {movie.language} | {movie.length} {movie.type === "movie" ? "min" : "Eposide"}</p>
      <p className="mb-2">{movie.description}</p>
      <p>{movie.cast.join(", ")}</p>
    </div>
  );
}
