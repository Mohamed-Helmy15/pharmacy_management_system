/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import App, { config } from "../../App";
import Search from "../../materials/Search";
import axios from "axios";
import AddNewCom from "./AddNewCom";
import SelectBranches from "./../../materials/SelectBranches";
import { DataGrid } from "@mui/x-data-grid";
import styles from "./AddNewM.module.css";
import PopUp from "../../materials/PopUp";
import CountButton from "../../materials/CountButton";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import FormatCurrency from "../../FormatCurrency";
import swal from "sweetalert";
const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "marketName", headerName: "market name", width: 190 },
  { field: "scientificName", headerName: "scientific name", width: 190 },
  {
    field: "count",
    headerName: "Count",
    type: "number",
    editable: true,
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
  const [openEdit, setOpenEdit] = useState(false);
  // const [openConfirm, setOpenConfirm] = useState(false);
  const [putRequest, setPutRequest] = useState("");
  const [dataRow, setDataRow] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [postRequest, setPostRequest] = useState("");
  const [deleteRequest, setdeleteRequest] = useState("");
  const [pharmacySelected, setPharmacySelected] = useState(null);
  const [id, setId] = useState("");
  const [count, setCount] = useState("");
  const [customers, setCustomers] = useState([]);
  const [customerValue, setCustomerValue] = useState(null);
  const [Quant, setQuant] = useState("");
  const [obj, setObj] = useState([]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const handleOpen = () => setOpen(true);

  const handleOpenEdit = () => setOpenEdit(true);

  const handleSelectionModelChange = (selectionModel) => {
    const selectedRowObjects = dataRow.filter((row) =>
      selectionModel.includes(row.id)
    );
    setSelectedRows(selectedRowObjects);
    if (selectedRowObjects.length > 0) {
      setId(selectedRowObjects[0].id);
    }
  };

  const handleDelete = (rows) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover it",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        rows.map((row) => {
          axios
            .delete(`http://localhost:1234/api/v1/medicines/${row.id}`, config)
            .then((res) => {
              setdeleteRequest(res);
              swal("Deleted Successfully!", {
                icon: "success",
              });
            })
            .catch((err) => {
              swal("", "the delete operation hasn't been completed!", "info");
            });
          return true;
        });
      } else {
        swal("", "the delete operation hasn't been completed!", "info");
      }
    });
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
      .get("http://localhost:1234/api/v1/customers", config)
      .then((res) => {
        setCustomers(res.data.payload);
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
  }, [deleteRequest, putRequest, postRequest, pharmacySelected]);

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
        rows={dataRow
          .filter((row) =>
            row.marketName.toLowerCase().includes(search.toLowerCase())
          )
          .map((row) => ({
            id: row.id,
            marketName: row.marketName,
            scientificName: row.scientificName,
            count: row.count,
            price: FormatCurrency(row.price),
            expiration: row.expiration,
            type: row.type,
          }))}
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
        onStateChange={(params) => {
          if (params.editRows[`${id}`]) {
            setCount(params.editRows[`${id}`].count.value);
          }
        }}
        onCellEditStop={(params) => {
          let updatedCount = {
            pharmacy: window.localStorage.getItem("thisBranch"),
            medicine: id,
            count,
          };
          axios
            .post(
              "http://localhost:1234/api/v1/medicines/update-count",
              updatedCount,
              config
            )
            .then((res) => setPutRequest(res))
            .catch((err) => err);
        }}
      />
      {selectedRows.length === 1 ? (
        <div
          style={{
            margin: "10px auto",
            width: "fit-content",
          }}
        >
          <input
            className="search-input"
            type="number"
            placeholder="choose quantity of the selected medicine"
            name="count"
            id="count"
            value={Quant}
            onChange={(e) => {
              setQuant(e.target.value);
            }}
          />
          <button
            className="get"
            style={{
              marginLeft: "5px",
            }}
            onClick={() => {
              setObj((prevObj) => [...prevObj, { medicine: id, count: Quant }]);
              setQuant("");
            }}
          >
            Add The Medicine
          </button>
        </div>
      ) : null}
      <AddNewCom
        decide={"edit"}
        open={openEdit}
        setOpen={setOpenEdit}
        id={id}
        categories={categories}
        types={types}
        supplires={suppliers}
        setPostRequest={setPostRequest}
        setPutRequest={setPutRequest}
      />

      {selectedRows.length > 0 ? (
        <div className={styles.buttons}>
          {selectedRows.length === 1 ? (
            <>
              <button className="get" onClick={handleOpenEdit}>
                Edit
              </button>
            </>
          ) : null}
          <button className="get" onClick={() => handleDelete(selectedRows)}>
            Delete
          </button>

          <button
            className="get"
            onClick={() => {
              axios
                .post(
                  "http://localhost:1234/api/v1/transactions/create",
                  {
                    customer: 1,
                    pharmacy: 1,
                    medicines: obj,
                  },
                  config
                )
                .then((res) => {
                  setPostRequest(res);

                  swal("The bill has been completed successfully!", {
                    icon: "success",
                  });
                })
                .catch((err) => {
                  swal("Please choose the quantity of medicine", {
                    icon: "error",
                  });
                  return err;
                });
            }}
          >
            Confirm
          </button>
        </div>
      ) : null}
    </App>
  );
};

export default AddNewM;
