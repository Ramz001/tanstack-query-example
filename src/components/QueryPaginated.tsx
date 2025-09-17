"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { User } from "./user.types";
import { fetchUsersPaginated, PER_PAGE } from "./user.action";

export default function QueryPaginated() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users", page],
    queryFn: () => fetchUsersPaginated(page),
  });

  if (isLoading)
    return <div className="text-center text-white">Loading...</div>;
  if (isError)
    return (
      <div className="text-center text-red-500">Error: {error.message}</div>
    );

  if (!data?.users || data.users?.length === 0) {
    return <div className="text-center text-neutral-400">No users found</div>;
  }

  const totalPages = Math.ceil(data.total / PER_PAGE);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.users.map((user: User) => (
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
      <div className="flex justify-center items-center gap-4 mt-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-neutral-600 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <span className="text-white">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page === totalPages}
          className="px-4 py-2 bg-neutral-600 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
}
