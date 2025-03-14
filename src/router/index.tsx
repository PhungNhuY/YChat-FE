import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from 'react-router-dom';
import { AuthenticatedLayout } from '../layouts/authenticated-layout/authenticated-layout';
import { UnauthenticatedLayout } from '../layouts/unauthenticated-layout';
import {
  ActivatePage,
  ErrorPage,
  ForgotPasswordPage,
  HomePage,
  LoginPage,
  NotFoundPage,
  PeopleFriendsPage,
  PeopleGroupsPage,
  PeopleInvitationPage,
} from '../pages';
import { PeoplePageLayout } from '../modules/people';
import { RegisterPage } from '../pages/register-page';
import { ResetPasswordPage } from '../pages/auth/reset-password';

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
        element: <PeoplePageLayout />,
        children: [
          {
            index: true,
            element: <PeopleFriendsPage />,
          },
          {
            path: 'groups',
            element: <PeopleGroupsPage />,
          },
          {
            path: 'invitation',
            element: <PeopleInvitationPage />,
          },
        ],
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
      {
        path: 'register',
        element: <RegisterPage />,
      },
      {
        path: 'auth',
        children: [
          {
            path: 'activate',
            element: <ActivatePage />,
          },
          {
            path: 'forgot-password',
            element: <ForgotPasswordPage />,
          },
          {
            path: 'reset-password',
            element: <ResetPasswordPage />,
          },
        ],
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
