"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center py-4 w-full border-t border-[#333333]">
      <p>© {new Date().getFullYear()} Movie Zone</p>
      <Link href="https://github.com/devbn3li">devbn3li</Link>
    </footer>
  );
}
