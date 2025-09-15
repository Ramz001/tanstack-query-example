"use client";

import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function createUser(newUser: {
  firstName: string;
  lastName: string;
  email: string;
}) {
  const res = await fetch("https://dummyjson.com/users/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  });

  if (!res.ok) {
    throw new Error("Failed to create user");
  }

  return res.json();
}

const MutationBasic = () => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: (data) => {
      // invalidate users query so it refetches fresh data
      queryClient.invalidateQueries({ queryKey: ["users"] });
      alert(`User ${data.firstName} ${data.lastName} created successfully!`);
      setFormData({ firstName: "", lastName: "", email: "" });
    },
    onError: (error: any) => {
      alert(`Error: ${error.message}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <div className="max-w-md mx-auto bg-neutral-800 p-6 rounded-lg shadow-lg border border-neutral-700">
      <h2 className="text-xl font-bold text-white mb-4">Add New User</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="First Name"
          value={formData.firstName}
          onChange={(e) =>
            setFormData({ ...formData, firstName: e.target.value })
          }
          className="w-full px-3 py-2 rounded bg-neutral-700 text-white border border-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={(e) =>
            setFormData({ ...formData, lastName: e.target.value })
          }
          className="w-full px-3 py-2 rounded bg-neutral-700 text-white border border-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-3 py-2 rounded bg-neutral-700 text-white border border-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <button
          type="submit"
          disabled={mutation.isPending}
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition"
        >
          {mutation.isPending ? "Creating..." : "Create User"}
        </button>
      </form>

      {mutation.isError && (
        <p className="mt-3 text-red-500 text-sm">
          Error: {(mutation.error as Error).message}
        </p>
      )}
      {mutation.isSuccess && (
        <p className="mt-3 text-green-400 text-sm">
          User created successfully!
        </p>
      )}
    </div>
  );
};

export default MutationBasic;
