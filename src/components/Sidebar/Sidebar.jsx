import React from "react";
import styles from "./Sidebar.module.css";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link, useNavigate } from "react-router-dom";
import CategoryIcon from "@mui/icons-material/Category";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import MedicationLiquidIcon from "@mui/icons-material/MedicationLiquid";
import DeviceHubIcon from "@mui/icons-material/DeviceHub";
import ReceiptIcon from "@mui/icons-material/Receipt";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import LogoutIcon from "@mui/icons-material/Logout";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useSignOut } from "react-auth-kit";
import { SiAuth0 } from "react-icons/si";
import { FaCriticalRole } from "react-icons/fa";
import DashboardIcon from "@mui/icons-material/Dashboard";
export const items = [
  "Dashboard",
  "Categories",
  "Users",
  "Customers",
  "Branches",
  "Medicines",
  "Addresses",
  "Bills",
  "suppliers",
  "roles",
  "authority",
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
      <Sidebar width="200px" className={styles.side} backgroundColor="#0F467E">
        <Menu className={styles.menu}>
          <MenuItem
            icon={<DashboardIcon />}
            component={<Link to={"/dashboard"} />}
            className={styles.menuitem}
          >
            Dashboard
          </MenuItem>
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
            icon={<DeviceHubIcon />}
            component={<Link to={"/Branches"} />}
            className={styles.menuitem}
          >
            Branches
          </MenuItem>
          <MenuItem
            icon={<MedicationLiquidIcon />}
            component={<Link to={"/Medicines"} />}
            className={styles.menuitem}
          >
            Medicines
          </MenuItem>

          <MenuItem
            icon={<LocationOnIcon />}
            component={<Link to={"/Addresses"} />}
            className={styles.menuitem}
          >
            Addresses
          </MenuItem>

          <MenuItem
            icon={<ReceiptIcon />}
            component={<Link to={"/Bills"} />}
            className={styles.menuitem}
          >
            Bills
          </MenuItem>
          <MenuItem
            icon={<AddBusinessIcon />}
            component={<Link to={"/suppliers"} />}
            className={styles.menuitem}
          >
            Suppliers
          </MenuItem>
          <MenuItem
            icon={<FaCriticalRole />}
            component={<Link to={"/roles"} />}
            className={styles.menuitem}
          >
            Roles
          </MenuItem>
          <MenuItem
            icon={<SiAuth0 />}
            component={<Link to={"/authority"} />}
            className={styles.menuitem}
          >
            Authority
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
