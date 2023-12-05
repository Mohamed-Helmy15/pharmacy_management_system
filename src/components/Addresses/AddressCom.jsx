import React, { useState } from "react";
import PopUp from "./../../materials/PopUp";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import axios from "axios";
import { config } from "../../App";
import { TextField } from "@mui/material/";
import { Autocomplete } from "@mui/material/";
import { egypt } from "./../../data/govs";
import swal from "sweetalert";

const AddressCom = (props) => {
  const [govError, setGovError] = useState(false);
  const [governerate, setGovernerate] = useState(null);
  const [city, setCity] = useState(null);
  const [cityError, setCityError] = useState(false);

  const handleClose = () => {
    props.setOpen(false);
    emptyFields();
  };

  const addressInitialValues = {
    town: "",
    street: "",
  };
  const emptyFields = () => {
    addressFormik.values.town = "";
    addressFormik.values.street = "";
    setGovernerate(null);
    setCity(null);
  };
  const addressValidate = (values) => {
    if (props.decide === "create") {
      let errors = {};
      if (!values.town) {
        errors.town = "Neighborhood is requierd";
      }
      return errors;
    } else {
    }
  };
  const addressSubmit = (values) => {
    if (props.decide === "create") {
      let address = {};
      address.governorate = governerate;
      address.city = city;
      address.town = values.town;
      if (values.street !== "") {
        address.street = values.street;
      }
      swal("The Address has not been created Successfully!", {
        icon: "error",
      });
      // axios
      //   .post("http://localhost:1234/api/v1/addresses/create/", address, config)
      //   .then((res) => {
      //     props.setPostRequest(res);
      //     handleClose();
      //     swal("The Address has been created Successfully!", {
      //       icon: "success",
      //     });
      //   })
      //   .catch((err) => {
      //     swal("The Address has not been created Successfully!", {
      //       icon: "error",
      //     });
      //     return err;
      //   });
    } else {
      let address = {};
      if (governerate !== null) {
        address.governorate = governerate;
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
      swal("The Address has not been edited Successfully!", {
        icon: "error",
      });
      // axios
      //   .put(
      //     `http://localhost:1234/api/v1/addresses/${props.id}/`,
      //     address,
      //     config
      //   )
      //   .then((res) => {
      //     props.setPutRequest(res);
      //     handleClose();
      //     swal("", "the address has been edited successfully!", "info");
      //   })
      //   .catch((err) => {
      //     swal("The Address has not been edited Successfully!", {
      //       icon: "error",
      //     });
      //     return err;
      //   });
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
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              style={{
                marginBottom: "10px",
              }}
            >
              Add a New Address
            </Typography>
            <div>
              <form onSubmit={addressFormik.handleSubmit}>
                <Autocomplete
                  options={Object.keys(egypt)}
                  renderInput={(params) => (
                    <TextField
                      onBlur={() => {
                        if (governerate === null) {
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
                  value={governerate}
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
                    governerate !== null ? Object.keys(egypt[governerate]) : []
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
        </>
      ) : (
        <>
          <PopUp openModal={props.open} handleCloseModal={handleClose}>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              style={{
                marginBottom: "10px",
              }}
            >
              Edit the Address
            </Typography>
            <div>
              <form onSubmit={addressFormik.handleSubmit}>
                <Autocomplete
                  options={Object.keys(egypt)}
                  renderInput={(params) => (
                    <TextField
                      onBlur={() => {
                        if (governerate === null) {
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
                  value={governerate}
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
                    governerate !== null ? Object.keys(egypt[governerate]) : []
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Cities" />
                  )}
                  value={city}
                  onChange={(e, value) => {
                    setCity(value);
                  }}
                  sx={{ width: "100%" }}
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
        </>
      )}
    </>
  );
};

export default AddressCom;
