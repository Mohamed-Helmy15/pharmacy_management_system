import React, { useState } from "react";
import styles from "../../logout/LogOut.module.css";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewPassword = (props) => {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  const token = window.location.href.split("?")[1].split("=")[1];

  const initialValues = {
    password: "",
    repassword: "",
  };

  const onSubmit = (values) => {
    axios
      .put("http://localhost:1234/api/v1/users/update-password", {
        password: values.password,
        token: token,
      })
      .then((res) => {
        setSuccess(res.data.success);
      })
      .catch((err) => err);
  };

  const validate = (values) => {
    let errors = {};

    if (!values.password) {
      errors.password = "password is required";
    }
    if (!values.repassword) {
      errors.repassword = "please write the password again";
    }
    if (values.password !== values.repassword) {
      errors.repassword = "The passwords don't match";
    }

    return errors;
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });
  return (
    <div className={styles.page}>
      <div className={styles.form}>
        {props.valid ? (
          <>
            <h3 style={{ textAlign: "center" }}>Change your Password</h3>
            {success && (
              <h3 style={{ textAlign: "center", color: "#0f467e" }}>
                password has been set successfully
              </h3>
            )}
            <form onSubmit={formik.handleSubmit}>
              <TextField
                type="password"
                name="password"
                id="password"
                variant="standard"
                label="Enter the new Password"
                style={{
                  width: "100%",
                }}
                {...formik.getFieldProps("password")}
                error={
                  formik.touched.password && formik.errors.password
                    ? true
                    : false
                }
                helperText={
                  formik.touched.password &&
                  formik.errors.password &&
                  formik.errors.password
                }
              />
              <TextField
                type="password"
                name="repassword"
                id="repassword"
                variant="standard"
                label="Enter the new Password again"
                style={{
                  width: "100%",
                  marginTop: "30px",
                }}
                {...formik.getFieldProps("repassword")}
                error={
                  formik.touched.repassword && formik.errors.repassword
                    ? true
                    : false
                }
                helperText={
                  formik.touched.repassword &&
                  formik.errors.repassword &&
                  formik.errors.repassword
                }
              />
              <button
                style={{
                  display: "block",
                  margin: "auto",
                  marginTop: "15px",
                }}
                className="get"
                type="submit"
              >
                Submit
              </button>
            </form>
          </>
        ) : (
          <div>
            <h3>Your link expiration is end please, try again</h3>
            <button
              className="get"
              onClick={() => {
                navigate("/forgot");
              }}
            >
              try again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewPassword;
