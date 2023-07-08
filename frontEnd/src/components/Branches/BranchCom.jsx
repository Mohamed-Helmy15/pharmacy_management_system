import React, { useState } from "react";
import { config } from "../../App";
import { egypt } from "./../../data/govs";
import PopUp from "./../../materials/PopUp";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import { useFormik } from "formik";
import swal from "sweetalert";

const BranchCom = (props) => {
  const [governorate, setGovernerate] = useState(null);
  const [city, setCity] = useState(null);
  const [error, setError] = useState(false);
  const [govError, setGovError] = useState(false);
  const [cityError, setCityError] = useState(false);
  const [managerValue, setManagerValue] = useState(null);
  const [usersValue, setUserValue] = useState([]);
  const handleClose = () => {
    props.setOpen(false);
    addressEmptyFields();
  };

  const addressInitialValues = {
    name: "",
    town: "",
    street: "",
  };
  const addressEmptyFields = () => {
    addressFormik.values.name = "";
    addressFormik.values.town = "";
    addressFormik.values.street = "";
    setGovernerate(null);
    setCity(null);
  };
  const addressValidate = (values) => {
    if (props.decide === "create") {
      let errors = {};
      if (!values.name) {
        errors.name = "Branch Name is requierd";
      }
      if (!values.town) {
        errors.town = "Neighborhood is requierd";
      }
      return errors;
    }
  };
  const addressSubmit = (values) => {
    if (props.decide === "create") {
      let branch = {};
      branch.name = values.name;
      branch.manager = managerValue.id;
      branch.users = usersValue;
      let address = {};
      address.governorate = governorate;
      address.city = city;
      address.town = values.town;
      if (values.street !== "") {
        address.street = values.street;
      }
      axios
        .post("http://localhost:1234/api/v1/addresses/create/", address, config)
        .then((res) => {
          if (res.data.success === true) {
            axios
              .get(
                "http://localhost:1234/api/v1/addresses?page=0&size=100&sort=id",
                config
              )
              .then((res) => {
                branch.address = res.data.payload.slice(-1)[0].id;
                axios
                  .post(
                    "http://localhost:1234/api/v1/pharmacies/create",
                    branch,
                    config
                  )
                  .then((res) => {
                    props.setPutRequest(res);

                    handleClose();
                    swal("The New Branch has been created Successfully!", {
                      icon: "success",
                    });
                  })
                  .catch((err) => {
                    if (err.response.data.success === false) {
                      props.setPutRequest(err);
                      handleClose();
                      swal("The Branch has been created wrongly!", {
                        icon: "error",
                      });
                    }
                  });
              })
              .catch((err) => err);
          }
        })
        .catch((err) => err);
    } else {
      let branch = {};
      let address = {};

      if (values.name !== "") {
        branch.name = values.name;
      }
      if (governorate !== null) {
        address.governorate = governorate;
      }
      if (city !== null) {
        address.city = city;
      }
      if (values.town !== "") {
        address.town = values.town;
      }
      if (values.street !== "") {
        address.street = values.street;
      }
      if (managerValue !== null) {
        branch.manager = managerValue.id;
      }
      if (usersValue !== []) {
        branch.users = usersValue;
      }
      axios
        .get(`http://localhost:1234/api/v1/pharmacies/${props.id}`, config)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          axios
            .put(
              `http://localhost:1234/api/v1/addresses/${err.response.data.payload.address.id}`,
              address,
              config
            )
            .then((res) => {
              axios
                .put(
                  `http://localhost:1234/api/v1/pharmacies/${props.id}`,
                  branch,
                  config
                )
                .then((res) => {
                  props.setPutRequest(res);
                  handleClose();
                  swal("The Branch has been edited Successfully!", {
                    icon: "success",
                  });
                })
                .catch((err) => {
                  swal("The Branch has been edited wrongly!", {
                    icon: "error",
                  });
                  return err;
                });
            })
            .catch((err) => err);
        });
    }
  };
  const addressFormik = useFormik({
    initialValues: addressInitialValues,
    onSubmit: addressSubmit,
    validate: addressValidate,
  });

  return (
    <>
      {props.decide === "create" ? (
        <>
          <PopUp openModal={props.open} handleCloseModal={handleClose}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Create a New Branch
            </Typography>
            <div>
              <form onSubmit={addressFormik.handleSubmit}>
                <TextField
                  type="text"
                  id="name"
                  name="name"
                  variant="standard"
                  {...addressFormik.getFieldProps("name")}
                  label="Branch Name"
                  style={{ width: "100%" }}
                  error={
                    addressFormik.touched.name && addressFormik.errors.name
                      ? true
                      : false
                  }
                  helperText={
                    addressFormik.touched.name &&
                    addressFormik.errors.name &&
                    addressFormik.errors.name
                  }
                />
                <Autocomplete
                  options={Object.keys(egypt)}
                  renderInput={(params) => (
                    <TextField
                      onBlur={() => {
                        if (governorate === null) {
                          setGovError(true);
                        } else {
                          setGovError(false);
                        }
                      }}
                      error={govError && true}
                      helperText={govError && "required"}
                      {...params}
                      label="governerates"
                    />
                  )}
                  value={governorate}
                  onChange={(e, value) => {
                    setGovernerate(value);
                    setCity(null);
                  }}
                  sx={{ width: "100%" }}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                />
                <Autocomplete
                  options={
                    governorate !== null ? Object.keys(egypt[governorate]) : []
                  }
                  renderInput={(params) => (
                    <TextField
                      onBlur={() => {
                        if (city === null) {
                          setCityError(true);
                        } else {
                          setCityError(false);
                        }
                      }}
                      error={cityError && true}
                      helperText={cityError && "required"}
                      {...params}
                      label="Cities"
                    />
                  )}
                  value={city}
                  onChange={(e, value) => {
                    setCity(value);
                  }}
                  sx={{ width: "100%" }}
                  // freeSolo
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                />
                <TextField
                  type="text"
                  id="town"
                  name="town"
                  variant="standard"
                  {...addressFormik.getFieldProps("town")}
                  label="Neighborhood"
                  style={{ width: "100%" }}
                  error={
                    addressFormik.touched.town && addressFormik.errors.town
                      ? true
                      : false
                  }
                  helperText={
                    addressFormik.touched.town &&
                    addressFormik.errors.town &&
                    addressFormik.errors.town
                  }
                />
                <TextField
                  type="text"
                  name="street"
                  id="street"
                  variant="standard"
                  {...addressFormik.getFieldProps("street")}
                  label="Street"
                  style={{ width: "100%" }}
                />
                <Autocomplete
                  options={props.manager.map((manager) => ({
                    id: manager.id,
                    label: manager.name,
                  }))}
                  value={managerValue}
                  onChange={(e, value) => {
                    setManagerValue(value);
                  }}
                  sx={{ width: "100%" }}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  renderInput={(params) => (
                    <TextField
                      onBlur={() => {
                        if (managerValue === null) {
                          setError(true);
                        } else {
                          setError(false);
                        }
                      }}
                      error={error && true}
                      helperText={error && "Manager is Required"}
                      {...params}
                      label="Manager"
                    />
                  )}
                />
                <Autocomplete
                  multiple
                  id="tags-standard"
                  options={props.manager}
                  getOptionLabel={(option) => option.name}
                  defaultValue={[]}
                  onChange={(e, newValue) => {
                    setUserValue(newValue.map((value) => value.id));
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      label="Users"
                      placeholder="Users"
                    />
                  )}
                />
                <button
                  type="submit"
                  style={{
                    display: "block",
                    margin: "10px auto 0",
                  }}
                  className="get"
                >
                  Submit
                </button>
              </form>
            </div>
          </PopUp>
        </>
      ) : (
        <>
          <Typography id="transition-modal-title" variant="h6" component="h2">
            Edit the Branch
          </Typography>
          <div>
            <form onSubmit={addressFormik.handleSubmit}>
              <TextField
                type="text"
                id="name"
                name="name"
                variant="standard"
                {...addressFormik.getFieldProps("name")}
                label="Branch Name"
                style={{ width: "100%" }}
              />
              <Autocomplete
                options={Object.keys(egypt)}
                renderInput={(params) => (
                  <TextField
                    onBlur={() => {
                      if (governorate === null) {
                        setGovError(true);
                      } else {
                        setGovError(false);
                      }
                    }}
                    error={govError && true}
                    helperText={govError && "required"}
                    {...params}
                    label="governerates"
                  />
                )}
                value={governorate}
                onChange={(e, value) => {
                  setGovernerate(value);
                  setCity(null);
                }}
                sx={{ width: "100%" }}
                isOptionEqualToValue={(option, value) => option.id === value.id}
              />
              <Autocomplete
                options={
                  governorate !== null ? Object.keys(egypt[governorate]) : []
                }
                renderInput={(params) => (
                  <TextField
                    onBlur={() => {
                      if (city === null) {
                        setCityError(true);
                      } else {
                        setCityError(false);
                      }
                    }}
                    error={cityError && true}
                    helperText={cityError && "required"}
                    {...params}
                    label="Cities"
                  />
                )}
                value={city}
                onChange={(e, value) => {
                  setCity(value);
                }}
                sx={{ width: "100%" }}
                // freeSolo
                isOptionEqualToValue={(option, value) => option.id === value.id}
              />
              <TextField
                type="text"
                id="town"
                name="town"
                variant="standard"
                {...addressFormik.getFieldProps("town")}
                label="Neighborhood"
                style={{ width: "100%" }}
                error={
                  addressFormik.touched.town && addressFormik.errors.town
                    ? true
                    : false
                }
                helperText={
                  addressFormik.touched.town &&
                  addressFormik.errors.town &&
                  addressFormik.errors.town
                }
              />
              <TextField
                type="text"
                name="street"
                id="street"
                variant="standard"
                {...addressFormik.getFieldProps("street")}
                label="Street"
                style={{ width: "100%" }}
              />
              <Autocomplete
                options={props.manager.map((manager) => ({
                  id: manager.id,
                  label: manager.name,
                }))}
                value={managerValue}
                onChange={(e, value) => {
                  setManagerValue(value);
                }}
                sx={{ width: "100%" }}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={(params) => (
                  <TextField
                    onBlur={() => {
                      if (managerValue === null) {
                        setError(true);
                      } else {
                        setError(false);
                      }
                    }}
                    error={error && true}
                    helperText={error && "Manager is Required"}
                    {...params}
                    label="Manager"
                  />
                )}
              />
              <Autocomplete
                multiple
                id="tags-standard"
                options={props.manager}
                getOptionLabel={(option) => option.name}
                defaultValue={[]}
                onChange={(e, newValue) => {
                  setUserValue(newValue.map((value) => value.id));
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="Users"
                    placeholder="Users"
                  />
                )}
              />
              <button
                type="submit"
                style={{
                  display: "block",
                  margin: "10px auto 0",
                }}
                className="get"
              >
                Submit
              </button>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default BranchCom;
