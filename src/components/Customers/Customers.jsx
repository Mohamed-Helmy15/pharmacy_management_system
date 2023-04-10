/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { config } from "../../App";
import axios from "axios";
import Search from "./../../materials/Search";
import Tables from "./../../materials/Table";
import CustomerCom from "./CustomerCom";
import App from "./../../App";
const minWidth = 100;

const Customers = () => {
  const columns = [
    {
      id: "name",
      label: "Customer Name",
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
  const [dataRow, setDataRow] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const [postRequest, setPostRequest] = useState("");
  const [deleteRequest, setdeleteRequest] = useState("");
  const [putRequest, setPutRequest] = useState(false);
  const [addressRequest, setAddressRequest] = useState(false);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState([]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    axios
      .get(
        `http://localhost:1234/api/v1/customers?page=${page}&size=${rowsPerPage}&sort=lname`,
        config
      )
      .then((res) => {
        console.log(res.data.payload);
        setDataRow(res.data.payload);
      })
      .catch((err) => err);
    axios
      .get(
        `http://localhost:1234/api/v1/addresses?page=0&size=100&sort=governorate`,
        config
      )
      .then((res) => {
        setAddress(res.data.payload);
      })
      .catch((err) => err);
  }, [deleteRequest, putRequest, postRequest, addressRequest]);
  return (
    <>
      <App>
        <div className="home-content">
          {/* <MainSidebar setSideRequest={setPutRequest} /> */}
          <div className="page">
            <div className="header">
              <h3 style={{ margin: 0 }}>Customers</h3>
              <Search
                search={search}
                handleSearch={handleSearch}
                placeholder={"Search the Last Name"}
              />
              <div>
                <button
                  className="get"
                  onClick={() => {
                    handleOpen();
                  }}
                >
                  Create new Cutomers
                </button>
                <CustomerCom
                  decide={"create"}
                  open={open}
                  setOpen={setOpen}
                  setPutRequest={setPutRequest}
                  setPostRequest={setPostRequest}
                  addressRequest={addressRequest}
                  setAddressRequest={setAddressRequest}
                  address={address}
                  putRequest={putRequest}
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
              section={"customers"}
              setPutRequest={setPutRequest}
              deleteRequest={deleteRequest}
              setdeleteRequest={setdeleteRequest}
              search={search}
              keySearch={"name"}
            />
          </div>
        </div>
      </App>
    </>
  );
};

export default Customers;
