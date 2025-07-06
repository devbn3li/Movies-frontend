"use client";
import { useState, useEffect } from "react";
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
import moviesData from "@/assets/movies.json";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { Movie } from "@/types/index";
import Loading from "@/components/Loading";
import Head from "next/head";


const ITEMS_PER_PAGE = 24;

export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // Simulate loading data (since moviesdb.json is static)
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500));
      setMovies(moviesData as Movie[]);
      setIsLoading(false);
    };
    loadData();
  }, []);

  const data = movies;

  const filtered = data.filter((item) => {
    return item.title.toLowerCase().includes(search.toLowerCase());
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <>
      <Head>
        <title>Movies - MovieZone</title>
        <meta name="description" content="Explore our wide collection of movies, search and paginate through your favorites." />
        <meta property="og:title" content="Movies - MovieZone" />
        <meta property="og:description" content="Browse trending and popular movies on MovieZone." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://moviezonee.mooo.com/main-movies" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Movies - MovieZone" />
        <meta name="twitter:description" content="Find your next favorite movie now." />
      </Head>
      <div className="p-5 sm:px-20 pb-20 flex flex-col pt-15">
        <div className="flex w-full justify-center items-center mb-4 gap-5">

          <Input
            placeholder="Search..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full sm:mx-25"
            type="search"
            autoComplete="on"
            disabled={isLoading}
          />
        </div>


        <CardsGrid items={paginated} type="movie" isLoading={isLoading} />


        {!isLoading && filtered.length > ITEMS_PER_PAGE && (<div className="flex justify-center w-full">
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
        </div>)}
      </div>
    </>
  );
}

function CardsGrid({
  items,
  isLoading,
}: {
  items: Movie[];
  type: "movie";
  isLoading: boolean;
}) {
  if (!items) {
    return <Loading />;
  }

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

  if (items.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">No results found</p>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center">
      <div
        className="grid justify-center px-20 pb-20"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
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
              alt={item.title}
              width={230}
              height={340}
              className="rounded-2xl object-cover h-auto mb-2 hover:scale-105 transition-transform duration-300 ease-in-out"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}