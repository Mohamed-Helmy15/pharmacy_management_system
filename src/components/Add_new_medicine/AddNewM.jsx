/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import App, { config } from "../../App";
import Search from "../../materials/Search";
import axios from "axios";
import AddNewCom from "./AddNewCom";
import SelectBranches from "./../../materials/SelectBranches";
import { DataGrid } from "@mui/x-data-grid";
import styles from "./AddNewM.module.css";
import Notification from "./../../materials/Notification";
const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "marketName", headerName: "market name", width: 190 },
  { field: "scientificName", headerName: "scientific name", width: 190 },
  {
    field: "count",
    headerName: "Count",
    type: "number",
    width: 150,
  },
  {
    field: "price",
    headerName: "Price",
    type: "number",
    width: 150,
  },
  {
    field: "expiration",
    headerName: "Expiration",
    type: "number",
    width: 190,
  },
  {
    field: "type",
    headerName: "Type",
    type: "number",
    width: 150,
  },
];

const AddNewM = () => {
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [open, setOpen] = useState(false);
  const [putRequest, setPutRequest] = useState("");
  const [dataRow, setDataRow] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [postRequest, setPostRequest] = useState("");
  const [deleteRequest, setdeleteRequest] = useState("");
  const [pharmacySelected, setPharmacySelected] = useState(null);
  const [notifDelete, setnotifDelete] = useState(null);
  const [state, setState] = useState("");

  const handleNotClose = (event, reason) => {
    setnotifDelete(null);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const handleOpen = () => setOpen(true);

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
        `http://localhost:1234/api/v1/medicines?&sort=marketName&pharmacy=${window.localStorage.getItem(
          "thisBranch"
        )}`,
        config
      )
      .then((res) => {
        setDataRow(res.data.payload);
      })
      .catch((err) => err);
  }, [deleteRequest, putRequest, postRequest]);

  const handleSelectionModelChange = (selectionModel) => {
    const selectedRowObjects = dataRow.filter((row) =>
      selectionModel.includes(row.id)
    );
    setSelectedRows(selectedRowObjects);
  };

  const handleEdit = (row) => {
    console.log(row);
  };
  const handleDelete = (rows) => {
    rows.map((row) => {
      axios
        .delete(`http://localhost:1234/api/v1/medicines/${row.id}`, config)
        .then((res) => {
          setdeleteRequest(res);
          setState(res.data.success);
          setnotifDelete(true);
        })
        .catch((err) => {
          setdeleteRequest(err);
          setState(err.data.success);
        });
      return true;
    });
  };
  const handleConfirm = (id) => {
    console.log(id);
  };
  return (
    <App>
      <SelectBranches
        value={pharmacySelected}
        setValue={setPharmacySelected}
        storage={"thisBranch"}
      />
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

      <DataGrid
        rows={dataRow.filter((row) =>
          row.marketName.toLowerCase().includes(search.toLowerCase())
        )}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5, 8]}
        localeText={{
          noRowsLabel: `${
            window.localStorage.getItem("branch") === "undefined" ||
            !window.localStorage.getItem("branch")
              ? "Please Select The Branch"
              : "No Data Available"
          }`,
        }}
        checkboxSelection
        onRowSelectionModelChange={handleSelectionModelChange}
      />
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
      {selectedRows.length > 0 ? (
        <div className={styles.buttons}>
          {selectedRows.length === 1 ? (
            <button className="get" onClick={() => handleOpen()}>
              Edit
            </button>
          ) : null}
          <button className="get" onClick={() => handleDelete(selectedRows)}>
            Delete
          </button>

          <button className="get" onClick={() => handleConfirm(selectedRows)}>
            Confirm
          </button>
        </div>
      ) : null}

      {state === true ? (
        <Notification
          auto={6000} // auto hide time in ms
          case="success"
          successfulMessage={`the medicine has been successfully deleted`}
          notification={notifDelete} // add state
          handleNotClose={handleNotClose} // on close function
        />
      ) : (
        <Notification
          auto={6000}
          case="error"
          unsuccessfulMessage={`the medicine has not been successfully deleted`}
          notification={notifDelete}
          handleNotClose={handleNotClose}
        />
      )}
    </App>
  );
};

export default AddNewM;
