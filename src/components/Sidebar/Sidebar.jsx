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

export const items = [
  "Categories",
  "Users",
  "Customers",
  "Medicines",
  "Branches",
  "Addresses",
  "Bills",
  "suppliers",
  "roles",
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
            icon={<AddBusinessIcon />}
            component={<Link to={"/roles"} />}
            className={styles.menuitem}
          >
            Roles
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
