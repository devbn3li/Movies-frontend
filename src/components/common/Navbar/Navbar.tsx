"use client";
import { useEffect, useState, useRef } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) setUser(JSON.parse(userData));
  }, []);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleClickOutside = (event: any) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (dropdownRef.current && !(dropdownRef.current as any).contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    router.push("/");
    window.location.reload();
  };

  return (
    <div className="p-4 flex justify-between items-center border-b border-[#333333] sm:px-20 sticky top-0 dark:bg-black bg-white z-50">
      <Link href="/" className="text-xl font-bold">
        Movie Zone
      </Link>

      <div className="flex items-center gap-4 relative" ref={dropdownRef}>
        <ThemeToggle />

        {user ? (
          <div className="relative">
            <Image
              src={user.avatar || "/Images/default.png"}
              alt="Avatar"
              width={36}
              height={36}
              className="rounded-full border cursor-pointer"
              onClick={() => setOpen((prev) => !prev)}
            />
            {open && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border rounded shadow z-50 p-2">
                <div className="px-3 py-2 border-b text-sm text-gray-700 dark:text-white">
                  {user.name}
                </div>
                <Link
                  href="/profile"
                  className="block px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                  onClick={() => setOpen(false)}
                >
                  Profile
                </Link>
                {user.isAdmin && (
                <Link
                  href="/dashboard"
                  className="block px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                  onClick={() => setOpen(false)}
                >
                  Dashboard
                </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            href="/login"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Register / Login
          </Link>
        )}
      </div>
    </div>
  );
}
