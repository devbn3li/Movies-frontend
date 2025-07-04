"use client";
import { useState, useEffect } from "react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Image from "next/image";
import mediaData from "@/assets/moviesdb.json";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { Movie, TVShow } from "@/types/index";

const ITEMS_PER_PAGE = 10;

export default function HomePage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [tvShows, setTvShows] = useState<TVShow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [tab, setTab] = useState<"movies" | "tv">("movies");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // Simulate loading data (since moviesdb.json is static)
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      // Simulate a delay (remove if data is instant)
      await new Promise((resolve) => setTimeout(resolve, 500));
      setMovies((mediaData as { movies: Movie[] }).movies);
      setTvShows((mediaData as { tv_shows: TVShow[] }).tv_shows);
      setIsLoading(false);
    };
    loadData();
  }, []);

  const data = tab === "movies" ? movies : tvShows;

  const filtered = data.filter((item) => {
    const title = "title" in item ? item.title : item.name;
    return title.toLowerCase().includes(search.toLowerCase());
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <div className="p-5 sm:px-20 pb-20 flex flex-col">
      <Tabs
        defaultValue="movies"
        onValueChange={(val) => {
          setTab(val as "movies" | "tv");
          setPage(1);
          setSearch("");
        }}

      >
        <div className="flex max-md:flex-col justify-between items-center mb-4 gap-5">
          <TabsList className="max-md:w-full flex justify-center gap-5 px-[5px]">
            <TabsTrigger value="movies">Movies</TabsTrigger>
            <TabsTrigger value="tv">TV Shows</TabsTrigger>
          </TabsList>

            <Input
              placeholder="Search..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full max-w-sm"
              type="search"
              autoComplete="on"
              disabled={isLoading}
            />
        </div>

        <TabsContent value="movies">
          <CardsGrid items={paginated} type="movie" isLoading={isLoading} />
        </TabsContent>

        <TabsContent value="tv">
          <CardsGrid items={paginated} type="tv" isLoading={isLoading} />
        </TabsContent>
      </Tabs>

      <div className="flex justify-center w-full">
        <Pagination className="w-full max-w-3xl">
          <PaginationContent>
            {page > 1 && (
              <PaginationItem>
                <PaginationPrevious href="#" onClick={() => setPage(page - 1)} />
              </PaginationItem>
            )}
            {Array.from({ length: totalPages }).map((_, idx) => {
              const pageNum = idx + 1;
              const shouldShow =
                pageNum === 1 ||
                pageNum === totalPages ||
                Math.abs(pageNum - page) <= 1;
              const isEllipsisBefore = pageNum === page - 2 && pageNum !== 1;
              const isEllipsisAfter = pageNum === page + 2 && pageNum !== totalPages;

              if (isEllipsisBefore || isEllipsisAfter) {
                return (
                  <PaginationItem key={`ellipsis-${pageNum}`}>
                    <span className="px-2 text-gray-500">...</span>
                  </PaginationItem>
                );
              }

              if (!shouldShow) return null;

              return (
                <PaginationItem key={pageNum}>
                  <PaginationLink
                    href="#"
                    isActive={page === pageNum}
                    onClick={() => setPage(pageNum)}
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
            {page < totalPages && (
              <PaginationItem>
                <PaginationNext href="#" onClick={() => setPage(page + 1)} />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}

function CardsGrid({
  items,
  isLoading,
}: {
  items: (Movie | TVShow)[];
  type: "movie" | "tv";
  isLoading: boolean;
}) {
  if (isLoading) {
    // Render 12 skeleton cards to match ITEMS_PER_PAGE
    return (
      <div className="w-full flex justify-center">
        <div
          className="grid gap-6 justify-center"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            width: "100%",
          }}
        >
          {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
            <div
              key={`skeleton-${index}`}
              className="flex flex-col justify-center items-center bg-white dark:bg-black rounded-lg p-3 mx-auto"
            >
              <Skeleton className="rounded h-[450px] w-[330px] mb-2" />
              <Skeleton className="w-24 h-4 mt-2" />
              <Skeleton className="w-10 h-4 mt-2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center">
      <div
        className="grid gap-6 justify-center"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          width: "100%",
        }}
      >
        {items.filter((item) => !!item.poster_url).map((item) => (
          <Link
            href={`/movie/${item.id}`}
            key={item.id}
            className="flex flex-col justify-center items-center bg-white dark:bg-black rounded-lg p-3 mx-auto"
          >
            <Image
              src={item.poster_url}
              alt={"title" in item ? item.title : item.name}
              width={330}
              height={450}
              className="rounded object-cover mb-2"
            />
            <div className="flex flex-col items-center">
              <h2 className="font-semibold text-lg text-center">
                {"title" in item ? item.title : item.name}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {item.vote_average.toFixed(1)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}