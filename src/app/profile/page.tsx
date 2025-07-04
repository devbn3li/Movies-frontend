"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

const Profile = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="flex flex-col justify-start items-center p-6">
      <Image
        src={user.avatar || "/Images/default.svg"}
        alt="Avatar"
        width={200}
        height={200}
        className="rounded-full border cursor-pointer"

      />
      <p className="text-gray-700 dark:text-gray-300 text-4xl font-bold mt-2">{user.name}</p>
      <p className="text-gray-700 dark:text-gray-300">{user.email}</p>
      <p className="text-gray-700 dark:text-gray-300">{user.country}</p>
    </div>
  );
};

export default Profile;
