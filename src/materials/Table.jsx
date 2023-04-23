/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { config } from "../App.js";
import Paper from "@mui/material/Paper";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import axios from "axios";
import PopUp from "./PopUp";
import Notification from "./Notification";
import { Avatar } from "@mui/material";
import CatCom from "../components/Categories/CatCom";
import UserCom from "./../components/Users/UserCom";
import CustomerCom from "../components/Customers/CustomerCom.jsx";
import BranchCom from "./../components/Branches/BranchCom";
import CategoryDetails from "./CategoryDetails";
import swal from "sweetalert";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#0f467e",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 18,
  },
}));

const Tables = (props) => {
  const [img, setimg] = useState(null); // src
  const [pharmacy, setPharmacy] = useState("");
  const [role, setRole] = useState("");
  const [infoAddress, setInfoAddress] = useState("");
  const [branchManager, setBranchManager] = useState("");
  const [createTime, setCreateTime] = useState("");
  const [updateTime, setUpdateTime] = useState("");
  const [id, setId] = useState("");
  const [infoShow, setInfoShow] = useState([]);
  const [stateNotification, setStateNotification] = useState(false);
  const [notifDelete, setnotifDelete] = useState(null);
  const [roles, setRoles] = useState([]);
  const [pharmacies, setPharmacies] = useState([]);
  const [address, setAddress] = useState([]);
  const [addressRequest, setAddressRequest] = useState(false);
  const [manager, setManager] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [medId, setMedId] = useState("");
  const [count, setCount] = useState("");

  const handleNotClose = (event, reason) => {
    setnotifDelete(null);
  };
  const handleToggleNotDelete = () => {
    setnotifDelete(true);
  };

  const [openShowModal, setOpenShowModal] = useState(false);
  const handleShowOpen = () => {
    setOpenShowModal(true);
  };

  const [openEditModal, setOpenEditModal] = useState(false);
  const handleEditOpen = () => {
    setOpenEditModal(true);
    if (props.section === "users") {
      axios
        .get("http://localhost:1234/api/v1/roles", config)
        .then((res) => {
          setRoles(res.data.payload);
        })
        .catch((err) => err);
      axios
        .get("http://localhost:1234/api/v1/pharmacies", config)
        .then((res) => {
          setPharmacies(res.data.payload);
        })
        .catch((err) => err);
    } else if (props.section === "customers") {
      axios
        .get(
          `http://localhost:1234/api/v1/addresses?page=0&size=100&sort=governorate`,
          config
        )
        .then((res) => {
          setAddress(res.data.payload);
        })
        .catch((err) => err);
    }
  };

  const handleCloseModal = () => {
    setOpenEditModal(false);
    setOpenShowModal(false);
  };

  useEffect(() => {
    axios
      .get(
        `http://localhost:1234/api/v1/addresses?page=0&size=100&sort=governorate`,
        config
      )
      .then((res) => {
        setAddress(res.data.payload);
      })
      .catch((err) => err);
    axios
      .get(
        "http://localhost:1234/api/v1/users?page=0&size=100&sort=username",
        config
      )
      .then((res) => {
        setManager(res.data.payload);
      })
      .catch((err) => err);
    axios
      .get(
        `http://localhost:1234/api/v1/medicines/?pharmacy=${window.localStorage.getItem(
          "branch"
        )}`,
        config
      )
      .then((res) => {
        setMedicines(res.data.payload);
      });
  }, [addressRequest, count, window.localStorage.getItem("branch")]);

  const handleShow = (row) => {
    setMedId(row);
    medicines.filter((m) => (m.category.id === row ? m : null));

    axios
      .get(`http://localhost:1234/api/v1/${props.section}/${row}`, config)
      .then((res) => {
        setInfoShow(res.response.data.payload);
      })
      .catch((err) => {
        if (
          err.response.data.payload.img !== undefined &&
          err.response.data.payload.img !== null
        ) {
          setimg(err.response.data.payload.img.split("\\").join("/"));
        }
        if (
          err.response.data.payload.pharmacy !== null &&
          err.response.data.payload.pharmacy !== undefined
        ) {
          setPharmacy(err.response.data.payload.pharmacy.name);
        }
        if (
          err.response.data.payload.role !== null &&
          err.response.data.payload.role !== undefined
        ) {
          setRole(err.response.data.payload.role.name);
        }
        if (
          err.response.data.payload.address !== null &&
          err.response.data.payload.address !== undefined
        ) {
          setInfoAddress(
            `${err.response.data.payload.address.governorate} - ${
              err.response.data.payload.address.city
            } - ${err.response.data.payload.address.town} ${
              err.response.data.payload.address.street !== null
                ? "- " + err.response.data.payload.address.street
                : ""
            }`
          );
        }
        if (
          err.response.data.payload.manager !== null &&
          err.response.data.payload.manager !== undefined
        ) {
          setBranchManager(err.response.data.payload.manager.name);
        }
        if (
          err.response.data.payload.createdAt ||
          err.response.data.payload.updatedAt
        ) {
          setCreateTime(
            err.response.data.payload.createdAt.split("T").join("At ")
          );
          setUpdateTime(
            err.response.data.payload.updatedAt.split("T").join("At ")
          );
        }
        setInfoShow(err.response.data.payload);
      });

    handleShowOpen();
  };

  const handleDelete = (row) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover it",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(
            `http://localhost:1234/api/v1/${props.section}/${row}`,
            config
          )
          .then((res) => {
            props.setdeleteRequest(row);
            setStateNotification(true);
            handleToggleNotDelete();
            swal("Deleted Successfully!", {
              icon: "success",
            });
          })
          .catch((err) => {
            setStateNotification(false);
            swal("", "the delete operation hasn't been completed!", "info");
          });
      } else {
        swal("", "the delete operation hasn't been completed!", "info");
      }
    });
  };

  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {props.columns.map((column) => {
                  return (
                    <StyledTableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </StyledTableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {props.dataRow
                .slice(
                  props.page * props.rowsPerPage,
                  props.page * props.rowsPerPage + props.rowsPerPage
                )
                .filter((el) => {
                  return el[props.keySearch].includes(props.search) ? el : null;
                })
                .map((row, i) => {
                  // console.log(row.id);
                  return (
                    <TableRow key={row.id} hover role="checkbox" tabIndex={-1}>
                      {props.columns.map((column, i) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {i !== props.columns.length - 1 ? (
                              value === null ? (
                                "Not Available"
                              ) : (
                                value
                              )
                            ) : (
                              <>
                                <button
                                  className="get"
                                  style={{
                                    marginRight: 5,
                                  }}
                                  onClick={() => {
                                    handleShow(row.id);
                                  }}
                                >
                                  Show
                                </button>
                                <button
                                  className="get"
                                  style={{
                                    marginRight: 5,
                                  }}
                                  onClick={() => {
                                    setId(row.id);
                                    handleEditOpen();
                                  }}
                                >
                                  Edit
                                </button>
                                <button
                                  className="get"
                                  style={{ marginTop: "5px" }}
                                  onClick={() => {
                                    handleDelete(row.id);
                                  }}
                                >
                                  Delete
                                </button>
                              </>
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[2, 4, 10]}
          component="div"
          count={props.dataRow.length}
          rowsPerPage={props.rowsPerPage}
          page={props.page}
          onPageChange={props.handleChangePage}
          onRowsPerPageChange={props.handleChangeRowsPerPage}
        />
        {stateNotification === true ? (
          <Notification
            auto={6000} // auto hide time in ms
            case="success"
            successfulMessage={`the ${props.section} has been successfully deleted`}
            notification={notifDelete} // add state
            handleNotClose={handleNotClose} // on close function
          />
        ) : (
          <Notification
            auto={6000}
            case="error"
            unsuccessfulMessage={`the ${props.section} has not been successfully deleted`}
            notification={notifDelete}
            handleNotClose={handleNotClose}
          />
        )}
      </Paper>
      {/* show all section */}
      <PopUp openModal={openShowModal} handleCloseModal={handleCloseModal}>
        {props.section === "categories" ? (
          <div
            style={{ textAlign: "center", overflow: "auto", maxHeight: "80vh" }}
          >
            <h3
              onClick={() => {
                console.log(medicines);
              }}
            >
              {infoShow.name}
            </h3>
            <div className="cat-info">
              <p>
                Created By: <b>{infoShow.createdBy}</b>
              </p>
              <p>
                Created At: <b>{createTime}</b>
              </p>
              <p>
                Updated By: <b>{infoShow.updatedBy}</b>
              </p>
              <p>
                Last Update at: <b>{updateTime}</b>
              </p>
            </div>
            <CategoryDetails
              setCount={setCount}
              medicines={medicines.filter((m) =>
                m.category.id === medId ? m : null
              )}
            />
          </div>
        ) : props.section === "users" ? (
          <div style={{ textAlign: "center" }}>
            {infoShow.img !== null && (
              <Avatar
                style={{ margin: "auto" }}
                sx={{ width: 70, height: 70 }}
                alt="mohamed helmy"
                src={`http://localhost:1234/api/v1/users/load-file?file=${img}`}
              />
            )}

            <h3>
              {infoShow.username === null ? "Not Available" : infoShow.username}
            </h3>
            <div className="cat-info">
              <p>
                Position: <b>{role}</b>
              </p>
              <p>
                Email:{" "}
                <b>
                  {infoShow.email === null ? "Not Available" : infoShow.email}
                </b>
              </p>
              <p>
                Phone:{" "}
                <b>
                  {infoShow.phone === null ? "Not Available" : infoShow.phone}
                </b>
              </p>
              <p>
                Pharmacy:{" "}
                <b>{infoShow.pharmacy === null ? "Not Available" : pharmacy}</b>
              </p>
              <p>
                Created At:{" "}
                <b>
                  {infoShow.createdAt === null ? "Not Available" : createTime}
                </b>
              </p>
              <p>
                Created By:{" "}
                <b>
                  {infoShow.createdBy === null
                    ? "Not Available"
                    : infoShow.createdBy}
                </b>
              </p>
              <p>
                Last Update at:{" "}
                <b>
                  {infoShow.updatedAt === null ? "Not Available" : updateTime}
                </b>
              </p>
              <p>
                Updated By:{" "}
                <b>
                  {infoShow.updatedBy === null
                    ? "Not Available"
                    : infoShow.updatedBy}
                </b>
              </p>
            </div>
          </div>
        ) : props.section === "customers" ? (
          <div style={{ textAlign: "center" }}>
            <h3>
              {infoShow.fname} {infoShow.lname}
            </h3>
            <div className="cat-info">
              <p>
                Address:
                <b>{infoAddress}</b>
              </p>
              <p>
                Email:{" "}
                <b>
                  {infoShow.email === null ? "Not Available" : infoShow.email}
                </b>
              </p>
              <p>
                Phone:{" "}
                <b>
                  {infoShow.phone === null ? "Not Available" : infoShow.phone}
                </b>
              </p>
              <p>
                Created At:{" "}
                <b>
                  {infoShow.createdAt === null ? "Not Available" : createTime}
                </b>
              </p>
              <p>
                Created By:{" "}
                <b>
                  {infoShow.createdBy === null
                    ? "Not Available"
                    : infoShow.createdBy}
                </b>
              </p>
              <p>
                Last Update at:{" "}
                <b>
                  {infoShow.updatedAt === null ? "Not Available" : updateTime}
                </b>
              </p>
              <p>
                Updated By:{" "}
                <b>
                  {infoShow.updatedBy === null
                    ? "Not Available"
                    : infoShow.updatedBy}
                </b>
              </p>
            </div>
          </div>
        ) : props.section === "pharmacies" ? (
          <div style={{ textAlign: "center" }}>
            <h3>{infoShow.name}</h3>
            <div className="cat-info">
              <p>
                Manager : <b>{branchManager}</b>
              </p>
              <p>
                Address : <b>{infoAddress}</b>
              </p>
              <p>
                Created By: <b>{infoShow.createdBy}</b>
              </p>
              <p>
                Created At: <b>{createTime}</b>
              </p>
              <p>
                Updated By: <b>{infoShow.updatedBy}</b>
              </p>
              <p>
                Last Update at: <b>{updateTime}</b>
              </p>
            </div>
          </div>
        ) : null}
      </PopUp>
      {/* edit all section */}
      <PopUp openModal={openEditModal} handleCloseModal={handleCloseModal}>
        {props.section === "categories" ? (
          <CatCom
            decide={"edit"}
            id={id}
            setPutRequest={props.setPutRequest}
            handleCloseModal={handleCloseModal}
          />
        ) : props.section === "users" ? (
          <UserCom
            decide={"edit"}
            id={id}
            setOpen={handleCloseModal}
            setPutRequest={props.setPutRequest}
            roles={roles}
            pharmacies={pharmacies}
          />
        ) : props.section === "customers" ? (
          <CustomerCom
            decide={"edit"}
            id={id}
            setOpen={handleCloseModal}
            setPutRequest={props.setPutRequest}
            address={address}
            addressRequest={addressRequest}
            setAddressRequest={setAddressRequest}
          />
        ) : props.section === "pharmacies" ? (
          <BranchCom
            decide={"edit"}
            id={id}
            setOpen={handleCloseModal}
            manager={manager}
            setPutRequest={props.setPutRequest}
          />
        ) : null}
      </PopUp>
    </>
  );
};

export default Tables;
