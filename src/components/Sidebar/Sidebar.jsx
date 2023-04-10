/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { config } from "../../App";
import styles from "./Sidebar.module.css";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link, useNavigate } from "react-router-dom";
import CategoryIcon from "@mui/icons-material/Category";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import MedicationLiquidIcon from "@mui/icons-material/MedicationLiquid";
import DeviceHubIcon from "@mui/icons-material/DeviceHub";
import ReceiptIcon from "@mui/icons-material/Receipt";
import LogoutIcon from "@mui/icons-material/Logout";
import { useSignOut } from "react-auth-kit";
import axios from "axios";

import CatCom from "./../Categories/CatCom";
import UserCom from "./../Users/UserCom";
import CustomerCom from "./../Customers/CustomerCom";
import BranchCom from "./../Branches/BranchCom";
import { useContext } from "react";
import { sideRequestContext } from "./../../App";

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
  /* create categories in sidebar */
  const [openCreate, setOpenCreate] = useState(false);
  const [postRequest, setpostRequest] = useState("");

  const handleOpen = () => {
    setOpenCreate(true);
    if (props.setSideRequest) {
      props.setSideRequest(false);
    }
  };

  /* create categories in sidebar */

  /* create users in sidebar */
  const [postUserRequest, setPostUserRequest] = useState("");
  const [userCreate, setUserCreate] = useState(false);
  const [roles, setRoles] = useState([]);
  const [pharmacies, setPharmacies] = useState([]);

  const handleUserOpen = () => {
    setUserCreate(true);
    props.setSideRequest(false);
    axios
      .get("http://localhost:1234/api/v1/roles", config)
      .then((res) => {
        setRoles(res.data.payload);
      })
      .catch((err) => err);
    axios
      .get("http://localhost:1234/api/v1/pharmacies", config)
      .then((res) => {
        setPharmacies(res.data.payload);
      })
      .catch((err) => err);
  };
  /* create users in sidebar */

  /* create customers in sidebar */
  const [postCustomerRequest, setPostCustomerRequest] = useState("");
  const [customerCreate, setCustomerCreate] = useState(false);
  const [addressRequest, setAddressRequest] = useState(false);
  const [address, setAddress] = useState([]);
  const handleCustomerOpen = () => {
    props.setSideRequest(false);
    setCustomerCreate(true);
  };
  /* create customers in sidebar */
  /* create branches in sidebar */
  const [postBranchRequest, setPostBranchRequest] = useState("");
  const [branchCreate, setBranchCreate] = useState(false);
  const [manager, setManager] = useState([]);
  const handleBranchOpen = () => {
    props.setSideRequest(false);
    setBranchCreate(true);
  };
  /* create branches in sidebar */
  useEffect(() => {
    console.log(sideRequestCtx.sideRequest);
    axios
      .get(
        `http://localhost:1234/api/v1/addresses?page=0&size=100&sort=id`,
        config
      )
      .then((res) => {
        setAddress(res.data.payload);
        props.setSideRequest(true);
      })
      .catch((err) => err);
    axios
      .get(
        "http://localhost:1234/api/v1/users?page=0&size=100&sort=username",
        config
      )
      .then((res) => {
        console.log(res.data.payload);

        setManager(res.data.payload);
      });
  }, [addressRequest, postCustomerRequest, postBranchRequest]);
  /* create customers in sidebar */

  const signOut = useSignOut();
  const navigate = useNavigate();
  const out = () => {
    window.localStorage.clear();
    signOut();
    navigate("/");
  };
  const sideRequestCtx = useContext(sideRequestContext);
  return (
    <>
      <Sidebar width="260px" className={styles.side} backgroundColor="#0F467E">
        <Menu className={styles.menu}>
          <SubMenu
            label="Categories"
            icon={<CategoryIcon />}
            className={styles.submenu}
          >
            <MenuItem
              component={<Link to={"/categories"} />}
              className={styles.menuitem}
            >
              Show the Categories
            </MenuItem>
            <MenuItem
              className={styles.menuitem}
              onClick={() => {
                handleOpen();
              }}
            >
              Create new Categories
            </MenuItem>
          </SubMenu>
          <SubMenu
            label="Users"
            icon={<PeopleAltIcon />}
            className={styles.submenu}
          >
            <MenuItem
              component={<Link to={"/Users"} />}
              className={styles.menuitem}
            >
              Show the Users
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleUserOpen();
              }}
              className={styles.menuitem}
            >
              Create new Users
            </MenuItem>
          </SubMenu>
          <SubMenu
            label="Customers"
            icon={<PeopleAltIcon />}
            className={styles.submenu}
          >
            <MenuItem
              component={<Link to={"/Customers"} />}
              className={styles.menuitem}
            >
              Show the Customers
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleCustomerOpen();
              }}
              className={styles.menuitem}
            >
              Create new Customers
            </MenuItem>
          </SubMenu>
          <SubMenu
            label="Medicines"
            icon={<MedicationLiquidIcon />}
            className={styles.submenu}
          >
            <MenuItem
              component={<Link to={"/Medicines"} />}
              className={styles.menuitem}
            >
              Show the Medicines
            </MenuItem>
            <MenuItem className={styles.menuitem}>Add new Medicines</MenuItem>
            {/* <MenuItem className={styles.menuitem}>Delete Medicines</MenuItem> */}
          </SubMenu>
          <SubMenu
            label="Branches"
            icon={<DeviceHubIcon />}
            className={styles.submenu}
          >
            <MenuItem
              component={<Link to={"/Branches"} />}
              className={styles.menuitem}
            >
              Show the Branches
            </MenuItem>
            <MenuItem
              // component={<Link to={"/categories"} />}
              className={styles.menuitem}
              onClick={() => {
                handleBranchOpen();
              }}
            >
              Create new Branches
            </MenuItem>
            {/* <MenuItem className={styles.menuitem}>Delete Branches</MenuItem> */}
          </SubMenu>

          <SubMenu
            label="Bills"
            icon={<ReceiptIcon />}
            className={styles.submenu}
          >
            <MenuItem
              component={<Link to={"/Bills"} />}
              className={styles.menuitem}
            >
              Show the Bills
            </MenuItem>
            <MenuItem
              // component={<Link to={"/categories"} />}
              className={styles.menuitem}
            >
              Create new Bills
            </MenuItem>
            {/* <MenuItem className={styles.menuitem}>Delete Bills</MenuItem> */}
          </SubMenu>

          <MenuItem
            onClick={out}
            // component={<Link to={"/Login"} />}
            className={styles.submenu}
            icon={<LogoutIcon />}
          >
            Logout
          </MenuItem>
        </Menu>
      </Sidebar>
      {/* create categories in sidebar */}
      <CatCom
        decide={"create"}
        open={openCreate}
        setOpen={setOpenCreate}
        setpostRequest={setpostRequest}
        postRequest={postRequest}
        setSideRequest={sideRequestCtx.setSideRequest}
      />
      {/* create categories in sidebar */}

      {/* create users in sidebar */}
      <UserCom
        decide={"create"}
        open={userCreate}
        setOpen={setUserCreate}
        putRequest={postUserRequest}
        setPutRequest={setPostUserRequest}
        roles={roles}
        pharmacies={pharmacies}
        setSideRequest={props.setSideRequest}
      />
      {/* create users in sidebar */}
      {/* create customer in sidebar */}
      <CustomerCom
        decide={"create"}
        open={customerCreate}
        setOpen={setCustomerCreate}
        setPutRequest={setPostCustomerRequest}
        addressRequest={addressRequest}
        setAddressRequest={setAddressRequest}
        address={address}
        setSideRequest={props.setSideRequest}
      />
      {/* create customer in sidebar */}
      {/* create Branch in sidebar */}
      <BranchCom
        decide={"create"}
        open={branchCreate}
        setOpen={setBranchCreate}
        manager={manager}
        setPutRequest={setPostBranchRequest}
        setSideRequest={props.setSideRequest}
      />
      {/* create Branch in sidebar */}
    </>
  );
};
export default MainSidebar;
