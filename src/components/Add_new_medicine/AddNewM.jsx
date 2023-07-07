/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import App, { config } from "../../App";
import Search from "../../materials/Search";
import axios from "axios";
import AddNewCom from "./AddNewCom";
import SelectBranches from "./../../materials/SelectBranches";
import { DataGrid } from "@mui/x-data-grid";
import styles from "./AddNewM.module.css";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import FormatCurrency from "../../functions/FormatCurrency";
import swal from "sweetalert";
import Cart from "../../materials/Cart";
import handleDelete from "./../../functions/HandleDelete";
import PopUp from "./../../materials/PopUp";
import { Avatar } from "@mui/material";
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
  const [auth, setAuth] = useState("");
  const [marketSeatch, setMarketSearch] = useState("");
  const [effectiveSearch, setEffectiveSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [open, setOpen] = useState(false);
  const [openShow, setOpenShow] = useState(false);
  const [infoShow, setinfoShow] = useState([]);
  const [img, setImg] = useState(null);
  const [createTime, setCreateTime] = useState("");
  const [updateTime, setUpdateTime] = useState("");
  const [supplier, setSupplier] = useState("");
  const [category, setCategory] = useState("");
  const [openEdit, setOpenEdit] = useState(false);
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

  const handleMarketSearch = (e) => {
    setMarketSearch(e.target.value);
  };
  const handleEffectiveSearch = (e) => {
    setEffectiveSearch(e.target.value);
  };
  const handleOpen = () => setOpen(true);

  const handleOpenShow = (id) => {
    axios
      .get(
        `http://localhost:1234/api/v1/medicines/${id}?pharmacy=${window.localStorage.getItem(
          "thisBranch"
        )}`,
        config
      )
      .then((res) => {
        return res;
      })
      .catch((err) => {
        setOpenShow(true);
        setinfoShow(err.response.data.payload);
        if (err.response.data.payload.img !== null) {
          setImg(err.response.data.payload.img.split("\\").join("/"));
        }
        setCategory(err.response.data.payload.category.name);
        setSupplier(err.response.data.payload.supplier.name);
        setCreateTime(
          err.response.data.payload.createdAt.split("T").join(" At ")
        );
        setUpdateTime(
          err.response.data.payload.updatedAt.split("T").join(" At ")
        );
      });
  };

  const handleCloseShow = () => {
    setOpenShow(false);
  };

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

  useEffect(() => {
    setAuth(localStorage.getItem("role"));
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

    if (window.localStorage.getItem("thisBranch")) {
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
    }
  }, [deleteRequest, putRequest, postRequest, pharmacySelected]);

  return (
    <App>
      <SelectBranches
        medCat={"med"}
        value={pharmacySelected}
        setValue={setPharmacySelected}
        storage={"thisBranch"}
      />

      <div>
        <Autocomplete
          options={customers.map((customer) => ({
            id: customer.id,
            label: customer.name,
          }))}
          renderInput={(params) => <TextField {...params} label="Customers" />}
          value={customerValue}
          onChange={(e, value) => {
            setCustomerValue(value);
          }}
          sx={{
            width: "100%",
          }}
          isOptionEqualToValue={(option, value) => option.id === value.id}
        />
      </div>

      <div className="header">
        <h3 style={{ margin: 0 }}>Medicines</h3>
        <Search
          search={marketSeatch}
          handleSearch={handleMarketSearch}
          placeholder={"Search the market name"}
        />
        <Search
          search={effectiveSearch}
          handleSearch={handleEffectiveSearch}
          placeholder={"Search the Effective name"}
        />

        <div>
          {(auth === "super" || auth === "branch manager") && (
            <button className="get" onClick={handleOpen}>
              Create new Medicines
            </button>
          )}
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
        <Cart medicines={obj} setMedicines={setObj} dataRow={dataRow} />
      </div>

      <DataGrid
        rows={dataRow
          .filter((row) =>
            row.marketName.toLowerCase().includes(marketSeatch.toLowerCase())
          )
          .filter((row) =>
            row.scientificName
              .toLowerCase()
              .includes(effectiveSearch.toLowerCase())
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
            style={{ width: "400px" }}
            type="number"
            min={0}
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
          <button
            className="get"
            style={{
              marginLeft: "5px",
            }}
            onClick={() => {
              setObj([]);
              setQuant("");
            }}
          >
            Clear the selected Medicines
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
              <button className="get" onClick={() => handleOpenShow(id)}>
                Show
              </button>
              {(auth === "super" || auth === "branch manager") && (
                <button className="get" onClick={handleOpenEdit}>
                  Edit
                </button>
              )}
            </>
          ) : null}
          {(auth === "super" || auth === "branch manager") && (
            <button
              className="get"
              onClick={() => {
                handleDelete("medicines", selectedRows, setdeleteRequest);
              }}
            >
              Delete
            </button>
          )}

          <button
            className="get"
            onClick={() => {
              axios
                .post(
                  "http://localhost:1234/api/v1/transactions/create",
                  {
                    customer: customerValue && customerValue.id,
                    pharmacy: parseInt(
                      window.localStorage.getItem("thisBranch")
                    ),
                    medicines: obj,
                  },
                  config
                )
                .then((res) => {
                  setPostRequest(res);
                  setObj([]);
                  swal("The bill has been completed successfully!", {
                    icon: "success",
                  });
                })
                .catch((err) => {
                  if (!customerValue) {
                    swal("Please choose the Customer", {
                      icon: "error",
                    });
                  } else {
                    swal("Please choose the quantity of medicine", {
                      icon: "error",
                    });
                  }
                  return err;
                });
            }}
          >
            Confirm
          </button>
        </div>
      ) : null}
      <PopUp openModal={openShow} handleCloseModal={handleCloseShow}>
        <div style={{ textAlign: "center" }} className="pop">
          <h3>{infoShow.marketName}</h3>
          <Avatar
            sx={{
              bgcolor: "#aaa",
              width: "200px",
              height: "200px",
              fontSize: "50px",
              margin: "0 auto",
            }}
            variant="rounded"
            alt={infoShow.marketName}
            src={
              img !== null
                ? `http://localhost:1234/api/v1/users/load-file?file=${img}`
                : "null"
            }
          >
            {infoShow.marketName && Array.from(infoShow.marketName)[0]}
          </Avatar>

          <div className="cat-info">
            <p>
              category: <b>{category === null ? "Not Available" : category}</b>
            </p>
            <p>
              supplier: <b>{supplier === null ? "Not Available" : supplier}</b>
            </p>
            <p>
              Description:{" "}
              <b>
                {infoShow.description === null
                  ? "Not Available"
                  : infoShow.description}
              </b>
            </p>
            <p>
              Created At:{" "}
              <b>
                {infoShow.createdAt === null ? "Not Available" : createTime}
              </b>
            </p>
            <p>
              Created By:{" "}
              <b>
                {infoShow.createdBy === null
                  ? "Not Available"
                  : infoShow.createdBy}
              </b>
            </p>
            <p>
              Last Update at:{" "}
              <b>
                {infoShow.updatedAt === null ? "Not Available" : updateTime}
              </b>
            </p>
            <p>
              Updated By:{" "}
              <b>
                {infoShow.updatedBy === null
                  ? "Not Available"
                  : infoShow.updatedBy}
              </b>
            </p>
          </div>
        </div>
      </PopUp>
    </App>
  );
};

export default AddNewM;
