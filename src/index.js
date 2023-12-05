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
import Suppliers from "./components/Suppliers/Suppliers";
import Address from "./components/Addresses/Address";
import Roles from "./components/Roles/Roles";
import Authority from "./components/Authority/Authority";
import Dashboard from "./components/Dashboard/Dashboard";

const root = ReactDOM.createRoot(document.getElementById("root"));
const router = createBrowserRouter([
  {
    path: "/",
    element: <LogOut />,
  },
  {
    path: "/dashboard",
    element:
      // <RequireAuth loginPath="/">
      localStorage.getItem("token") ? <Dashboard /> : <LogOut />,
    // </RequireAuth>
  },
  {
    path: "/categories",
    element:
      // <RequireAuth loginPath="/">
      localStorage.getItem("token") ? <Categories /> : <LogOut />,
    // </RequireAuth>
  },
  {
    path: "/users",
    element:
      // <RequireAuth loginPath="/">
      localStorage.getItem("token") ? <Users /> : <LogOut />,
    // </RequireAuth>
  },
  {
    path: "/Medicines",
    element:
      // <RequireAuth loginPath="/">
      localStorage.getItem("token") ? <AddNewM /> : <LogOut />,
    // </RequireAuth>
  },
  {
    path: "/branches",
    element:
      // <RequireAth loginPath="/">
      localStorage.getItem("token") ? <Branches /> : <LogOut />,
    /* </RequireAth> */
  },
  {
    path: "/addresses",
    element:
      // <RequireAth loginPath="/">
      localStorage.getItem("token") ? <Address /> : <LogOut />,
    /* </RequireAth> */
  },
  {
    path: "/customers",
    element:
      // <RequireAth loginPath="/">
      localStorage.getItem("token") ? <Customers /> : <LogOut />,
    /* </RequireAth> */
  },
  {
    path: "/bills",
    element:
      // <RequireAth loginPath="/">
      localStorage.getItem("token") ? <Bills /> : <LogOut />,
    /* </RequireAth> */
  },
  {
    path: "/profile",
    element:
      // <RequireAth loginPath="/">
      localStorage.getItem("token") ? <Profile /> : <LogOut />,
    /* </RequireAth> */
  },
  {
    path: "/suppliers",
    element:
      // <RequireAth loginPath="/">
      localStorage.getItem("token") ? <Suppliers /> : <LogOut />,
    /* </RequireAth> */
  },
  {
    path: "/roles",
    element:
      // <RequireAth loginPath="/">
      localStorage.getItem("token") ? <Roles /> : <LogOut />,
    /* </RequireAth> */
  },
  {
    path: "/authority",
    element:
      // <RequireAth loginPath="/">
      localStorage.getItem("token") ? <Authority /> : <LogOut />,
    /* </RequireAth> */
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
