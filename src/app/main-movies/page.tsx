import type { Metadata } from "next";
import MoviesPage from "./MoviesPage";

export const metadata: Metadata = {
  title: "Movies - Movie Zone",
  description: "Browse the best movies available on Movie Zone.",
  openGraph: {
    title: "Movies - Movie Zone",
    description: "Browse the best movies available on Movie Zone.",
    url: "https://moviezonee.mooo.com/main-movies",
    type: "website",
    images: [
      {
        url: "https://moviezonee.mooo.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Movies - Movie Zone",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Movies - Movie Zone",
    description: "Browse the best movies available on Movie Zone.",
    images: ["https://moviezonee.mooo.com/og-image.png"],
  },
};

export default function Page() {
  return <MoviesPage />;
}