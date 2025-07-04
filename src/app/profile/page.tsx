"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Loading from "@/components/Loading";

const Profile = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) return <Loading />;

  return (
    <div className="flex flex-col items-center p-6 pt-10">
      {user.profilePicture ? (
        <Image
          src={user.profilePicture}
          alt="Avatar"
          width={200}
          height={200}
          className="rounded-full border cursor-pointer"
        />
      ) : (
        <div className="w-48 h-48 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
          <span className="text-gray-500 dark:text-gray-400 text-9xl font-bold">{user.name.slice(0, 1)}</span>
        </div>
      )}
      <p className="text-gray-700 dark:text-gray-300 text-4xl font-bold mt-2">{user.name}</p>
      <p className="text-gray-700 dark:text-gray-300">{user.email}</p>
      <p className="text-gray-700 dark:text-gray-300">{user.country}</p>
    </div>
  );
};

export default Profile;
