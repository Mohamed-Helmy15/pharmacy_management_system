import React, { useState } from "react";
import { config } from "../../App";
import { egypt } from "./../../data/govs";
import PopUp from "../../materials/PopUp";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import axios from "axios";
import Autocomplete from "@mui/material/Autocomplete";
import swal from "sweetalert";

const CustomerCom = (props) => {
  const [addressCustomer, setAddressCustomer] = useState(false);
  const [addressValue, setAddressValue] = useState(null);
  const [governerate, setGovernerate] = useState(null);
  const [govError, setGovError] = useState(false);
  const [city, setCity] = useState(null);
  const [cityError, setCityError] = useState(false);
  const [error, setError] = useState(false);

  const handleCloseModal = () => {
    props.setOpen(false);
    emptyFields();
    setAddressCustomer(false);
  };

  const customerInitialValues = {
    fname: "",
    lname: "",
    email: "",
    phone: "",
  };
  const customerValidate = (values) => {
    if (props.decide === "create") {
      let errors = {};

      if (!values.fname) {
        errors.fname = "First name is required";
      }
      if (!values.lname) {
        errors.lname = "Last name is required";
      }

      if (values.email) {
        if (!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/i.test(values.email)) {
          errors.email = "Invalid Email format";
        }
      }
      if (values.phone) {
        if (!/(\d{11})/i.test(values.phone)) {
          errors.phone = "Invalid phone number format";
        }
      }
      return errors;
    } else {
      let errors = {};

      if (values.email) {
        if (!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/i.test(values.email)) {
          errors.email = "Invalid Email format";
        }
      }
      if (values.phone) {
        if (!/(\d{11})$/i.test(values.phone)) {
          errors.phone = "Invalid phone number format";
        }
      }
      return errors;
    }
  };
  const emptyFields = () => {
    customerFormik.values.fname = "";
    customerFormik.values.lname = "";
    setAddressValue(null);
    customerFormik.values.phone = "";
    customerFormik.values.email = "";
  };

  const onSubmit = (values) => {
    if (props.decide === "create") {
      let customer = {
        fname: values.fname,
        lname: values.lname,
        address: addressValue.id,
      };

      if (values.email !== "") {
        customer.email = values.email;
      } else {
        customer.email = null;
      }
      if (values.phone !== "") {
        customer.phone = values.phone;
      } else {
        customer.phone = null;
      }
      axios
        .post(
          "http://localhost:1234/api/v1/customers/create/",
          customer,
          config
        )
        .then((res) => {
          props.setPutRequest(customer);

          handleCloseModal();
          swal("The Customer has been created Successfully!", {
            icon: "success",
          });
          emptyFields();
        })
        .catch((err) => {
          swal("The Customer has been created Wrongly!", {
            icon: "error",
          });
          return err;
        });
    } else if (props.decide === "edit") {
      let customer = {};
      if (values.fname !== "") {
        customer.fname = values.fname;
      }
      if (values.lname !== "") {
        customer.lname = values.lname;
      }
      if (addressValue !== null) {
        customer.address = addressValue.id;
      }
      if (values.email !== "") {
        customer.email = values.email;
      }
      if (values.phone !== "") {
        customer.phone = values.phone;
      }

      axios
        .put(
          `http://localhost:1234/api/v1/customers/${props.id}`,
          customer,
          config
        )
        .then((res) => {
          if (res.data.success === true) {
            props.setPutRequest(values);
            handleCloseModal();
            swal("The Customer has been edited Successfully!", {
              icon: "success",
            });
            emptyFields();
          }
        })
        .catch((err) => {
          swal("The Customer has been edited wrongly!", {
            icon: "error",
          });
          return err;
        });
    }
  };
  const customerFormik = useFormik({
    initialValues: customerInitialValues,
    onSubmit,
    validate: customerValidate,
  });

  const addressInitialValues = {
    town: "",
    street: "",
  };
  const addressEmptyFields = () => {
    addressFormik.values.town = "";
    addressFormik.values.street = "";
    setGovernerate(null);
    setCity(null);
  };
  const addressValidate = (values) => {
    let errors = {};
    if (!values.town) {
      errors.town = "Neighborhood is requierd";
    }
    return errors;
  };
  const addressSubmit = (values) => {
    let address = {};
    address.governorate = governerate;
    address.city = city;
    address.town = values.town;
    if (values.street !== "") {
      address.street = values.street;
    }
    axios
      .post("http://localhost:1234/api/v1/addresses/create/", address, config)
      .then((res) => {
        if (res.data.success === true) {
          props.setAddressRequest(!props.addressRequest);

          setAddressCustomer(false);
        }
      })
      .catch((err) => err);
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
          <PopUp openModal={props.open} handleCloseModal={handleCloseModal}>
            {addressCustomer === false ? (
              <>
                <Typography
                  id="transition-modal-title"
                  variant="h6"
                  component="h2"
                >
                  Create a New Customer
                </Typography>
                <div>
                  <form onSubmit={customerFormik.handleSubmit}>
                    <TextField
                      type="text"
                      id="fname"
                      name="fname"
                      variant="standard"
                      {...customerFormik.getFieldProps("fname")}
                      label="First Name"
                      style={{ width: "100%" }}
                      error={
                        customerFormik.touched.fname &&
                        customerFormik.errors.fname
                          ? true
                          : false
                      }
                      helperText={
                        customerFormik.touched.fname &&
                        customerFormik.errors.fname &&
                        customerFormik.errors.fname
                      }
                    />
                    <TextField
                      type="text"
                      name="lname"
                      id="lname"
                      variant="standard"
                      {...customerFormik.getFieldProps("lname")}
                      label="Last Name"
                      style={{ width: "100%" }}
                      error={
                        customerFormik.touched.lname &&
                        customerFormik.errors.lname
                          ? true
                          : false
                      }
                      helperText={
                        customerFormik.touched.lname &&
                        customerFormik.errors.lname &&
                        customerFormik.errors.lname
                      }
                    />
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "10px",
                      }}
                    >
                      <Autocomplete
                        style={{
                          width: "68%",
                          flex: 1,
                        }}
                        options={props.address.map((address) => ({
                          id: address.id,
                          label: `${address.governorate} - ${address.city} - ${
                            address.town
                          } ${
                            address.street !== null ? "- " + address.street : ""
                          }`,
                        }))}
                        value={addressValue}
                        onChange={(e, value) => {
                          setAddressValue(value);
                        }}
                        sx={{ width: "100%" }}
                        isOptionEqualToValue={(option, value) =>
                          option.id === value.id
                        }
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
                            helperText={error && "Address is Required"}
                            {...params}
                            label="Address"
                          />
                        )}
                      />
                      <button
                        type="button"
                        style={{
                          height: "55px",
                        }}
                        className="get"
                        onClick={() => {
                          addressEmptyFields();
                          setAddressCustomer(true);
                        }}
                      >
                        Add a New Address
                      </button>
                    </div>

                    <TextField
                      type="Email"
                      name="email"
                      id="email"
                      variant="standard"
                      {...customerFormik.getFieldProps("email")}
                      label="Email Address"
                      error={
                        customerFormik.touched.email &&
                        customerFormik.errors.email
                          ? true
                          : false
                      }
                      helperText={
                        customerFormik.touched.email &&
                        customerFormik.errors.email &&
                        customerFormik.errors.email
                      }
                      style={{ width: "100%" }}
                    />
                    <TextField
                      type="text"
                      name="phone"
                      id="phone"
                      variant="standard"
                      {...customerFormik.getFieldProps("phone")}
                      label="Phone Number"
                      error={
                        customerFormik.touched.phone &&
                        customerFormik.errors.phone
                          ? true
                          : false
                      }
                      helperText={
                        customerFormik.touched.phone &&
                        customerFormik.errors.phone &&
                        customerFormik.errors.phone
                      }
                      style={{ width: "100%" }}
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
            ) : (
              <>
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
                        governerate !== null
                          ? Object.keys(egypt[governerate])
                          : []
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
                      <button
                        style={{
                          display: "block",
                        }}
                        className="get"
                        type="button"
                        onClick={() => {
                          setAddressCustomer(false);
                        }}
                      >
                        Return to Customer
                      </button>
                    </div>
                  </form>
                </div>
              </>
            )}
          </PopUp>
        </>
      ) : (
        <>
          {addressCustomer === false ? (
            <>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                Edit the Customer
              </Typography>
              <div>
                <form onSubmit={customerFormik.handleSubmit}>
                  <TextField
                    type="text"
                    id="fname"
                    name="fname"
                    variant="standard"
                    {...customerFormik.getFieldProps("fname")}
                    label="First Name"
                    style={{ width: "100%" }}
                    error={
                      customerFormik.touched.fname &&
                      customerFormik.errors.fname
                        ? true
                        : false
                    }
                    helperText={
                      customerFormik.touched.fname &&
                      customerFormik.errors.fname &&
                      customerFormik.errors.fname
                    }
                  />
                  <TextField
                    type="text"
                    name="lname"
                    id="lname"
                    variant="standard"
                    {...customerFormik.getFieldProps("lname")}
                    label="Last Name"
                    style={{ width: "100%" }}
                    error={
                      customerFormik.touched.lname &&
                      customerFormik.errors.lname
                        ? true
                        : false
                    }
                    helperText={
                      customerFormik.touched.lname &&
                      customerFormik.errors.lname &&
                      customerFormik.errors.lname
                    }
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "10px",
                    }}
                  >
                    <Autocomplete
                      style={{
                        width: "68%",
                      }}
                      options={props.address.map((address) => ({
                        id: address.id,
                        label: `${address.governorate} - ${address.city} - ${
                          address.town
                        } ${
                          address.street !== null ? "- " + address.street : ""
                        }`,
                      }))}
                      value={addressValue}
                      onChange={(e, value) => {
                        setAddressValue(value);
                      }}
                      sx={{ width: "100%" }}
                      isOptionEqualToValue={(option, value) =>
                        option.id === value.id
                      }
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
                          helperText={error && "Address is Required"}
                          {...params}
                          label="Address"
                        />
                      )}
                    />
                    <button
                      type="button"
                      style={{
                        height: "55px",
                      }}
                      className="get"
                      onClick={() => {
                        addressEmptyFields();
                        setAddressCustomer(true);
                      }}
                    >
                      Add a New Address
                    </button>
                  </div>

                  <TextField
                    type="Email"
                    name="email"
                    id="email"
                    variant="standard"
                    {...customerFormik.getFieldProps("email")}
                    label="Email Address"
                    error={
                      customerFormik.touched.email &&
                      customerFormik.errors.email
                        ? true
                        : false
                    }
                    helperText={
                      customerFormik.touched.email &&
                      customerFormik.errors.email &&
                      customerFormik.errors.email
                    }
                    style={{ width: "100%" }}
                  />
                  <TextField
                    type="text"
                    name="phone"
                    id="phone"
                    variant="standard"
                    {...customerFormik.getFieldProps("phone")}
                    label="Phone Number"
                    error={
                      customerFormik.touched.phone &&
                      customerFormik.errors.phone
                        ? true
                        : false
                    }
                    helperText={
                      customerFormik.touched.phone &&
                      customerFormik.errors.phone &&
                      customerFormik.errors.phone
                    }
                    style={{ width: "100%" }}
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
          ) : (
            <>
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
                      governerate !== null
                        ? Object.keys(egypt[governerate])
                        : []
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
                    <button
                      style={{
                        display: "block",
                      }}
                      className="get"
                      type="button"
                      onClick={() => {
                        setAddressCustomer(false);
                      }}
                    >
                      Return to Customer
                    </button>
                  </div>
                </form>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default CustomerCom;
