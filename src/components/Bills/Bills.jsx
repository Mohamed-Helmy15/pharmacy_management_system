import React, { useState, useEffect } from "react";
import App, { config } from "../../App";
import Search from "../../materials/Search";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import FormatCurrency from "./../../functions/FormatCurrency";
import swal from "sweetalert";
import PopUp from "./../../materials/PopUp";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import handleDelete from "./../../functions/HandleDelete";

const columns = [
  { field: "id", headerName: "ID", width: 170 },
  { field: "customer", headerName: "Customer", width: 170 },
  { field: "createdAt", headerName: "Date", width: 270 },
  { field: "price", headerName: "Price", width: 200 },
];

const Bills = () => {
  const [search, setSearch] = useState("");
  const [openShow, setOpenShow] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [dataRow, setDataRow] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [customersVal, setCustomersVal] = useState(null);
  const [pharmacies, setPharmacies] = useState([]);
  const [pharmaciesVal, setPharmaciesVal] = useState(null);
  const [meds, setMeds] = useState([]);
  const [medsVal, setMedsVal] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [infoShow, setinfoShow] = useState([]);
  const [createTime, setCreateTime] = useState("");
  const [updateTime, setUpdateTime] = useState("");
  const [customer, setCustomer] = useState("");
  const [customerError, setCustomerError] = useState(false);
  const [pharmacy, setPharmacy] = useState("");
  const [id, setId] = useState("");
  const [putRequest, setPutRequest] = useState("");
  const [deleteRequest, setdeleteRequest] = useState("");
  const [Quant, setQuant] = useState("");
  const [obj, setObj] = useState([]);
  const [resell, setResell] = useState([]);

  const handleOpenEdit = () => {
    setOpenEdit(true);
  };

  const emptyFields = () => {
    setCustomersVal(null);
    setPharmaciesVal(null);
    setMedsVal("");
  };

  const handleClose = () => {
    setOpenEdit(false);
    setObj([]);
    emptyFields();
  };

  const billInitialValues = {
    customersVal: null,
    pharmaciesVal: null,
    medsVal: null,
  };

  const billValidate = () => {
    let errors = {};
    if (!customersVal) {
      errors.customer = "customer is required";
      setCustomerError(true);
    }
    return errors;
  };

  const onSubmit = () => {
    let data = {};
    data.customer = customersVal.id;
    if (pharmaciesVal !== null) {
      data.pharmacy = pharmaciesVal.id;
    }
    if (medsVal !== null) {
      data.medicines = obj;
    }

    axios
      .put(`http://localhost:1234/api/v1/transactions/${id}`, data, config)
      .then((res) => {
        setPutRequest(res);
        handleClose();

        swal("The bill has been edited successfully!", {
          icon: "success",
        });
      })
      .catch((err) => {
        swal("The bill editing has been Failed!", {
          icon: "success",
        });
        return err;
      });
  };

  const billFormik = useFormik({
    initialValues: billInitialValues,
    onSubmit,
    validate: billValidate,
  });

  const handleOpenShow = (id) => {
    axios
      .get(`http://localhost:1234/api/v1/transactions/${id}`, config)
      .then((res) => res)
      .catch((err) => {
        setOpenShow(true);
        setinfoShow(err.response.data.payload);
        setMedicines(err.response.data.payload.medicines);
        setCustomer(err.response.data.payload.customer.name);
        setPharmacy(err.response.data.payload.pharmacy.name);
        setCreateTime(
          err.response.data.payload.createdAt.split("T").join(" At ")
        );
        setUpdateTime(
          err.response.data.payload.updatedAt.split("T").join(" At ")
        );
        medicines.map((med) => {
          return setResell((prevObj) => [
            ...prevObj,
            { medicine: med.medicine.id, count: med.count },
          ]);
        });
      });
  };
  const handleCloseShow = () => {
    setOpenShow(false);
    setResell([]);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

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
    axios
      .get(
        `http://localhost:1234/api/v1/transactions?page=0&&size=100&&sort=id`,
        config
      )
      .then((res) => setDataRow(res.data.payload))
      .catch((err) => err);
    axios
      .get("http://localhost:1234/api/v1/customers/", config)
      .then((res) => setCustomers(res.data.payload))
      .catch((err) => err);
    axios
      .get("http://localhost:1234/api/v1/pharmacies/", config)
      .then((res) => setPharmacies(res.data.payload))
      .catch((err) => err);
    if (window.localStorage.getItem("thisBranch")) {
      axios
        .get(
          `http://localhost:1234/api/v1/medicines?&sort=marketName&pharmacy=${window.localStorage.getItem(
            "thisBranch"
          )}`,
          config
        )
        .then((res) => setMeds(res.data.payload))
        .catch((err) => err);
    }
  }, [deleteRequest, putRequest]);

  return (
    <App>
      <div className="header">
        <h3 style={{ margin: 0 }}>Bills</h3>
        <Search
          search={search}
          handleSearch={handleSearch}
          placeholder={"Search the customer name"}
        />
      </div>

      <DataGrid
        rows={dataRow
          .filter((row) =>
            row.customer.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((row) => ({
            id: row.id,
            customer: row.customer.name,
            createdAt: row.createdAt.split("T").join(" AT "),
            price: FormatCurrency(row.price),
          }))}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5, 10, 20]}
        localeText={{
          noRowsLabel: `${"No Data Available"}`,
        }}
        checkboxSelection
        onRowSelectionModelChange={handleSelectionModelChange}
      />
      {selectedRows.length > 0 ? (
        <div className="buttons">
          {selectedRows.length === 1 ? (
            <>
              <button
                className="get"
                onClick={() => {
                  handleOpenEdit();
                }}
              >
                Edit
              </button>
              <button
                className="get"
                onClick={() => {
                  handleOpenShow(id);
                }}
              >
                Show
              </button>
            </>
          ) : null}
          <button
            className="get"
            onClick={() => {
              handleDelete("transactions", selectedRows, setdeleteRequest);
            }}
          >
            Delete
          </button>
        </div>
      ) : null}

      <PopUp openModal={openShow} handleCloseModal={handleCloseShow}>
        <div style={{ textAlign: "center" }} className="pop">
          <div className="cat-info">
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <h3>Medicines</h3>
              </AccordionSummary>
              <AccordionDetails>
                {medicines.map((medicine, i) => {
                  return (
                    <p
                      key={medicine.medicine.id}
                      className="med"
                      style={{ fontWeight: "bold" }}
                    >
                      <span>
                        {i + 1} : {medicine.medicine.marketName}
                      </span>{" "}
                      <span>
                        Price : {FormatCurrency(medicine.medicine.price)}
                      </span>
                      <span>Count : {medicine.count}</span>
                    </p>
                  );
                })}
              </AccordionDetails>
            </Accordion>

            <p>
              customer: <b>{customer === null ? "Not Available" : customer}</b>
            </p>
            <p>
              Branch: <b>{pharmacy === null ? "Not Available" : pharmacy}</b>
            </p>

            <p>
              Total Price:{" "}
              <b>
                {infoShow.price === null
                  ? "Not Available"
                  : FormatCurrency(infoShow.price)}
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
            <button
              className="get"
              style={{ margin: "10px auto 0", display: "block" }}
              onClick={() => {
                swal({
                  title: "Are you sure?",
                  text: "you will Resell the Invoice again",
                  icon: "info",
                  buttons: true,
                }).then((sure) => {
                  if (sure) {
                    axios
                      .post(
                        `http://localhost:1234/api/v1/transactions/create`,
                        {
                          customer: infoShow.customer.id,
                          pharmacy: parseInt(
                            window.localStorage.getItem("thisBranch")
                          ),
                          medicines: resell,
                        },
                        config
                      )
                      .then((res) => {
                        setPutRequest(res);
                        handleCloseShow();

                        swal("The Invoice Reselled Successfully!", {
                          icon: "success",
                        });
                      })
                      .catch((err) => {
                        console.log(err);
                        setPutRequest(err);
                        swal(
                          "",
                          "The Invoice hasn't been Reselled completed!",
                          "error"
                        );
                      });
                    return true;
                  } else {
                    swal(
                      "",
                      "the delete operation hasn't been completed!",
                      "error"
                    );
                  }
                });
              }}
            >
              Resell the Invoice
            </button>
          </div>
        </div>
      </PopUp>
      <PopUp openModal={openEdit} handleCloseModal={handleClose}>
        <Typography
          id="transition-modal-title"
          variant="h6"
          component="h2"
          style={{
            marginBottom: "10px",
          }}
        >
          Edit the Invoice
        </Typography>
        <div>
          <form onSubmit={billFormik.handleSubmit}>
            <Autocomplete
              options={customers.map((customer) => ({
                id: customer.id,
                label: customer.name,
              }))}
              {...billFormik.getFieldProps("customer")}
              renderInput={(params) => (
                <TextField
                  onBlur={() => {
                    if (customersVal === null) {
                      setCustomerError(true);
                    } else {
                      setCustomerError(false);
                    }
                  }}
                  error={customerError && true}
                  helperText={customerError && "required"}
                  {...params}
                  label="Customers"
                />
              )}
              value={customersVal}
              onChange={(e, value) => {
                setCustomersVal(value);
              }}
              sx={{ width: "100%" }}
              isOptionEqualToValue={(option, value) => option.id === value.id}
            />
            <Autocomplete
              options={pharmacies.map((pharmacy) => ({
                id: pharmacy.id,
                label: pharmacy.name,
              }))}
              renderInput={(params) => (
                <TextField {...params} label="Pharmacies" />
              )}
              value={pharmaciesVal}
              onChange={(e, value) => {
                setPharmaciesVal(value);
              }}
              sx={{ width: "100%" }}
              isOptionEqualToValue={(option, value) => option.id === value.id}
            />

            <div
              style={{
                padding: "10px",
                border: "1px solid #0f467e",
                borderRadius: "5px",
                marginBottom: "10px",
              }}
            >
              <Autocomplete
                multiple
                id="tags-standard"
                options={meds.map((medicine) => ({
                  id: medicine.id,
                  title: medicine.marketName,
                }))}
                getOptionLabel={(option) => option.title}
                defaultValue={[]}
                onChange={(e, newValue) => {
                  setMedsVal(newValue.map((value) => value.id));
                }}
                sx={{ width: "100%" }}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="Mediciens"
                    placeholder="Mediciens"
                  />
                )}
              />

              <div
                style={{
                  margin: "10px",
                  width: "fit-content",
                  display: "flex",
                  gap: "10px",
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
                <p
                  className="get"
                  style={{
                    marginLeft: "5px",
                  }}
                  onClick={() => {
                    setObj((prevObj) => [
                      ...prevObj,
                      { medicine: medsVal.slice(-1)[0], count: Quant },
                    ]);
                    setQuant("");
                  }}
                >
                  Add The Medicine
                </p>

                <p
                  style={{
                    display: "block",
                  }}
                  onClick={() => {
                    setObj([]);
                    setQuant("");
                    setMedsVal("");
                  }}
                  className="get"
                >
                  Clear the selected Medicines
                </p>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "15px",
              }}
            >
              <button
                style={{
                  display: "block",
                }}
                className="get"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </PopUp>
    </App>
  );
};

export default Bills;
