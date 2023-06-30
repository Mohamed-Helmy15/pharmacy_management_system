import React, { useState, useEffect } from "react";
import styles from "./Profile.module.css";
import App, { config, configMultiPart } from "../../App";
import axios from "axios";
import { Avatar } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import { Tooltip } from "@mui/material/";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import swal from "sweetalert";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useFormik } from "formik";

const Profile = () => {
  const [image, setImage] = useState(null);
  const [roleValue, setRoleValue] = useState(null);
  const [pharmacyValue, setPharmacyValue] = useState(null);
  const [putRequest, setPutRequest] = useState("");
  const [roles, setRoles] = useState([]);
  const [pharmacies, setPharmacies] = useState([]);
  const [profileInfo, setProfileInfo] = useState([]);
  const [manage, setManage] = useState([]);
  const [pharmacy, setPharmacy] = useState("");
  const [role, setRole] = useState("");
  const [img, setImg] = useState(null);
  const [created, setCreated] = useState("");
  const [updated, setUpdated] = useState("");
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState("");

  const userInitialValues = {
    fname: "",
    lname: "",
    username: "",
    password: "",
    email: "",
    phone: "",
  };

  const emptyFields = () => {
    userFormik.values.fname = "";
    userFormik.values.lname = "";
    userFormik.values.phone = "";
    userFormik.values.username = "";
    userFormik.values.email = "";
    setRoleValue(null);
    setPharmacyValue(null);
    userFormik.values.pharmacy = "";
    userFormik.values.password = "";
    setImage(null);
  };

  const onSubmit = (values) => {
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
        `http://localhost:1234/api/v1/users/${id}`,
        formData,
        configMultiPart
      )
      .then((res) => {
        if (res.data.success === true) {
          setPutRequest(values);
          emptyFields();
          setEdit(false);
          swal("The user has been edited Successfully!", {
            icon: "success",
          });
        }
      })
      .catch((err) => {
        return err;
      });
  };
  const userFormik = useFormik({
    initialValues: userInitialValues,
    onSubmit,
  });
  useEffect(() => {
    axios
      .get("http://localhost:1234/api/v1/users/", config)
      .then((res) => {
        return res.data.payload.filter((user) => {
          return user.username === localStorage.getItem("user");
        })[0].id;
      })
      .then((res) => {
        setId(res);
        axios
          .get(`http://localhost:1234/api/v1/users/${res}`, config)
          .then((res) => res)
          .catch((err) => {
            setProfileInfo(err.response.data.payload);
            setManage(err.response.data.payload.managing);
            setRole(err.response.data.payload.role.name);
            setCreated(
              err.response.data.payload.createdAt.split("T").join(" At ")
            );
            setUpdated(
              err.response.data.payload.updatedAt.split("T").join(" At ")
            );
            if (err.response.data.payload.img !== null) {
              setImg(err.response.data.payload.img.split("\\").join("/"));
            }
            setPharmacy(err.response.data.payload.pharmacy.name);
            return err;
          });
        axios
          .get(
            "http://localhost:1234/api/v1/roles?page=0&size=100&sort=priority",
            config
          )
          .then((res) => {
            setRoles(res.data.payload);
          })
          .catch((err) => err);
        axios
          .get(
            "http://localhost:1234/api/v1/pharmacies?page=0&size=100&sort=name",
            config
          )
          .then((res) => {
            setPharmacies(res.data.payload);
          })
          .catch((err) => err);
      });
  }, [edit, putRequest]);
  return (
    <App>
      <div className={styles.profile}>
        <div className={styles.left}>
          {edit ? (
            <>
              <form
                style={{
                  background: "white",
                  borderRadius: "5px",
                  padding: "5px",
                }}
                onSubmit={userFormik.handleSubmit}
              >
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
                  options={roles.map((role) => ({
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
                    <TextField {...params} label="Role" />
                  )}
                />
                <Autocomplete
                  options={pharmacies.map((pharmacy) => ({
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
              <button
                className="cancel"
                onClick={() => {
                  setEdit(false);
                  emptyFields();
                }}
              >
                Return
              </button>
            </>
          ) : (
            <div className={styles.mainInfo}>
              <Tooltip title="Edit" arrow>
                <CreateIcon
                  style={{ cursor: "pointer", fontSize: "20px" }}
                  onClick={() => {
                    setEdit(true);
                  }}
                />
              </Tooltip>
              <div className={styles.infoContainer}>
                <Avatar
                  sx={{
                    bgcolor: "#aaa",
                    width: "100px",
                    height: "100px",
                    fontSize: "50px",
                    margin: "0 auto",
                  }}
                  variant="rounded"
                  alt={localStorage.getItem("user")}
                  src={
                    img !== ""
                      ? `http://localhost:1234/api/v1/users/load-file?file=${img}`
                      : "null"
                  }
                >
                  {Array.from(localStorage.getItem("user"))[0]}
                </Avatar>
                <p>
                  Name: {profileInfo.fname} {profileInfo.lname}
                </p>
                <p>User Name: {profileInfo.username}</p>
                <p>
                  E-mail:{" "}
                  {profileInfo.email ? profileInfo.email : "Not Available"}
                </p>
                <p>Phone: {profileInfo.phone}</p>
                <p>Position: {role}</p>
                <p>Pharmacy: {pharmacy}</p>
                <div className="cat-info">
                  <Accordion style={{ borderRadius: "5px" }}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <h3>Manging</h3>
                    </AccordionSummary>
                    <AccordionDetails>
                      {manage.length > 0 ? (
                        manage.map((manage, i) => {
                          return (
                            <p
                              key={manage.id}
                              className="med"
                              style={{ fontWeight: "bold" }}
                            >
                              <span>
                                {i + 1} - {manage.name}
                              </span>
                            </p>
                          );
                        })
                      ) : (
                        <p className="med" style={{ fontWeight: "bold" }}>
                          <span>This User does not Manage any branch</span>
                        </p>
                      )}
                    </AccordionDetails>
                  </Accordion>
                </div>
                <p>Created At: {created}</p>
                <p>
                  Created By:{" "}
                  {profileInfo.createdBy
                    ? profileInfo.createdBy
                    : "Not Available"}
                </p>
                <p>Last updated At: {updated}</p>
                <p>
                  Last Updated By:{" "}
                  {profileInfo.updatedBy
                    ? profileInfo.updatedBy
                    : "Not Available"}
                </p>
                <div className="cat-info">
                  <Accordion style={{ borderRadius: "5px" }}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <h3>Authorities</h3>
                    </AccordionSummary>
                    <AccordionDetails>
                      {localStorage.getItem("authorities").split(",").length >
                      0 ? (
                        localStorage
                          .getItem("authorities")
                          .split(",")
                          .map((authority, i) => {
                            return (
                              <p
                                key={i}
                                className="med"
                                style={{ fontWeight: "bold" }}
                              >
                                <span>
                                  {i + 1} - {authority}
                                </span>
                              </p>
                            );
                          })
                      ) : (
                        <p className="med" style={{ fontWeight: "bold" }}>
                          <span>This User does not Manage any branch</span>
                        </p>
                      )}
                    </AccordionDetails>
                  </Accordion>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </App>
  );
};

export default Profile;
