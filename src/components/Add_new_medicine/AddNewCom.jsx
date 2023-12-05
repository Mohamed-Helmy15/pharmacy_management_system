import React, { useState } from "react";
import { configMultiPart } from "../../App";
import PopUp from "../../materials/PopUp";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import { useFormik } from "formik";
import swal from "sweetalert";

const AddNewCom = (props) => {
  // ******************create******************
  const [image, setImage] = useState(null);
  const [categoryValue, setcategoryValue] = useState(null);
  const [supplierValue, setSupplierValue] = useState(null);
  const [typeValue, settypeValue] = useState(null);
  const [error, setError] = useState(false);
  const [expiration, setExpiration] = useState("");

  const handleClose = () => {
    props.setOpen(false);
    emptyFields();
  };

  const medicineInitialValues = {
    marketName: "",
    scientificName: "",
    price: "",
    supplier: "",
    description: "",
  };

  const medicineValidate = (values) => {
    if (props.decide === "create") {
      let errors = {};

      if (!values.marketName) {
        errors.marketName = "Market name is required";
      }
      if (!values.scientificName) {
        errors.scientificName = "Scientific name is required";
      }
      if (!values.price) {
        errors.price = "Price is required";
      }
      if (!values.description) {
        errors.description = "description is required";
      }
      if (expiration === "") {
        errors.expiration = "expiration date is required";
      }
      if (supplierValue === null) {
        errors.supplier = "supplier is required";
      }
      if (categoryValue === null) {
        errors.category = "Category is required";
      }
      if (typeValue === null) {
        errors.type = "Type is required";
      }
      return errors;
    }
  };

  const emptyFields = () => {
    medicineFormik.values.marketName = "";
    medicineFormik.values.scientificName = "";
    medicineFormik.values.price = "";
    medicineFormik.values.description = "";
    setExpiration("");
    setSupplierValue(null);
    setcategoryValue(null);
    settypeValue(null);
    setImage(null);
    setError(false);
  };

  const onSubmit = (values) => {
    if (props.decide === "create") {
      const formData = new FormData();

      formData.append("marketName", values.marketName);
      formData.append("scientificName", values.scientificName);
      formData.append("supplier", supplierValue.id);
      formData.append("price", values.price);
      formData.append("expiration", expiration);
      formData.append("category", categoryValue.id);
      formData.append("type", typeValue);
      formData.append("description", values.description);
      if (image !== null) {
        formData.append("img", image, image.name);
      }
      swal("The Medicine has not been created Successfully!", {
        icon: "error",
      });
      // axios
      //   .post(
      //     "http://localhost:1234/api/v1/medicines/create/",
      //     formData,
      //     configMultiPart
      //   )
      //   .then((res) => {
      //     if (res.data.success === true) {
      //       props.setPostRequest(formData);
      //       handleClose();
      //       swal("The Medicine has been created Successfully!", {
      //         icon: "success",
      //       });
      //       emptyFields();
      //     }
      //   })
      //   .catch((err) => {
      //     swal("The Medicine has not been created Successfully!", {
      //       icon: "error",
      //     });
      //     return err;
      //   });
    } else {
      const formData = new FormData();
      formData.append("pharmacy", window.localStorage.getItem("thisBranch"));
      if (values.marketName !== "") {
        formData.append("marketName", values.marketName);
      }
      if (values.scientificName !== "") {
        formData.append("scientificName", values.scientificName);
      }
      if (values.supplier !== "") {
        formData.append("supplier", supplierValue.id);
      }
      if (values.description !== "") {
        formData.append("description", values.description);
      }
      if (categoryValue !== null) {
        formData.append("category", categoryValue.id);
      }
      if (values.price !== "") {
        formData.append("price", values.price);
      }
      if (expiration !== "") {
        formData.append("expiration", expiration);
      }
      if (typeValue !== null) {
        formData.append("pharmacy", typeValue);
      }
      if (image !== null) {
        formData.append("img", image, image.name);
      }
      swal("The Medicine has not been edited Successfully!", {
        icon: "error",
      });
      // axios
      //   .put(
      //     `http://localhost:1234/api/v1/medicines/${props.id}`,
      //     formData,
      //     configMultiPart
      //   )
      //   .then((res) => {
      //     if (res.data.success === true) {
      //       props.setPutRequest(values);
      //       handleClose();
      //       emptyFields();
      //       swal("The Medicine has been edited Successfully!", {
      //         icon: "success",
      //       });
      //     }
      //   })
      //   .catch((err) => {
      //     swal("The Medicine has not been edited Successfully!", {
      //       icon: "error",
      //     });
      //     return err;
      //   });
    }
  };
  const medicineFormik = useFormik({
    initialValues: medicineInitialValues,
    onSubmit,
    validate: medicineValidate,
  });

  return (
    <>
      {props.decide === "create" ? (
        <>
          <PopUp openModal={props.open} handleCloseModal={handleClose}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Create a New medicine
            </Typography>
            <div className="pop">
              <form onSubmit={medicineFormik.handleSubmit}>
                <TextField
                  type="text"
                  id="marketName"
                  name="marketName"
                  variant="standard"
                  {...medicineFormik.getFieldProps("marketName")}
                  label="Market Name"
                  style={{ width: "100%" }}
                  error={
                    medicineFormik.touched.marketName &&
                    medicineFormik.errors.marketName
                      ? true
                      : false
                  }
                  helperText={
                    medicineFormik.touched.marketName &&
                    medicineFormik.errors.marketName &&
                    medicineFormik.errors.marketName
                  }
                />
                <TextField
                  type="text"
                  name="scientificName"
                  id="scientificName"
                  variant="standard"
                  {...medicineFormik.getFieldProps("scientificName")}
                  label="Scientific Name"
                  style={{ width: "100%" }}
                  error={
                    medicineFormik.touched.scientificName &&
                    medicineFormik.errors.scientificName
                      ? true
                      : false
                  }
                  helperText={
                    medicineFormik.touched.scientificName &&
                    medicineFormik.errors.scientificName &&
                    medicineFormik.errors.scientificName
                  }
                />
                <TextField
                  type="description"
                  name="description"
                  id="description"
                  variant="standard"
                  {...medicineFormik.getFieldProps("description")}
                  label="Effective Material"
                  style={{ width: "100%" }}
                  error={
                    medicineFormik.touched.description &&
                    medicineFormik.errors.description
                      ? true
                      : false
                  }
                  helperText={
                    medicineFormik.touched.description &&
                    medicineFormik.errors.description &&
                    medicineFormik.errors.description
                  }
                />
                <TextField
                  type="text"
                  name="price"
                  id="price"
                  variant="standard"
                  {...medicineFormik.getFieldProps("price")}
                  label="Price"
                  style={{ width: "100%" }}
                  error={
                    medicineFormik.touched.price && medicineFormik.errors.price
                      ? true
                      : false
                  }
                  helperText={
                    medicineFormik.touched.price &&
                    medicineFormik.errors.price &&
                    medicineFormik.errors.price
                  }
                />
                <TextField
                  type="date"
                  name="expiration"
                  id="expiration"
                  value={expiration}
                  onChange={(e) => {
                    setExpiration(e.target.value);
                  }}
                  style={{
                    width: "100%",
                  }}
                  onBlur={() => {
                    if (expiration === "") {
                      setError(true);
                    } else {
                      setError(false);
                    }
                  }}
                  error={error && true}
                  helperText={error && "expiration date is Required"}
                />
                <Autocomplete
                  options={props.supplires.map((supplier) => ({
                    id: supplier.id,
                    label: supplier.name,
                  }))}
                  value={supplierValue}
                  onChange={(e, value) => {
                    setSupplierValue(value);
                  }}
                  sx={{ width: "100%" }}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  renderInput={(params) => (
                    <TextField
                      onBlur={() => {
                        if (supplierValue === null) {
                          setError(true);
                        } else {
                          setError(false);
                        }
                      }}
                      error={error && true}
                      helperText={error && "Supplier is Required"}
                      {...params}
                      label="Supplier"
                    />
                  )}
                />
                <Autocomplete
                  options={props.categories.map((category) => ({
                    id: category.id,
                    label: category.name,
                  }))}
                  value={categoryValue}
                  onChange={(e, value) => {
                    setcategoryValue(value);
                  }}
                  sx={{ width: "100%" }}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  renderInput={(params) => (
                    <TextField
                      onBlur={() => {
                        if (categoryValue === null) {
                          setError(true);
                        } else {
                          setError(false);
                        }
                      }}
                      error={error && true}
                      helperText={error && "Category is Required"}
                      {...params}
                      label="Category"
                    />
                  )}
                />
                <Autocomplete
                  options={props.types}
                  value={typeValue}
                  onChange={(e, value) => {
                    settypeValue(value);
                  }}
                  sx={{ width: "100%" }}
                  isOptionEqualToValue={(option, value) => option === value}
                  renderInput={(params) => (
                    <TextField
                      onBlur={() => {
                        if (typeValue === null) {
                          setError(true);
                        } else {
                          setError(false);
                        }
                      }}
                      error={error && true}
                      helperText={error && "Type is Required"}
                      {...params}
                      label="Type"
                    />
                  )}
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
        <PopUp openModal={props.open} handleCloseModal={handleClose}>
          <form onSubmit={medicineFormik.handleSubmit}>
            <TextField
              type="text"
              id="marketName"
              name="marketName"
              variant="standard"
              {...medicineFormik.getFieldProps("marketName")}
              label="Market Name"
              style={{ width: "100%" }}
            />
            <TextField
              type="text"
              name="scientificName"
              id="scientificName"
              variant="standard"
              {...medicineFormik.getFieldProps("scientificName")}
              label="Scientific Name"
              style={{ width: "100%" }}
            />
            <TextField
              type="text"
              name="description"
              id="description"
              variant="standard"
              {...medicineFormik.getFieldProps("description")}
              label="Effective Material"
              style={{ width: "100%" }}
            />
            <TextField
              type="text"
              name="price"
              id="price"
              variant="standard"
              {...medicineFormik.getFieldProps("price")}
              label="Price"
              style={{ width: "100%" }}
            />
            <TextField
              type="date"
              name="expiration"
              id="expiration"
              value={expiration}
              onChange={(e) => {
                setExpiration(e.target.value);
              }}
              style={{
                width: "100%",
              }}
            />
            <Autocomplete
              options={props.supplires.map((supplier) => ({
                id: supplier.id,
                label: supplier.name,
              }))}
              value={supplierValue}
              onChange={(e, value) => {
                setSupplierValue(value);
              }}
              sx={{ width: "100%" }}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              renderInput={(params) => (
                <TextField {...params} label="Suppliers" />
              )}
            />

            <Autocomplete
              options={props.categories.map((category) => ({
                id: category.id,
                label: category.name,
              }))}
              value={categoryValue}
              onChange={(e, value) => {
                setcategoryValue(value);
              }}
              sx={{ width: "100%" }}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              renderInput={(params) => (
                <TextField {...params} label="Category" />
              )}
            />
            <Autocomplete
              options={props.types}
              renderInput={(params) => <TextField {...params} label="Types" />}
              value={typeValue}
              onChange={(e, value) => {
                settypeValue(value);
              }}
              sx={{ width: "100%" }}
              isOptionEqualToValue={(option, value) => option === value}
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
        </PopUp>
      )}
    </>
  );
};

export default AddNewCom;
