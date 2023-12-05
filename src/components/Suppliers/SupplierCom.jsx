import React, { useState } from "react";
import PopUp from "./../../materials/PopUp";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import axios from "axios";
import { config } from "../../App";
import { TextField } from "@mui/material/";
import { Autocomplete } from "@mui/material/";
import swal from "sweetalert";

const SupplierCom = (props) => {
  const [addressValue, setAddressValue] = useState(null);
  const [error, setError] = useState(false);

  const handleClose = () => {
    props.setOpen(false);
    emptyFields();
  };

  const suppliersInitialValues = {
    name: "",
    email: "",
    phones: [],
  };

  const suppliersValidate = (values) => {
    if (props.decide === "create") {
      let errors = {};
      if (!values.name) {
        errors.name = "name is required";
      }
      if (values.email) {
        if (!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/i.test(values.email)) {
          errors.email = "Invalid Email format";
        }
      } else {
        errors.email = "email is required";
      }
      if (!addressValue) {
        errors.address = "address is required";
      }

      if (values.phones) {
        if (!/(\d{11})$/i.test(values.phones)) {
          errors.phones = "Invalid phones number format";
        }
      }
      return errors;
    } else {
      let errors = {};
      if (values.email) {
        if (!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/i.test(values.email)) {
          errors.email = "Invalid Email format";
        }
      } else {
        errors.email = "email is required";
      }

      if (values.phones) {
        if (!/(\d{11})$/i.test(values.phones)) {
          errors.phones = "Invalid phones number format";
        }
      }
    }
  };

  const onSubmit = (values) => {
    if (props.decide === "create") {
      let suppliers = {
        name: values.name,
        email: values.email,
        address: addressValue.id,
        phones: values.phones.split("\n"),
      };
      swal("The Supplier has been created wrongly!", {
        icon: "error",
      });
      // axios
      //   .post(
      //     `http://localhost:1234/api/v1/suppliers/create`,
      //     suppliers,
      //     config
      //   )
      //   .then((res) => {
      //     props.setPutRequest(res);
      //     handleClose();
      //     swal("The Supplier has been created Successfully!", {
      //       icon: "success",
      //     });
      //     emptyFields();
      //   })
      //   .catch((err) => {
      //     swal("The Supplier has been created wrongly!", {
      //       icon: "error",
      //     });
      //     return err;
      //   });
    } else {
      let suppliers = {};
      if (values.name !== "") {
        suppliers.name = values.name;
      }
      if (values.email !== "") {
        suppliers.email = values.email;
      }
      if (values.phones.length !== 0) {
        suppliers.phones = values.phones.split("\n");
      }
      if (addressValue !== null) {
        suppliers.address = addressValue;
      }
      swal("The Supplier has been edited wrongly!", {
        icon: "error",
      });
      // axios
      //   .put(
      //     `http://localhost:1234/api/v1/suppliers/${props.id}`,
      //     suppliers,
      //     config
      //   )
      //   .then((res) => {
      //     props.setPutRequest(res);
      //     handleClose();
      //     swal("The Supplier has been edited Successfully!", {
      //       icon: "success",
      //     });
      //     emptyFields();
      //   })
      //   .catch((err) => {
      //     swal("The Supplier has been edited wrongly!", {
      //       icon: "error",
      //     });
      //     return err;
      //   });
    }
  };

  const suppliersFormik = useFormik({
    initialValues: suppliersInitialValues,
    onSubmit,
    validate: suppliersValidate,
  });

  const emptyFields = () => {
    suppliersFormik.values.name = "";
    suppliersFormik.values.email = "";
    setAddressValue(null);
    suppliersFormik.values.phones = [];
  };

  return (
    <>
      {props.decide === "create" ? (
        <>
          <PopUp openModal={props.open} handleCloseModal={handleClose}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Create a New supplier
            </Typography>
            <div className="pop">
              <form onSubmit={suppliersFormik.handleSubmit}>
                <TextField
                  type="text"
                  id="name"
                  name="name"
                  variant="standard"
                  {...suppliersFormik.getFieldProps("name")}
                  label="Supplier Name"
                  style={{ width: "100%" }}
                  error={
                    suppliersFormik.touched.name && suppliersFormik.errors.name
                      ? true
                      : false
                  }
                  helperText={
                    suppliersFormik.touched.name &&
                    suppliersFormik.errors.name &&
                    suppliersFormik.errors.name
                  }
                />
                <TextField
                  type="text"
                  id="email"
                  name="email"
                  variant="standard"
                  {...suppliersFormik.getFieldProps("email")}
                  label="Supplier Email"
                  style={{ width: "100%" }}
                  error={
                    suppliersFormik.touched.email &&
                    suppliersFormik.errors.email
                      ? true
                      : false
                  }
                  helperText={
                    suppliersFormik.touched.email &&
                    suppliersFormik.errors.email &&
                    suppliersFormik.errors.email
                  }
                />
                <Autocomplete
                  options={props.address.map((address) => ({
                    id: address.id,
                    label: `${address.governorate} - ${address.city} - ${
                      address.town
                    } ${address.street !== null ? "- " + address.street : ""}`,
                  }))}
                  renderInput={(params) => (
                    <TextField
                      onBlur={() => {
                        if (addressValue === null) {
                          setError(true);
                        } else {
                          setError(false);
                        }
                      }}
                      error={error && true}
                      helperText={error && "Manager is Required"}
                      {...params}
                      label="Addresses"
                    />
                  )}
                  value={addressValue}
                  onChange={(e, value) => {
                    setAddressValue(value);
                  }}
                  sx={{ width: "100%" }}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                />
                <TextField
                  type="text"
                  id="phones"
                  name="phones"
                  variant="standard"
                  {...suppliersFormik.getFieldProps("phones")}
                  label="Supplier Phone Numbers"
                  style={{ width: "100%" }}
                  error={
                    suppliersFormik.touched.phones &&
                    suppliersFormik.errors.phones
                      ? true
                      : false
                  }
                  helperText={
                    suppliersFormik.touched.phones &&
                    suppliersFormik.errors.phones &&
                    suppliersFormik.errors.phones
                  }
                  multiline
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
          <PopUp openModal={props.open} handleCloseModal={handleClose}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Edit the supplier
            </Typography>
            <div className="pop">
              <form onSubmit={suppliersFormik.handleSubmit}>
                <TextField
                  type="text"
                  id="name"
                  name="name"
                  variant="standard"
                  {...suppliersFormik.getFieldProps("name")}
                  label="Supplier Name"
                  style={{ width: "100%" }}
                  error={
                    suppliersFormik.touched.name && suppliersFormik.errors.name
                      ? true
                      : false
                  }
                  helperText={
                    suppliersFormik.touched.name &&
                    suppliersFormik.errors.name &&
                    suppliersFormik.errors.name
                  }
                />
                <TextField
                  type="text"
                  id="email"
                  name="email"
                  variant="standard"
                  {...suppliersFormik.getFieldProps("email")}
                  label="Supplier Email"
                  style={{ width: "100%" }}
                  error={
                    suppliersFormik.touched.email &&
                    suppliersFormik.errors.email
                      ? true
                      : false
                  }
                  helperText={
                    suppliersFormik.touched.email &&
                    suppliersFormik.errors.email &&
                    suppliersFormik.errors.email
                  }
                />
                <Autocomplete
                  options={props.address.map((address) => ({
                    id: address.id,
                    label: `${address.governorate} - ${address.city} - ${
                      address.town
                    } ${address.street !== null ? "- " + address.street : ""}`,
                  }))}
                  renderInput={(params) => (
                    <TextField
                      onBlur={() => {
                        if (addressValue === null) {
                          setError(true);
                        } else {
                          setError(false);
                        }
                      }}
                      error={error && true}
                      helperText={error && "Manager is Required"}
                      {...params}
                      label="Addresses"
                    />
                  )}
                  value={addressValue}
                  onChange={(e, value) => {
                    setAddressValue(value);
                  }}
                  sx={{ width: "100%" }}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                />
                <TextField
                  type="text"
                  id="phones"
                  name="phones"
                  variant="standard"
                  {...suppliersFormik.getFieldProps("phones")}
                  label="Supplier Phone Numbers"
                  style={{ width: "100%" }}
                  error={
                    suppliersFormik.touched.phones &&
                    suppliersFormik.errors.phones
                      ? true
                      : false
                  }
                  helperText={
                    suppliersFormik.touched.phones &&
                    suppliersFormik.errors.phones &&
                    suppliersFormik.errors.phones
                  }
                  multiline
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
      )}
    </>
  );
};

export default SupplierCom;
