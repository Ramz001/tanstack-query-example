"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { User } from "./user.types";
import { fetchUsersInfinite } from "./user.action";

export default function QueryInfinite() {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ["users", "infinite"],
    queryFn: fetchUsersInfinite,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const total = lastPage.total; // API returns total count
      const loaded = allPages.flatMap((page) => page.users).length;
      return loaded < total ? loaded : undefined;
    },
  });

  if (isLoading) {
    return <div className="text-center text-white">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="text-center text-red-500">Error: {error.message}</div>
    );
  }

  const users = data?.pages.flatMap((page) => page.users) ?? [];

  if (users.length === 0) {
    return <div className="text-center text-neutral-400">No users found</div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user: User) => (
          <div
            key={user.id}
            className="bg-neutral-700 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-neutral-600"
          >
            <div className="flex items-center space-x-4">
              <img
                src={user.image}
                alt={`${user.firstName} ${user.lastName}`}
                className="w-12 h-12 rounded-full object-cover border-2 border-neutral-500"
                onError={(e) =>
                  (e.currentTarget.src = "https://via.placeholder.com/48")
                }
                tabIndex={0}
                aria-label={`Profile image of ${user.firstName} ${user.lastName}`}
              />
              <div>
                <h2 className="text-lg font-semibold text-white">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-sm text-neutral-300">{user.email}</p>
              </div>
            </div>
            <div className="mt-3 text-neutral-200">
              <p className="text-sm">
                <span className="font-medium">Age:</span> {user.age}
              </p>
              <p className="text-sm">
                <span className="font-medium">Role:</span> {user.role}
              </p>
              <p className="text-sm">
                <span className="font-medium">Company:</span>{" "}
                {user.company.name} ({user.company.title})
              </p>
              <p className="text-sm">
                <span className="font-medium">Location:</span>{" "}
                {user.address.city}, {user.address.state}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        {hasNextPage && (
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 disabled:opacity-50"
          >
            {isFetchingNextPage ? "Loading more..." : "Load More"}
          </button>
        )}
      </div>
    </div>
  );
}
