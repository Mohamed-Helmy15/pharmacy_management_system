import React, { useState } from "react";
import styles from "../logout/LogOut.module.css";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import axios from "axios";

const Forgot = () => {
  const [sending, setSending] = useState(null);

  const initialValues = {
    email: "",
  };
  const onSubmit = (values) => {
    axios
      .post("http://localhost:1234/api/v1/users/reset-password", checkEmail)
      .then((res) => {
        setSending(res.data.success);
      })
      .catch((err) => setSending(err.response.data.success));
  };

  const validate = (values) => {
    let errors = {};
    if (!values.email) {
      errors.email = "email is required";
    } else if (!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/i.test(values.email)) {
      errors.email = "Invalid Email format";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });

  const checkEmail = {
    email: formik.values.email,
    link: "http://localhost:3000/reset",
  };

  return (
    <div className={styles.page}>
      <div className={styles.form}>
        <h3 style={{ textAlign: "center" }}>Enter your Email</h3>
        {sending === true ? (
          <p
            style={{
              color: "#0f467e",
              textAlign: "center",
              fontSize: "18px",
            }}
          >
            Please, check the email <b>{formik.values.email}</b> and Click on
            the link to reset the password
          </p>
        ) : sending === false ? (
          <p
            style={{
              color: "red",
              textAlign: "center",
              fontSize: "18px",
            }}
          >
            The <b>{formik.values.email}</b> wasn't found.
          </p>
        ) : null}
        <form onSubmit={formik.handleSubmit}>
          <TextField
            type="email"
            name="email"
            id="email"
            variant="standard"
            label="Enter the Email"
            style={{
              width: "100%",
            }}
            {...formik.getFieldProps("email")}
            error={formik.touched.email && formik.errors.email ? true : false}
            helperText={
              formik.touched.email && formik.errors.email && formik.errors.email
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
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Forgot;
