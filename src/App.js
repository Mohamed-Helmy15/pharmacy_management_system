import "./App.css";
import React, { useState, useEffect } from "react";
import Appbar from "./components/Appbar/Appbar";
import MainSidebar from "./components/Sidebar/Sidebar";
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
  const [sideRequest, setSideRequest] = useState(false);
  useEffect(() => {
    console.log(sideRequest);
  }, [sideRequest]);
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
