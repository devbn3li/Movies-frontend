"use client"
import { useEffect, useMemo, useState } from "react"
import mediaData from "@/assets/moviesdb.json"
import { Movie, TVShow } from "@/types/index"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Pencil, Trash2, Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import Image from "next/image"
import Link from "next/link"
const ITEMS_PER_PAGE = 10

const DashboardPage = () => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [tvShows, setTvShows] = useState<TVShow[]>([])
  const [tab, setTab] = useState<"movies" | "tv">("movies")
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)

  useEffect(() => {
    setMovies((mediaData as { movies: Movie[] }).movies)
    setTvShows((mediaData as { tv_shows: TVShow[] }).tv_shows)
  }, [])

  const handleDelete = (id: number) => {
    if (tab === "movies") {
      setMovies((prev) => prev.filter((item) => item.id !== id))
    } else {
      setTvShows((prev) => prev.filter((item) => item.id !== id))
    }
  }

  const data = tab === "movies" ? movies : tvShows

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const title = "title" in item ? item.title : item.name
      return title.toLowerCase().includes(search.toLowerCase())
    })
  }, [data, search])

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE)

  const paginated = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE
    return filteredData.slice(start, start + ITEMS_PER_PAGE)
  }, [filteredData, page])

  return (
    <div className="p-5 sm:px-20 pb-20">
      <div className="flex justify-between items-center mb-4 gap-3 flex-wrap">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Button className="flex gap-2">
          <Plus size={16} />
          Add {tab === "movies" ? "Movie" : "TV Show"}
        </Button>
      </div>

      <Tabs defaultValue="movies" onValueChange={(val) => {
        setTab(val as "movies" | "tv")
        setPage(1)
        setSearch("")
      }}>
        <TabsList className="mb-4">
          <TabsTrigger value="movies">Movies</TabsTrigger>
          <TabsTrigger value="tv">TV Shows</TabsTrigger>
        </TabsList>

        <Input
          placeholder="Search..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setPage(1)
          }}
          className="max-w-sm mb-4"
        />

        <TabsContent value={tab}>
          {paginated.length === 0 ? (
            <p className="text-gray-500">No results found.</p>
          ) : (
            <div         className="grid gap-6 justify-center"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          width: "100%",
        }}>
              {paginated.map((item) => (
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
                  <h2 className="text-lg font-semibold mb-2">
                    {"title" in item ? item.title : item.name}
                  </h2>
                  <div className="flex justify-between gap-2">
                    <Button variant="outline" size="sm" className="flex gap-1 items-center">
                      <Pencil size={16} /> Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="flex gap-1 items-center"
                      onClick={() => handleDelete(item.id)}
                    >
                      <Trash2 size={16} /> Delete
                    </Button>
                  </div>
                </Link>
              ))}
            </div>
          )}

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
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default DashboardPage
