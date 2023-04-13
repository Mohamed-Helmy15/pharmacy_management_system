import React from "react";
import styles from "./Sidebar.module.css";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link, useNavigate } from "react-router-dom";
import CategoryIcon from "@mui/icons-material/Category";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import MedicationLiquidIcon from "@mui/icons-material/MedicationLiquid";
import DeviceHubIcon from "@mui/icons-material/DeviceHub";
import ReceiptIcon from "@mui/icons-material/Receipt";
import LogoutIcon from "@mui/icons-material/Logout";
import { useSignOut } from "react-auth-kit";

export const items = [
  "Categories",
  "Users",
  "Customers",
  "Medicines",
  "Branches",
  "Bills",
  "Logout",
];

const MainSidebar = (props) => {
  const signOut = useSignOut();
  const navigate = useNavigate();
  const out = () => {
    window.localStorage.clear();
    signOut();
    navigate("/");
  };
  return (
    <>
      <Sidebar width="260px" className={styles.side} backgroundColor="#0F467E">
        <Menu className={styles.menu}>
          <MenuItem
            icon={<CategoryIcon />}
            component={<Link to={"/categories"} />}
            className={styles.menuitem}
          >
            Categories
          </MenuItem>
          <MenuItem
            icon={<PeopleAltIcon />}
            component={<Link to={"/Users"} />}
            className={styles.menuitem}
          >
            Users
          </MenuItem>

          <MenuItem
            icon={<PeopleAltIcon />}
            component={<Link to={"/Customers"} />}
            className={styles.menuitem}
          >
            Customers
          </MenuItem>

          <MenuItem
            icon={<MedicationLiquidIcon />}
            component={<Link to={"/Medicines"} />}
            className={styles.menuitem}
          >
            Medicines
          </MenuItem>

          <MenuItem
            icon={<DeviceHubIcon />}
            component={<Link to={"/Branches"} />}
            className={styles.menuitem}
          >
            Branches
          </MenuItem>

          <MenuItem
            icon={<ReceiptIcon />}
            component={<Link to={"/Bills"} />}
            className={styles.menuitem}
          >
            Bills
          </MenuItem>

          <MenuItem
            onClick={out}
            className={styles.menuitem}
            icon={<LogoutIcon />}
          >
            Logout
          </MenuItem>
        </Menu>
      </Sidebar>
    </>
  );
};
export default MainSidebar;
