import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import styles from "./Categories.module.css";
import { Input } from "@mui/material";
import axios from "axios";
import { config } from "../../App";
import PopUp from "../../materials/PopUp";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import swal from "sweetalert";

const CatCom = (props) => {
  // *********************create*********************
  const [inputAdd, setInputAdd] = useState("");
  const handleClose = () => {
    if (props.decide === "create") {
      props.setOpen(false);
    }
    setInputAdd("");
  };

  const handleAddInput = (e) => {
    setInputAdd(e.target.value);
  };

  const handleToggleNotAdd = () => {
    props.setpostRequest("");
    setInputAdd("");
  };

  const postRequestData = () => {
    swal("The Category has been created wrongly!", {
      icon: "error",
    });
    // axios
    //   .post(
    //     "http://localhost:1234/api/v1/categories/create",
    //     {
    //       name: inputAdd,
    //     },
    //     config
    //   )
    //   .then((res) => {
    //     props.setpostRequest(res.status);
    //     handleClose();
    //     swal("The Category has been created Successfully!", {
    //       icon: "success",
    //     });
    //   })
    //   .catch((err) => {
    //     swal("The Category has been created wrongly!", {
    //       icon: "error",
    //     });
    //     return err;
    //   });
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
    swal("The Category has been edited wrongly!", {
      icon: "error",
    });
    // axios
    //   .put(
    //     `http://localhost:1234/api/v1/categories/${props.id}`,
    //     values,
    //     config
    //   )
    //   .then((res) => {
    //     props.setPutRequest(res);
    //     emptyCategory();
    //     handleClose();
    //     swal("The Category has been edited Successfully!", {
    //       icon: "success",
    //     });
    //   })
    //   .catch((err) => {
    //     swal("The Category has been edited wrongly!", {
    //       icon: "error",
    //     });
    //     return err;
    //   });
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
