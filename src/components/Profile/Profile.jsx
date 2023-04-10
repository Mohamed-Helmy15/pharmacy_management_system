import React from "react";
// import styles from "./Profile.module.css";
import Appbar from "./../Appbar/Appbar";
import MainSidebar from "../Sidebar/Sidebar";

const Profile = () => {
  return (
    <>
      <Appbar />
      <div className="home-content">
        <MainSidebar />
        <div>profile</div>
      </div>
    </>
  );
};

export default Profile;
