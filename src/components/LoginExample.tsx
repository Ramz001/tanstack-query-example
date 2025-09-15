"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

// 1. Define Zod schema
const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// 2. Infer TypeScript type
type LoginFormData = z.infer<typeof loginSchema>;

// 3. API call function
async function loginUser(data: LoginFormData) {
  const res = await fetch("https://dummyjson.com/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Invalid username or password");
  }

  return res.json(); // returns user + token
}

// 4. Component
export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      alert(`Welcome ${data.username}! Token: ${data.token}`);
      // you would normally save token in cookies/localStorage
    },
    onError: (error: any) => {
      console.error(error);
    },
  });

  const onSubmit = (data: LoginFormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="max-w-sm mx-auto bg-neutral-800 p-6 rounded-lg shadow-lg border border-neutral-700">
      <h2 className="text-xl font-bold text-white mb-4">Login</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        {/* Username */}
        <div>
          <input
            type="text"
            placeholder="Username"
            {...register("username")}
            className="w-full px-3 py-2 rounded bg-neutral-700 text-white border border-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.username && (
            <p className="text-red-400 text-sm mt-1">
              {errors.username.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            className="w-full px-3 py-2 rounded bg-neutral-700 text-white border border-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && (
            <p className="text-red-400 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={mutation.isPending}
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition"
        >
          {mutation.isPending ? "Logging in..." : "Login"}
        </button>
      </form>

      {/* Show error/success messages */}
      {mutation.isError && (
        <p className="mt-3 text-red-500 text-sm">
          {(mutation.error as Error).message}
        </p>
      )}
      {mutation.isSuccess && (
        <p className="mt-3 text-green-400 text-sm">Login successful!</p>
      )}
    </div>
  );
}
