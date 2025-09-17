"use client";

import QueryBasic from "@/components/QueryBasic";
import MutationBasic from "@/components/MutationBasic";
import QueryPaginated from "@/components/QueryPaginated";

export default function Home() {
  return (
    <main className="container mx-auto flex gap-4 flex-col bg-neutral-800 p-4 mt-4 rounded-lg min-h-screen">
      <h1 className="font-bold text-3xl text-white mb-6 text-center">
        Tanstack Query - Users
      </h1>
      <div className="flex gap-2">
        <MutationBasic />
        <QueryBasic />
      </div>
      <QueryPaginated />
    </main>
  );
}
