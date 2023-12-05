/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { config } from "../../App";
import axios from "axios";
import Tables from "../../materials/Table";
import Search from "../../materials/Search";
import UserCom from "./UserCom";
import App from "./../../App";

const minWidth = 100;

const Users = () => {
  const [auth, setAuth] = useState("");
  const [postRequest, setPostRequest] = useState("");
  const [putRequest, setPutRequest] = useState("");
  const [deleteRequest, setdeleteRequest] = useState(0);
  const [dataRow, setDataRow] = useState([
    {
      id: 1,
      name: "Mohamed Helmy",
      phone: "+201150870355",
      email: "mohamedhelmy1531@gmail.com",
    },
  ]);
  const [roles, setRoles] = useState([]);
  const [pharmacies, setPharmacies] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const columns = [
    {
      id: "name",
      label: "Name",
      minWidth,
      align: "center",
    },
    {
      id: "phone",
      label: "Phone",
      minWidth,
      align: "center",
    },
    {
      id: "email",
      label: "Email",
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

  useEffect(() => {
    // axios
    //   .get("http://localhost:1234/api/v1/users/pharmacies", config)
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => console.log("err", err));

    setAuth(localStorage.getItem("role"));
    // axios
    //   .get(
    //     `http://localhost:1234/api/v1/users?page=${page}&size=${rowsPerPage}&sort=username`,
    //     config
    //   )
    //   .then((res) => {
    //     setDataRow(
    //       res.data.payload
    //         .filter((user) => {
    //           return user.username !== window.localStorage.getItem("user");
    //         })
    //         .filter((user) => user.role !== "super")
    //     );
    //   })
    //   .catch((err) => err);
    // axios
    //   .get(
    //     "http://localhost:1234/api/v1/roles?page=0&size=100&sort=priority",
    //     config
    //   )
    //   .then((res) => {
    //     setRoles(res.data.payload);
    //   })
    //   .catch((err) => err);
    // axios
    //   .get(
    //     "http://localhost:1234/api/v1/pharmacies?page=0&size=100&sort=name",
    //     config
    //   )
    //   .then((res) => {
    //     setPharmacies(res.data.payload);
    //   })
    //   .catch((err) => err);
  }, []);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <App>
        <div className="header">
          <h3 style={{ margin: 0 }}>Users</h3>
          <Search
            search={search}
            handleSearch={handleSearch}
            placeholder={"Search the Name"}
          />

          <div>
            {auth !== "pharmacist" && (
              <button
                className="get"
                onClick={() => {
                  handleOpen();
                }}
              >
                Create new Users
              </button>
            )}
            <UserCom
              decide={"create"}
              open={open}
              setOpen={setOpen}
              setPostRequest={setPostRequest}
              setPutRequest={setPutRequest}
              roles={roles}
              pharmacies={pharmacies}
            />
          </div>
        </div>
        <Tables
          columns={columns}
          dataRow={dataRow}
          page={page}
          rowsPerPage={rowsPerPage}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          section={"users"}
          setPutRequest={setPutRequest}
          deleteRequest={deleteRequest}
          setdeleteRequest={setdeleteRequest}
          search={search}
          keySearch={"name"}
        />
      </App>
    </>
  );
};

export default Users;
