import { Metadata } from "next";
import mediaData from "@/assets/moviesdb.json";
import { Movie, TVShow } from "@/types/index";
import MoviePage from "./MoviePage";

type PageProps = {
  params: { movieId: string };
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { movies, tv_shows } = mediaData as {
    movies: Movie[];
    tv_shows: TVShow[];
  };

  const id = Number(params.movieId);
  const all = [...movies, ...tv_shows];
  const item = all.find((m) => m.id === id);
  if (!item) return {};

  const title = "title" in item ? item.title : item.name;
  const description = item.overview || "Watch your favorite content now.";
  const url = `https://moviezonee.mooo.com/movie/${item.id}`;

  return {
    title: `${title} - Movie Zone`,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: item.poster_url, width: 1200, height: 630, alt: title }],
      type: "article",
      url,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [item.poster_url],
    },
    alternates: {
      canonical: url,
    },
  };
}

export default function Page({ params }: PageProps) {
  return <MoviePage movieId={String(params.movieId)} />;
}
