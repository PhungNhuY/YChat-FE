import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from 'react-router-dom';
import { AuthenticatedLayout } from '../layouts/authenticated-layout';
import ErrorPage from '../pages/error-page';
import HomePage from '../pages/home-page';
import NotFoundPage from '../pages/not-found-page';

// Define public routes accessible by all users
const routesForPublic: Array<RouteObject> = [];

// Define routes accessible only by authenticated users
const routesForAuthenticatedOnly: Array<RouteObject> = [
  {
    path: '/',
    element: <AuthenticatedLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
];

// Define routes accessible only by non-authenticated users
const routesForUnauthenticatedOnly: Array<RouteObject> = [];

const router = createBrowserRouter([
  ...routesForPublic,
  ...routesForUnauthenticatedOnly,
  ...routesForAuthenticatedOnly,
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

export default function Routes() {
  return <RouterProvider router={router} />;
}
