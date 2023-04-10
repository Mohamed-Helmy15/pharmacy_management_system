import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import styles from "./Categories.module.css";
import { Input } from "@mui/material";
import axios from "axios";
import { config } from "../../App";
import PopUp from "../../materials/PopUp";
import Notification from "../../materials/Notification";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
/* 
******** props ********
 decide - setpostRequest - postRequest - open - setOpen -setSideRequest(only in sidebar)
 id(in edit) - setPutRequest(only in edit) - handleCloseModal
 */

const CatCom = (props) => {
  // *********************create(page - sidebar)*********************
  const [inputAdd, setInputAdd] = useState("");
  const [errorRequest, setErrorRequest] = useState("");
  const [addNotification, setNotification] = useState(null);
  const [stateNotification, setStateNotification] = useState(false);
  const handleClose = () => {
    props.setOpen(false);
    setErrorRequest("");
    setInputAdd("");
  };

  const handleNotClose = (event, reason) => {
    setNotification(null);
  };

  const handleAddInput = (e) => {
    setInputAdd(e.target.value);
  };

  const handleToggleNotAdd = () => {
    setNotification(true);
    props.setpostRequest("");
    setInputAdd("");
  };

  const postRequestData = () => {
    axios
      .post(
        "http://localhost:1234/api/v1/categories/create",
        {
          name: inputAdd,
        },
        config
      )
      .then((res) => {
        props.setpostRequest(res.status);
        setStateNotification(true);
        if (props.setSideRequest) {
          props.setSideRequest(true);
        }

        setErrorRequest("");
      })
      .catch((err) => {
        setNotification(false);
        setErrorRequest(err.response.data.message.name);
      });
  };
  // ****************************************************
  // *****************edit*******************************
  const categoryInitialValue = {
    name: "",
  };
  const emptyCategory = () => {
    categoryFormik.values.name = "";
  };
  const categoryValidate = (values) => {
    let errors = {};

    if (!values.name) {
      errors.name = "This field is required";
    }
    return errors;
  };
  const onSubmit = (values) => {
    axios
      .put(
        `http://localhost:1234/api/v1/categories/${props.id}`,
        values,
        config
      )
      .then((res) => {
        if (res.data.success === true) {
          setErrorRequest("");
          props.setPutRequest(values);
          emptyCategory();
          props.handleCloseModal();
        }
      })
      .catch((err) => setErrorRequest(err.response.data.message.name));
  };
  const categoryFormik = useFormik({
    initialValues: categoryInitialValue,
    onSubmit,
    validate: categoryValidate,
  });
  return (
    <>
      {props.decide === "create" ? (
        <>
          <PopUp openModal={props.open} handleCloseModal={handleClose}>
            <h4
              style={{
                color: "red",
                textAlign: "center",
              }}
            >
              {errorRequest}
            </h4>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Create a New Category
            </Typography>
            <div className={styles.add}>
              <Input
                type="text"
                name="category"
                placeholder="Enter the category to be Added"
                onChange={handleAddInput}
                value={inputAdd}
              />

              <button
                className="get"
                onClick={() => {
                  postRequestData();
                  handleToggleNotAdd();
                }}
              >
                Submit
              </button>
            </div>
          </PopUp>
          {stateNotification === true ? (
            <Notification
              auto={6000} // auto hide time in ms
              case="success"
              successfulMessage="the Category has been successfully created"
              notification={addNotification} // add state
              handleNotClose={handleNotClose} // on close function
            />
          ) : (
            <Notification
              auto={6000}
              case="error"
              unsuccessfulMessage="the Category has not been successfully created"
              notification={addNotification}
              handleNotClose={handleNotClose}
            />
          )}
        </>
      ) : (
        <form onSubmit={categoryFormik.handleSubmit}>
          <TextField
            type="text"
            name="name"
            id="name"
            variant="standard"
            {...categoryFormik.getFieldProps("name")}
            label="Category Name"
            error={
              categoryFormik.touched.name && categoryFormik.errors.name
                ? true
                : false
            }
            helperText={
              categoryFormik.touched.name &&
              categoryFormik.errors.name &&
              categoryFormik.errors.name
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
      )}
    </>
  );
};

export default CatCom;
