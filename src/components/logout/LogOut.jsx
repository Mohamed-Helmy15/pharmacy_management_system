import React, { useState, useEffect } from "react";
import styles from "./LogOut.module.css";
import { useFormik } from "formik";
import { useNavigate, Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import HttpsIcon from "@mui/icons-material/Https";
import axios from "axios";
import { useSignIn } from "react-auth-kit";
import { useIsAuthenticated } from "react-auth-kit";
import Loading from "./../Reset_Password/Loading/Loading";

const LogOut = () => {
  const [success, setSuccess] = useState(null);
  const [loading, setloading] = useState(false);

  const isAuthenticated = useIsAuthenticated();

  const navigate = useNavigate();

  const signIn = useSignIn();

  const initialValues = {
    username: "",
    password: "",
  };

  const validate = (values) => {
    let errors = {};

    if (!values.username) {
      errors.username = "username is required";
    }
    if (!values.password) {
      errors.password = "password is required";
    }

    return errors;
  };

  const onSubmit = (values) => {
    window.localStorage.setItem("token", Math.random() * 100000);
    setTimeout(() => {
      setloading(true);
    }, 2000);
    navigate("/dashboard");
    window.location.reload();
    // axios
    //   .post("http://localhost:1234/api/v1/auth/login", values)
    //   .then((response) => {
    //     window.localStorage.setItem("user", values.username);
    //     window.localStorage.setItem(
    //       "authorities",
    //       response.data.payload.authorities
    //     );
    //     const sign = signIn({
    //       authState: { username: values.username },
    //       token: response.data.payload.jwt.token,
    //       expiresIn: 3600,
    //       tokenType: response.data.payload.jwt.tokenType,
    //     });
    //     if (sign) {
    //       setSuccess(true);
    //       setloading(true);
    //     }
    //   })
    //   .catch((err) => {
    //     setloading(false);
    //     setSuccess(false);
    //     navigate("/");
    //   });
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });

  // useEffect(() => {
  //   if (isAuthenticated()) {
  //     navigate("/dashboard");
  //     window.location.reload();
  //   }
  // }, [isAuthenticated, navigate]);

  return loading ? (
    <Loading />
  ) : (
    <div className={styles.page}>
      <div className={styles.form}>
        <h3
          style={{
            margin: "0 0 10px 0",
            textAlign: "center",
            position: "relative",
            top: "5%",
          }}
        >
          Pharmacy Login
        </h3>
        {success === false && (
          <p
            style={{
              color: "red",
              textAlign: "center",
              fontSize: "16px",
            }}
          >
            Username or password is wrong, please try again
          </p>
        )}
        <div>
          <form onSubmit={formik.handleSubmit}>
            <div
              className={styles.inputs}
              style={{
                alignItems: "center",
              }}
            >
              <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                type="text"
                name="username"
                id="username"
                variant="standard"
                {...formik.getFieldProps("username")}
                error={
                  formik.touched.username && formik.errors.username
                    ? true
                    : false
                }
                label="username"
                helperText={
                  formik.touched.username &&
                  formik.errors.username &&
                  formik.errors.username
                }
                style={{
                  flex: 1,
                }}
              />
            </div>
            <div
              className={styles.inputs}
              style={{
                alignItems: "center",
              }}
            >
              <HttpsIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                type="password"
                name="password"
                id="password"
                variant="standard"
                {...formik.getFieldProps("password")}
                error={
                  formik.touched.password && formik.errors.password
                    ? true
                    : false
                }
                label="password"
                helperText={
                  formik.touched.password &&
                  formik.errors.password &&
                  formik.errors.password
                }
                style={{
                  flex: 1,
                }}
              />
            </div>
            <button
              type="submit"
              className="get"
              style={{
                display: "block",
                margin: "auto",
              }}
            >
              Login
            </button>
          </form>
          <div className={styles.reset}>
            <Link className={styles.forgot} to={"/forgot"}>
              Forgot the Password
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogOut;
