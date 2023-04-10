/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { config } from "../../App";
// import styles from "./Branches.module.css";
import App from "./../../App";
import axios from "axios";
import Tables from "../../materials/Table";
import Search from "../../materials/Search";
import Appbar from "./../Appbar/Appbar";
import MainSidebar from "../Sidebar/Sidebar";
import BranchCom from "./BranchCom";

const Branches = () => {
  const [manager, setManager] = useState([]);
  const minWidth = 100;
  const columns = [
    { id: "name", label: "Bransh name", minWidth, align: "center" },
    // {
    //   id: "manager",
    //   label: "Manager",
    //   minWidth,
    //   align: "center",
    // },
    {
      id: "address",
      label: "Address",
      minWidth,
      align: "center",
    },

    {
      id: "actions",
      label: "Actions",
      minWidth: minWidth + 50,
      align: "center",
    },
  ];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [open, setOpen] = useState(false);
  const [branches, setBranches] = useState([]);
  const [putRequest, setPutRequest] = useState(0);
  const [deleteRequest, setdeleteRequest] = useState("");
  const [search, setSearch] = useState("");
  const handleOpen = () => setOpen(true);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    axios
      .get(
        `http://localhost:1234/api/v1/pharmacies?page=${page}&size=${rowsPerPage}&sort=name`,
        config
      )
      .then((response) => {
        console.log(response.data.payload);
        setBranches(response.data.payload);
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
      })
      .catch((err) => err);
  }, [deleteRequest, putRequest]);

  return (
    <>
      <App>
        <div className="home-content">
          {/* <MainSidebar setSideRequest={setPutRequest} /> */}
          <div className="page">
            <div className="header">
              <h3 style={{ margin: 0 }}>Branches</h3>
              <Search
                search={search}
                handleSearch={handleSearch}
                placeholder={"Search the Name"}
              />
              <div>
                <button className="get" onClick={handleOpen}>
                  Create a new Branch
                </button>
              </div>
            </div>
            <BranchCom
              decide={"create"}
              open={open}
              setOpen={setOpen}
              manager={manager}
              setPutRequest={setPutRequest}
            />
            <Tables
              columns={columns}
              dataRow={branches}
              page={page} //pagination
              rowsPerPage={rowsPerPage} //pagination
              handleChangePage={handleChangePage} //pagination
              handleChangeRowsPerPage={handleChangeRowsPerPage} //pagination
              section={"pharmacies"} // handle api
              deleteRequest={deleteRequest} // delete state in the section
              setdeleteRequest={setdeleteRequest} // set delete state to rerender the catergory component
              setPutRequest={setPutRequest} // set put state to rerender the catergory component
              search={search}
              keySearch={"name"}
            />
          </div>
        </div>
      </App>
    </>
  );
};
export default Branches;
