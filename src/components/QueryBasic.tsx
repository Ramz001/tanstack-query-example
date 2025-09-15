"use client";

import { useQuery } from "@tanstack/react-query";

async function fetchPosts() {
  const res = await fetch("https://dummyjson.com/users?limit=5");
  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }
  return await res.json();
}

export default function QueryBasic() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users"],
    queryFn: fetchPosts,
  });

  if (isLoading)
    return <div className="text-center text-white">Loading...</div>;
  if (isError)
    return (
      <div className="text-center text-red-500">Error: {error.message}</div>
    );

  if (!data?.users || data.users.length === 0) {
    return <div className="text-center text-neutral-400">No users found</div>;
  }

  return (
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
              <span className="font-medium">Company:</span> {user.company.name}{" "}
              ({user.company.title})
            </p>
            <p className="text-sm">
              <span className="font-medium">Location:</span> {user.address.city}
              , {user.address.state}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  maidenName?: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: {
    color: string;
    type: string;
  };
  ip: string;
  address: {
    address: string;
    city: string;
    state: string;
    stateCode: string;
    postalCode: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    country: string;
  };
  macAddress: string;
  university: string;
  bank: {
    cardExpire: string;
    cardNumber: string;
    cardType: string;
    currency: string;
    iban: string;
  };
  company: {
    department: string;
    name: string;
    title: string;
    address: {
      address: string;
      city: string;
      state: string;
      stateCode: string;
      postalCode: string;
      coordinates: {
        lat: number;
        lng: number;
      };
      country: string;
    };
  };
  ein: string;
  ssn: string;
  userAgent: string;
  crypto: {
    coin: string;
    wallet: string;
    network: string;
  };
  role: string;
}
