import { QueryClient } from "@tanstack/react-query";

const defaultOptions = {
  queries: {
    refetchOnWindowFocus: false,
  },
};

export const queryClient = new QueryClient({ defaultOptions });
