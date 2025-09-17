"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { User } from "./user.types";
import { fetchUsers } from "./user.action";
import React from "react";

export default function QueryBasic() {
  const queryClient = useQueryClient();

  // Prefetch users (e.g., when component mounts or on hover)
  React.useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ["users"],
      queryFn: fetchUsers,
    });
  }, [queryClient]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  if (isLoading)
    return <div className="text-center text-white">Loading...</div>;
  if (isError)
    return (
      <div className="text-center text-red-500">Error: {error.message}</div>
    );
  if (!data?.users?.length)
    return <div className="text-center text-neutral-400">No users found</div>;

  return (
    <div>
      {/* Example button to trigger prefetch manually */}
      <button
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
        onMouseEnter={() =>
          queryClient.prefetchQuery({
            queryKey: ["users"],
            queryFn: fetchUsers,
          })
        }
      >
        Hover me to prefetch users
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.users.map((user: User) => (
          <div
            key={user.id}
            className="bg-neutral-700 p-4 rounded-lg shadow-md"
          >
            <h2 className="text-lg font-semibold text-white">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-sm text-neutral-300">{user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
