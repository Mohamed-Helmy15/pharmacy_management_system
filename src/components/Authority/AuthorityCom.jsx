import React from "react";
import PopUp from "./../../materials/PopUp";
import { Typography } from "@mui/material/";
import { TextField } from "@mui/material/";
import { useFormik } from "formik";
import axios from "axios";
import swal from "sweetalert";
import { config } from "../../App";

const AuthorityCom = (props) => {
  const handleClose = () => {
    props.setOpen(false);
    emptyFields();
  };

  const emptyFields = () => {
    authorityFormik.values.name = "";
  };

  const authorityInitialValues = {
    name: "",
  };
  const authorityValidate = (values) => {
    let errors = {};
    if (values.name === "") {
      errors.name = "required";
    }
    return errors;
  };
  const onSubmit = (values) => {
    if (props.decide === "create") {
      swal("The Authority creation has been Failed!", {
        icon: "error",
      });
      // axios
      //   .post(`http://localhost:1234/api/v1/authorities/create`, values, config)
      //   .then((res) => {
      //     props.setPostRequest(res);
      //     handleClose();
      //     swal("The Authority has been created Successfully!", {
      //       icon: "success",
      //     });
      //   })
      //   .catch((err) => {
      //     swal("The Authority creation has been Failed!", {
      //       icon: "error",
      //     });
      //     return err;
      //   });
    } else {
      swal("The Authority editing has been Failed!", {
        icon: "error",
      });
      // axios
      //   .put(
      //     `http://localhost:1234/api/v1/authorities/${props.id}`,
      //     values,
      //     config
      //   )
      //   .then((res) => {
      //     handleClose();
      //     props.setPutRequest(res);
      //     swal("The Authority has been edited Successfully!", {
      //       icon: "success",
      //     });
      //   })
      //   .catch((err) => {
      //     swal("The Authority editing has been Failed!", {
      //       icon: "error",
      //     });
      //     return err;
      //   });
    }
  };

  const authorityFormik = useFormik({
    initialValues: authorityInitialValues,
    validate: authorityValidate,
    onSubmit,
  });
  return (
    <PopUp openModal={props.open} handleCloseModal={handleClose}>
      <Typography id="transition-modal-title" variant="h6" component="h2">
        Create a New Authority
      </Typography>
      <div className="pop">
        <form onSubmit={authorityFormik.handleSubmit}>
          <TextField
            type="text"
            id="name"
            name="name"
            variant="standard"
            {...authorityFormik.getFieldProps("name")}
            label="Authority Name"
            style={{ width: "100%" }}
            error={
              authorityFormik.touched.name && authorityFormik.errors.name
                ? true
                : false
            }
            helperText={
              authorityFormik.touched.name &&
              authorityFormik.errors.name &&
              authorityFormik.errors.name
            }
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
  );
};

export default AuthorityCom;
