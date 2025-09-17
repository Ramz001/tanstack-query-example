// app/page.tsx
import {
  HydrationBoundary,
  dehydrate,
  QueryClient,
} from "@tanstack/react-query";
import QueryBasic from "@/components/QueryBasic";
import { fetchUsers } from "@/components/user.action";

export default async function Page() {
  const queryClient = new QueryClient();

  // Prefetch before hydration
  await queryClient.prefetchQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <QueryBasic />
    </HydrationBoundary>
  );
}
