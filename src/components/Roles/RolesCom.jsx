import React from "react";
import PopUp from "./../../materials/PopUp";
import { Typography } from "@mui/material";
import { TextField } from "@mui/material";
import { config } from "../../App";
import { useFormik } from "formik";
import axios from "axios";
import swal from "sweetalert";

const RolesCom = (props) => {
  const handleClose = () => {
    props.setOpen(false);
    emptyFields();
  };

  const emptyFields = () => {
    rolesFormik.values.name = "";
    rolesFormik.values.priority = "";
  };

  const roleInitialValues = {
    name: "",
    priority: "",
  };

  const roleValidate = (values) => {
    let errors = {};
    if (values.name === "") errors.name = "name is required";
    if (values.priority === "") errors.priority = "priority is required";
    return errors;
  };

  const onSubmit = (values) => {
    if (props.decide === "create") {
      axios
        .post("http://localhost:1234/api/v1/roles/create", values, config)
        .then((res) => {
          props.setPostRequest(res);
          handleClose();
          swal("The Role has been created Successfully!", {
            icon: "success",
          });
        })
        .catch((err) => {
          swal("The Role creation has been Failed!", {
            icon: "error",
          });
          return err;
        });
    } else {
      axios
        .put(`http://localhost:1234/api/v1/roles/${props.id}`, values, config)
        .then((res) => {
          props.setPutRequest(res);
          handleClose();
          swal("The Role has been edited Successfully!", {
            icon: "success",
          });
        })
        .catch((err) => {
          swal("The Role Editing has been Failed!", {
            icon: "error",
          });
          return err;
        });
    }
  };

  const rolesFormik = useFormik({
    initialValues: roleInitialValues,
    onSubmit,
    validate: roleValidate,
  });

  return (
    <PopUp openModal={props.open} handleCloseModal={handleClose}>
      <Typography id="transition-modal-title" variant="h6" component="h2">
        Create a New Role
      </Typography>
      <div className="pop">
        <form onSubmit={rolesFormik.handleSubmit}>
          <TextField
            type="text"
            id="name"
            name="name"
            variant="standard"
            {...rolesFormik.getFieldProps("name")}
            label="Supplier Name"
            style={{ width: "100%" }}
            error={
              rolesFormik.touched.name && rolesFormik.errors.name ? true : false
            }
            helperText={
              rolesFormik.touched.name &&
              rolesFormik.errors.name &&
              rolesFormik.errors.name
            }
          />
          <TextField
            type="number"
            inputProps={{ min: 0 }}
            id="priority"
            name="priority"
            variant="standard"
            {...rolesFormik.getFieldProps("priority")}
            label="Supplier priority"
            style={{ width: "100%" }}
            error={
              rolesFormik.touched.priority && rolesFormik.errors.priority
                ? true
                : false
            }
            helperText={
              rolesFormik.touched.priority &&
              rolesFormik.errors.priority &&
              rolesFormik.errors.priority
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

export default RolesCom;
