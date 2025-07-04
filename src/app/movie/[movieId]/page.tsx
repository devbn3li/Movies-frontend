"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import mediaData from "@/assets/moviesdb.json";
import { notFound } from "next/navigation";
import { Movie, TVShow } from "@/types/index";
import { useMemo } from "react";

type Media = Movie | TVShow;

export default function MoviePage() {
  const params = useParams();

  const movieId = useMemo(() => {
    if (!params?.movieId || Array.isArray(params.movieId)) return null;
    return Number(params.movieId);
  }, [params]);

  const { movies, tv_shows } = mediaData as {
    movies: Movie[];
    tv_shows: TVShow[];
  };

  const all: Media[] = [...movies, ...tv_shows];
  const item = all.find((m) => m.id === movieId);

  if (!item) return notFound();

  const title = "title" in item ? item.title : item.name;
  const imageSrc = item.backdrop_url || item.poster_url || "/placeholder.jpg";

  return (
    <div className="relative min-h-screen">
      {/* 💠 Background Blur Layer */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat bg-fixed blur-2xl opacity-30"
        style={{
          backgroundImage: `url(${imageSrc})`,
        }}
      />

      {/* 💠 Page Content */}
      <div className="flex flex-col items-center p-6 mt-5">
        <div className="mb-4">
          <Image
            src={imageSrc}
            alt={title}
            className="object-cover mb-4 aspect-video rounded-2xl shadow-xl"
            width={1080}
            height={480}
          />
        </div>

        <div className="max-w-[1080px] w-full border border-white/20 p-6 rounded-2xl bg-white/10 backdrop-blur-md shadow-xl">
          <div className="flex items-center justify-between gap-5 mb-4 w-full">
            <h1 className="text-2xl font-bold text-white">{title}</h1>
            <span className="text-xl text-yellow-400">
              ⭐{" "}
              {typeof item.vote_average === "number"
                ? item.vote_average.toFixed(1)
                : "0.0"}
            </span>
          </div>
          <p className="mb-2 text-white">
            {item.overview || "No description available."}
          </p>
        </div>
      </div>
    </div>
  );
}
