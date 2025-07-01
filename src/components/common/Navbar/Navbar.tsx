"use client";
import { useEffect, useState, useRef } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu"
import { LuLogOut } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { CgProfile } from "react-icons/cg";
import { RxDashboard } from "react-icons/rx";

export default function Navbar() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) setUser(JSON.parse(userData));
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Image
                src={user.avatar || "/Images/default.png"}
                alt="Avatar"
                width={36}
                height={36}
                className="rounded-full border cursor-pointer"
              />
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <Link href="/profile" passHref>
                  <DropdownMenuItem>
                    Profile
                    <DropdownMenuShortcut><CgProfile /></DropdownMenuShortcut>
                  </DropdownMenuItem>
                </Link>

                {user.isAdmin && (
                  <Link href="/dashboard" passHref>
                    <DropdownMenuItem>
                      Dashboard
                      <DropdownMenuShortcut><RxDashboard /></DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </Link>
                )}
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onSelect={() => {
                  handleLogout();
                }}
                className="text-red-600"
              >
                Log out
                <DropdownMenuShortcut><LuLogOut /></DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button>
            <Link
              href="/login"
              className=" px-4 py-2 rounded"
            >
              Register / Login
            </Link>
          </Button>
        )}

      </div>
    </div>
  );
}
