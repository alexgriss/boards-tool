import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { BoardsPage } from '@/pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <BoardsPage />,
  },
]);

export const App = () => <RouterProvider router={router} />;
