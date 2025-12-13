import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import "./index.css";
import Home from "./Pages/HomePage/Home";
import AuthProvider from "./Context/AuthProvider";
import Login from "./Pages/Auth/Login";
import AuthLayout from "./Pages/Auth/AuthLayout";
import Register from "./Pages/Auth/Register";
import HomePage from "./Pages/HomePage/HomePage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AllContests from "./Pages/AllContests/AllContests";
import PrivetRoute from "./PrivetRoute/PrivetRoute";
import ContestDetails from "./Pages/ContestDetails/ContestDetails";
import UserDashboard from "./Dashboards/UserDashboard/UserDashboard";
import Error from "./ErrorPage/Error";
import CreatorDashboard from "./Dashboards/CreatorDashboard/CreatorDashboard";
import CreateContest from "./Dashboards/CreatorDashboard/CreateContest";
import AdminDashboard from "./Dashboards/AdminDashboard/AdminDashboard";
import ManageUsers from "./Dashboards/AdminDashboard/ManageUsers";
// import HomePage from "./Pages/HomePage";
const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
    errorElement: <Error />,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: "/auth",
        Component: AuthLayout,
        children: [
          {
            path: "/auth/login",
            Component: Login,
          },
          {
            path: "/auth/register",
            Component: Register,
          },
        ],
      },
      {
        path: "/all-contests",
        Component: AllContests,
      },
      {
        path: "/contestDetail/:id",
        element: (
          <PrivetRoute>
            <ContestDetails></ContestDetails>
          </PrivetRoute>
        ),
      },
      {
        path: "/admin-dashboard",
        element: (
          <PrivetRoute>
            <AdminDashboard></AdminDashboard>
          </PrivetRoute>
        ),
        children: [
          {
            index: true,
            Component: ManageUsers,
          },
        ],
      },
      {
        path: "/user-dashboard",
        element: (
          <PrivetRoute>
            <UserDashboard></UserDashboard>
          </PrivetRoute>
        ),
      },
      {
        path: "/creator-dashboard",
        element: <CreatorDashboard></CreatorDashboard>,
        children: [
          {
            path: "/creator-dashboard/create-contest",
            Component: CreateContest,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
