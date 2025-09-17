export const PER_PAGE = 5;

export async function fetchUsersInfinite({ pageParam = 0 }) {
  const res = await fetch(
    `https://dummyjson.com/users?limit=${PER_PAGE}&skip=${pageParam}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }
  return res.json();
}

export async function fetchUsersPaginated(page: number, limit: number = 5) {
  const res = await fetch(
    `https://dummyjson.com/users?limit=${limit}&skip=${(page - 1) * limit}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }
  return res.json();
}

export async function fetchUsers() {
  const res = await fetch("https://dummyjson.com/users?limit=5");
  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }
  return res.json();
}
