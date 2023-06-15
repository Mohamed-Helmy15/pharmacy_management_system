import "./App.css";
import React, { useState, useEffect } from "react";
import Appbar from "./components/Appbar/Appbar";
import MainSidebar from "./components/Sidebar/Sidebar";
import jwt_decode from "jwt-decode";
import axios from "axios";

export const config = {
  headers: {
    Authorization: `Bearer ${window.localStorage.getItem("tokens")}`,
  },
};
export const configMultiPart = {
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${window.localStorage.getItem("tokens")}`,
  },
};
export const sideRequestContext = React.createContext();
function App(props) {
  const [sideRequest, setSideRequest] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get(
  //       `http://localhost:1234/api/v1/users?page=1&size=1&sort=username`,
  //       config
  //     )
  //     .then((res) =>
  //       console.log(
  //         res.data.payload.filter(
  //           (user) => user.username === window.localStorage.getItem("user")
  //         )[0].role
  //       )
  //     )
  //     .catch((err) => console.log(err));
  //   console.log(jwt_decode(window.localStorage.getItem("tokens")));
  // }, []);

  return (
    <sideRequestContext.Provider value={{ sideRequest, setSideRequest }}>
      <Appbar />
      <div className="home-content">
        <MainSidebar />
        <div className="page">{props.children}</div>
      </div>
    </sideRequestContext.Provider>
  );
}

export default App;
