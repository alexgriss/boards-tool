import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { BoardsPage } from '@/pages';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

export const App = () => (
  <QueryClientProvider client={queryClient}>
    <BoardsPage />

    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
