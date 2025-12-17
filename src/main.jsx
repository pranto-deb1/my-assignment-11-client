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
import ManageContests from "./Dashboards/AdminDashboard/ManageContests";
import MyContests from "./Dashboards/CreatorDashboard/MyContests";
import EditContests from "./Dashboards/CreatorDashboard/EditContests";
import PaymentSuccess from "./Payment/PaymentSuccess";
import PaymentCanceled from "./Payment/PaymentCanceled";
import SeeSubmitions from "./Dashboards/CreatorDashboard/SeeSubmitions";
import MyParticipations from "./Dashboards/UserDashboard/MyParticipations";
import MyWin from "./Dashboards/UserDashboard/MyWin";
import MyProfile from "./Dashboards/UserDashboard/MyProfile";
import AboutPage from "./Pages/About/AboutPage";
// import MyContests from "./Dashboards/CreatorDashboard/MyContests";
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
        path: "/about",
        Component: AboutPage,
      },
      {
        path: "/paymentSuccess",
        Component: PaymentSuccess,
      },
      {
        path: "/paymentCanceled",
        Component: PaymentCanceled,
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
          {
            path: "/admin-dashboard/manage-contests",
            Component: ManageContests,
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
        children: [
          {
            index: true,
            Component: MyParticipations,
          },
          {
            path: "my-wins",
            Component: MyWin,
          },
          {
            path: "my-profile",
            Component: MyProfile,
          },
        ],
      },
      {
        path: "/creator-dashboard",
        element: (
          <PrivetRoute>
            <CreatorDashboard></CreatorDashboard>
          </PrivetRoute>
        ),
        children: [
          {
            index: true,
            Component: CreateContest,
          },
          {
            path: "/creator-dashboard/my-contests",
            Component: MyContests,
          },
          {
            path: "/creator-dashboard/edit-contest/:id",
            Component: EditContests,
          },
          {
            path: "/creator-dashboard/see-submitions/:contestId",
            Component: SeeSubmitions,
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
