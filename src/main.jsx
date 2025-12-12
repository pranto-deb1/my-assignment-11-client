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
// import HomePage from "./Pages/HomePage";
const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
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
        path: "/user-dashboard",
        element: <UserDashboard></UserDashboard>,
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
