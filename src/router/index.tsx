import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from 'react-router-dom';
import { AuthenticatedLayout } from '../layouts/authenticated-layout/authenticated-layout';
import { UnauthenticatedLayout } from '../layouts/unauthenticated-layout';
import {
  ErrorPage,
  HomePage,
  LoginPage,
  NotFoundPage,
  PeoplePage,
} from '../pages';

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
      {
        path: 'people',
        element: <PeoplePage />,
      },
    ],
  },
];

// Define routes accessible only by non-authenticated users
const routesForUnauthenticatedOnly: Array<RouteObject> = [
  {
    path: '',
    element: <UnauthenticatedLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
    ],
  },
];

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
