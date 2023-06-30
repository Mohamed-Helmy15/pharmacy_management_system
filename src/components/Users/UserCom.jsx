import React, { useState } from "react";
import { configMultiPart } from "../../App";
import PopUp from "../../materials/PopUp";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useFormik } from "formik";
import axios from "axios";
import swal from "sweetalert";

const UserCom = (props) => {
  // ******************create******************
  const [image, setImage] = useState(null);
  const [roleValue, setRoleValue] = useState(null);
  const [pharmacyValue, setPharmacyValue] = useState(null);
  const [error, setError] = useState(false);
  const handleClose = () => {
    props.setOpen(false);
    emptyFields();
  };

  const userInitialValues = {
    fname: "",
    lname: "",
    username: "",
    password: "",
    email: "",
    phone: "",
  };
  const userValidate = (values) => {
    if (props.decide === "create") {
      let errors = {};

      if (!values.fname) {
        errors.fname = "First name is required";
      }
      if (!values.lname) {
        errors.lname = "Last name is required";
      }
      if (!values.username) {
        errors.username = "User Name is required";
      }
      if (!values.password) {
        errors.password = "Password is required";
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
    userFormik.values.fname = "";
    userFormik.values.lname = "";
    userFormik.values.phone = "";
    userFormik.values.username = "";
    userFormik.values.email = "";
    setRoleValue(null);
    setPharmacyValue(null);
    setError(false);
    userFormik.values.pharmacy = "";
    userFormik.values.password = "";
    setImage(null);
  };

  const onSubmit = (values) => {
    if (props.decide === "create") {
      const formData = new FormData();
      formData.append("fname", values.fname);
      formData.append("lname", values.lname);
      formData.append("password", values.password);
      formData.append("username", values.username);
      formData.append("role", roleValue.id);
      if (values.email !== "") {
        formData.append("email", values.email);
      }
      if (values.phone !== "") {
        formData.append("phone", values.phone);
      }
      if (pharmacyValue) {
        formData.append("pharmacy", pharmacyValue.id);
      }
      if (image !== null) {
        formData.append("img", image, image.name);
      }
      axios
        .post(
          "http://localhost:1234/api/v1/users/create/",
          formData,
          configMultiPart
        )
        .then((res) => {
          if (res.data.success === true) {
            props.setPostRequest(formData);

            handleClose();
            swal("The User has been created Successfully!", {
              icon: "success",
            });
            emptyFields();
          }
        })
        .catch((err) => {
          swal("The User has been created wrongly!", {
            icon: "error",
          });
          return err;
        });
    } else {
      const formData = new FormData();
      if (values.fname !== "") {
        formData.append("fname", values.fname);
      }
      if (values.lname !== "") {
        formData.append("lname", values.lname);
      }
      if (values.password !== "") {
        formData.append("password", values.password);
      }
      if (values.email !== "") {
        formData.append("email", values.email);
      }
      if (roleValue !== null) {
        formData.append("role", roleValue.id);
      }

      if (values.phone !== "") {
        formData.append("phone", values.phone);
      }
      if (values.username !== "") {
        formData.append("username", values.username);
      }
      if (pharmacyValue !== null) {
        formData.append("pharmacy", pharmacyValue.id);
      }
      if (image !== null) {
        formData.append("img", image, image.name);
      }
      axios
        .put(
          `http://localhost:1234/api/v1/users/${props.id}`,
          formData,
          configMultiPart
        )
        .then((res) => {
          if (res.data.success === true) {
            props.setPutRequest(values);
            handleClose();
            swal("The User has been edited Successfully!", {
              icon: "success",
            });
            emptyFields();
          }
        })
        .catch((err) => {
          swal("The User has been edited wrongly!", {
            icon: "error",
          });
          return err;
        });
    }
  };
  const userFormik = useFormik({
    initialValues: userInitialValues,
    onSubmit,
    validate: userValidate,
  });

  return (
    <>
      {props.decide === "create" ? (
        <>
          <PopUp openModal={props.open} handleCloseModal={handleClose}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Create a New User
            </Typography>
            <div className="pop">
              <form onSubmit={userFormik.handleSubmit}>
                <TextField
                  type="text"
                  id="fname"
                  name="fname"
                  variant="standard"
                  {...userFormik.getFieldProps("fname")}
                  label="First Name"
                  style={{ width: "100%" }}
                  error={
                    userFormik.touched.fname && userFormik.errors.fname
                      ? true
                      : false
                  }
                  helperText={
                    userFormik.touched.fname &&
                    userFormik.errors.fname &&
                    userFormik.errors.fname
                  }
                />
                <TextField
                  type="text"
                  name="lname"
                  id="lname"
                  variant="standard"
                  {...userFormik.getFieldProps("lname")}
                  label="Last Name"
                  style={{ width: "100%" }}
                  error={
                    userFormik.touched.lname && userFormik.errors.lname
                      ? true
                      : false
                  }
                  helperText={
                    userFormik.touched.lname &&
                    userFormik.errors.lname &&
                    userFormik.errors.lname
                  }
                />
                <TextField
                  type="text"
                  name="username"
                  id="username"
                  variant="standard"
                  {...userFormik.getFieldProps("username")}
                  label="User Name"
                  style={{ width: "100%" }}
                  error={
                    userFormik.touched.username && userFormik.errors.username
                      ? true
                      : false
                  }
                  helperText={
                    userFormik.touched.username &&
                    userFormik.errors.username &&
                    userFormik.errors.username
                  }
                />
                <TextField
                  type="password"
                  name="password"
                  id="password"
                  variant="standard"
                  {...userFormik.getFieldProps("password")}
                  label="Password"
                  style={{ width: "100%" }}
                  error={
                    userFormik.touched.password && userFormik.errors.password
                      ? true
                      : false
                  }
                  helperText={
                    userFormik.touched.password &&
                    userFormik.errors.password &&
                    userFormik.errors.password
                  }
                />
                <TextField
                  type="Email"
                  name="email"
                  id="email"
                  variant="standard"
                  {...userFormik.getFieldProps("email")}
                  label="Email Address"
                  error={
                    userFormik.touched.email && userFormik.errors.email
                      ? true
                      : false
                  }
                  helperText={
                    userFormik.touched.email &&
                    userFormik.errors.email &&
                    userFormik.errors.email
                  }
                  style={{ width: "100%" }}
                />
                <TextField
                  type="text"
                  name="phone"
                  id="phone"
                  variant="standard"
                  {...userFormik.getFieldProps("phone")}
                  label="Phone Number"
                  error={
                    userFormik.touched.phone && userFormik.errors.phone
                      ? true
                      : false
                  }
                  helperText={
                    userFormik.touched.phone &&
                    userFormik.errors.phone &&
                    userFormik.errors.phone
                  }
                  style={{ width: "100%" }}
                />
                <Autocomplete
                  options={props.roles.map((role) => ({
                    id: role.id,
                    label: role.name,
                  }))}
                  value={roleValue}
                  onChange={(e, value) => {
                    setRoleValue(value);
                  }}
                  sx={{ width: "100%" }}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  renderInput={(params) => (
                    <TextField
                      onBlur={() => {
                        if (roleValue === null) {
                          setError(true);
                        } else {
                          setError(false);
                        }
                      }}
                      error={error && true}
                      helperText={error && "Role is Required"}
                      {...params}
                      label="Role"
                    />
                  )}
                />
                <Autocomplete
                  options={props.pharmacies.map((pharmacy) => ({
                    id: pharmacy.id,
                    label: pharmacy.name,
                  }))}
                  renderInput={(params) => (
                    <TextField {...params} label="Pharmacy" />
                  )}
                  value={pharmacyValue}
                  onChange={(e, value) => {
                    setPharmacyValue(value);
                  }}
                  sx={{ width: "100%" }}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                />
                <TextField
                  type="file"
                  name="img"
                  id="img"
                  variant="standard"
                  label="image"
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                  }}
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
          </PopUp>
        </>
      ) : (
        <form onSubmit={userFormik.handleSubmit}>
          <TextField
            type="text"
            id="fname"
            name="fname"
            variant="standard"
            {...userFormik.getFieldProps("fname")}
            label="First Name"
            style={{ width: "100%" }}
          />
          <TextField
            type="text"
            name="lname"
            id="lname"
            variant="standard"
            {...userFormik.getFieldProps("lname")}
            label="Last Name"
            style={{ width: "100%" }}
          />
          <TextField
            type="text"
            name="username"
            id="username"
            variant="standard"
            {...userFormik.getFieldProps("username")}
            label="User Name"
            style={{ width: "100%" }}
          />
          <TextField
            type="password"
            name="password"
            id="password"
            variant="standard"
            {...userFormik.getFieldProps("password")}
            label="Password"
            style={{ width: "100%" }}
          />
          <TextField
            type="Email"
            name="email"
            id="email"
            variant="standard"
            {...userFormik.getFieldProps("email")}
            label="Email Address"
            error={
              userFormik.touched.email && userFormik.errors.email ? true : false
            }
            helperText={
              userFormik.touched.email &&
              userFormik.errors.email &&
              userFormik.errors.email
            }
            style={{ width: "100%" }}
          />
          <TextField
            type="text"
            name="phone"
            id="phone"
            variant="standard"
            {...userFormik.getFieldProps("phone")}
            label="Phone Number"
            error={
              userFormik.touched.phone && userFormik.errors.phone ? true : false
            }
            helperText={
              userFormik.touched.phone &&
              userFormik.errors.phone &&
              userFormik.errors.phone
            }
            style={{ width: "100%" }}
          />
          <Autocomplete
            options={props.roles.map((role) => ({
              id: role.id,
              label: role.name,
            }))}
            value={roleValue}
            onChange={(e, value) => {
              setRoleValue(value);
            }}
            sx={{ width: "100%" }}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderInput={(params) => <TextField {...params} label="Role" />}
          />
          <Autocomplete
            options={props.pharmacies.map((pharmacy) => ({
              id: pharmacy.id,
              label: pharmacy.name,
            }))}
            renderInput={(params) => <TextField {...params} label="Pharmacy" />}
            value={pharmacyValue}
            onChange={(e, value) => {
              setPharmacyValue(value);
            }}
            sx={{ width: "100%" }}
            isOptionEqualToValue={(option, value) => option.id === value.id}
          />
          <TextField
            type="file"
            name="img"
            id="img"
            variant="standard"
            label="image"
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
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
      )}
    </>
  );
};

export default UserCom;
