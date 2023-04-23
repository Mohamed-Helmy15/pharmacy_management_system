/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import App, { config } from "../../App";
import Search from "../../materials/Search";
import axios from "axios";
import AddNewCom from "./AddNewCom";
import Tables from "./../../materials/Table";

const AddNewM = () => {
  const minWidth = 100;

  const columns = [
    {
      id: "marketName",
      label: "Market Name",
      minWidth,
      align: "center",
    },
    {
      id: "type",
      label: "Type",
      minWidth,
      align: "center",
    },
    {
      id: "price",
      label: "Price",
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

  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [open, setOpen] = useState(false);
  const [putRequest, setPutRequest] = useState("");
  const [dataRow, setDataRow] = useState([]);
  const [postRequest, setPostRequest] = useState("");
  const [deleteRequest, setdeleteRequest] = useState(0);
  const handleOpen = () => setOpen(true);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    axios
      .get("http://localhost:1234/api/v1/categories", config)
      .then((res) => {
        setCategories(res.data.payload);
      })
      .catch((err) => err);
    axios
      .get("http://localhost:1234/api/v1/medicines/types", config)
      .then((res) => {
        setTypes(res.data.payload);
      })
      .catch((err) => err);
    axios
      .get("http://localhost:1234/api/v1/suppliers", config)
      .then((res) => {
        setSuppliers(res.data.payload);
      })
      .catch((err) => err);

    axios
      .get(
        `http://localhost:1234/api/v1/medicines?page=${page}&size=${rowsPerPage}&sort=price&pharmacy=${window.localStorage.getItem(
          "thisBranch"
        )}`,
        config
      )
      .then((res) => {
        setDataRow(res.data.payload);
      })
      .catch((err) => err);
  }, [deleteRequest, putRequest, postRequest]);

  return (
    <App>
      <div className="header">
        <h3 style={{ margin: 0 }}>Medicines</h3>
        <Search
          search={search}
          handleSearch={handleSearch}
          placeholder={"Search the medicines name"}
        />
        <div>
          <button className="get" onClick={handleOpen}>
            Create new Medicines
          </button>
          <AddNewCom
            decide={"create"}
            open={open}
            setOpen={setOpen}
            categories={categories}
            types={types}
            supplires={suppliers}
            setPostRequest={setPostRequest}
            setPutRequest={setPutRequest}
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
        section={"medicines"}
        setPutRequest={setPutRequest}
        deleteRequest={deleteRequest}
        setdeleteRequest={setdeleteRequest}
        search={search}
        keySearch={"marketName"}
      />
    </App>
  );
};

export default AddNewM;
