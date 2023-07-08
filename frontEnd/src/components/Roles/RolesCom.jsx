import React, { useState, useEffect } from "react";
import PopUp from "./../../materials/PopUp";
import { Typography } from "@mui/material";
import { TextField } from "@mui/material";
import { config } from "../../App";
import { useFormik } from "formik";
import axios from "axios";
import swal from "sweetalert";
import { Autocomplete } from "@mui/material/";

const RolesCom = (props) => {
  const [authority, setAuthority] = useState([]);
  const [authorityValues, setAuthorityValues] = useState([]);

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
    authorities: [],
  };

  const roleValidate = (values) => {
    let errors = {};
    if (values.name === "") errors.name = "name is required";
    if (values.priority === "") errors.priority = "priority is required";
    if (values.authorities.length === 0)
      errors.authorities = "authorities is required";
    if (authorityValues.length === 0)
      errors.authority = "authority is required";
    return errors;
  };

  const onSubmit = (values) => {
    let reqValues = {
      name: values.name,
      priority: values.priority,
      authorities: authorityValues,
    };
    if (props.decide === "create") {
      axios
        .post("http://localhost:1234/api/v1/roles/create", reqValues, config)
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
        .put(
          `http://localhost:1234/api/v1/roles/${props.id}`,
          reqValues,
          config
        )
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

  useEffect(() => {
    axios
      .get(
        `http://localhost:1234/api/v1/authorities?page=0&&size=100&&sort=name`,
        config
      )
      .then((res) => {
        setAuthority(res.data.payload);
      })
      .catch((err) => err);
  }, []);

  return (
    <PopUp openModal={props.open} handleCloseModal={handleClose}>
      <Typography id="transition-modal-title" variant="h6" component="h2">
        Create a New Role
      </Typography>
      <div className="pop">
        <form onSubmit={rolesFormik.handleSubmit}>
          <Autocomplete
            sx={{ width: "99%" }}
            multiple
            id="tags-standard"
            options={authority}
            getOptionLabel={(option) => option.name}
            defaultValue={[]}
            onChange={(e, newValue) => {
              rolesFormik.values.authorities.push(newValue);

              setAuthorityValues(newValue.map((authority) => authority.id));
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Authorities"
                placeholder="Authorities"
                {...rolesFormik.getFieldProps("authorities")}
                error={
                  rolesFormik.touched.authorities &&
                  rolesFormik.errors.authorities
                    ? true
                    : false
                }
                helperText={
                  rolesFormik.touched.authorities &&
                  rolesFormik.errors.authorities &&
                  rolesFormik.errors.authorities
                }
              />
            )}
          />
          <TextField
            type="text"
            id="name"
            name="name"
            variant="standard"
            {...rolesFormik.getFieldProps("name")}
            label="Role Name"
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
            label="Role priority"
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
