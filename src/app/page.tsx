"use client";
import TrendingNow from "@/components/TrendingNow";
import poster from "@/assets/larg_bg_en.jpg";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="flex flex-col">

      <div className="relative h-[calc(100vh-4rem)] w-full overflow-hidden">
        <Image
          src={poster}
          alt="Background"
          fill
          className="object-cover"
          priority
        />

        <div className="absolute inset-0 bg-black/60 z-10" />

        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="text-[4rem] font-bold text-white drop-shadow-md max-w-3xl">
            Unlimited movies, TV shows, and more
          </h1>
          <p className="text-lg text-white/80 mt-4 max-w-2xl">
            It&apos;s free. Enjoy your favorite movies and TV shows without any interruptions.
          </p>
        </div>
      </div>

      <div className="p-5 sm:px-20 pb-20 flex flex-col">
        <TrendingNow type="movie" title="Movies" isLarge={true} />
        <TrendingNow type="tv" title="TV Shows" isLarge={true} />
      </div>
    </div>
  );
}
