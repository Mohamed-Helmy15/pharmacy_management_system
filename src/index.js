import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ProSidebarProvider } from "react-pro-sidebar";
import Users from "./components/Users/Users";
import Branches from "./components/Branches/Branches";
import Bills from "./components/Bills/Bills";
import LogOut from "./components/logout/LogOut";
import Profile from "./components/Profile/Profile";
import AddNewM from "./components/Add_new_medicine/AddNewM";
import { AuthProvider } from "react-auth-kit";
import { RequireAuth } from "react-auth-kit";
import Forgot from "./components/Forgot_Password/Forgot";
import Reset from "./components/Reset_Password/Reset";
import Customers from "./components/Customers/Customers";
import Categories from "./components/Categories/Categories";

const root = ReactDOM.createRoot(document.getElementById("root"));
const router = createBrowserRouter([
  {
    path: "/",
    element: <LogOut />,
  },
  {
    path: "/categories",
    element: (
      <RequireAuth loginPath="/">
        <Categories />
      </RequireAuth>
    ),
  },
  {
    path: "/users",
    element: (
      <RequireAuth loginPath="/">
        <Users />
      </RequireAuth>
    ),
  },
  {
    path: "/Medicines",
    element: (
      <RequireAuth loginPath="/">
        <AddNewM />
      </RequireAuth>
    ),
  },
  {
    path: "/branches",
    element: (
      <RequireAuth loginPath="/">
        <Branches />
      </RequireAuth>
    ),
  },
  {
    path: "/customers",
    element: (
      <RequireAuth loginPath="/">
        <Customers />
      </RequireAuth>
    ),
  },
  {
    path: "/bills",
    element: (
      <RequireAuth loginPath="/">
        <Bills />
      </RequireAuth>
    ),
  },

  {
    path: "/profile",
    element: (
      <RequireAuth loginPath="/">
        <Profile />
      </RequireAuth>
    ),
  },
  {
    path: "/forgot",
    element: <Forgot />,
  },
  {
    path: "/reset",
    element: <Reset />,
  },
]);
root.render(
  // <React.StrictMode>
  <AuthProvider authType={"localStorage"} authName={"_auth"}>
    <ProSidebarProvider>
      <RouterProvider router={router} />
    </ProSidebarProvider>
  </AuthProvider>
  /* </React.StrictMode> */
);
reportWebVitals();
