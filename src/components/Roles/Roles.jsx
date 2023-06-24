import React, { useState, useEffect } from "react";
import App from "../../App";
import Search from "./../../materials/Search";
import { DataGrid } from "@mui/x-data-grid";
import { config } from "./../../App";
import axios from "axios";
import RolesCom from "./RolesCom";
import PopUp from "./../../materials/PopUp";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import handleDelete from "./../../functions/HandleDelete";
const Roles = () => {
  const columns = [
    { field: "id", headerName: "ID", width: 170 },
    { field: "name", headerName: "Name", width: 170 },
    { field: "createdAt", headerName: "Created At", width: 270 },
  ];

  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [roles, setRoles] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [id, setId] = useState("");
  const [putRequest, setPutRequest] = useState("");
  const [postRequest, setPostRequest] = useState("");
  const [deleteRequest, setdeleteRequest] = useState("");
  const [openShow, setOpenShow] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [infoShow, setinfoShow] = useState([]);
  const [createTime, setCreateTime] = useState("");
  const [updateTime, setUpdateTime] = useState("");
  const [users, setUsers] = useState([]);
  const [authorities, setAuthorities] = useState([]);

  const handleOpen = () => setOpen(true);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleCloseShow = () => {
    setOpenShow(false);
  };

  const handleSelectionModelChange = (selectionModel) => {
    const selectedRowObjects = roles.filter((row) =>
      selectionModel.includes(row.id)
    );
    setSelectedRows(selectedRowObjects);
    if (selectedRowObjects.length > 0) {
      setId(selectedRowObjects[0].id);
    }
  };

  const handleOpenShow = (id) => {
    setOpenShow(true);
    axios
      .get(`http://localhost:1234/api/v1/roles/${id}`, config)
      .then((res) => res)
      .catch((err) => {
        console.log(err);
        setinfoShow(err.response.data.payload);
        setUsers(err.response.data.payload.users);
        setAuthorities(err.response.data.payload.authorities);
        setCreateTime(
          err.response.data.payload.createdAt.split("T").join(" At ")
        );
        setUpdateTime(
          err.response.data.payload.updatedAt.split("T").join(" At ")
        );
      });
  };

  const handleOpenEdit = () => {
    setOpenEdit(true);
  };

  useEffect(() => {
    axios
      .get(
        `http://localhost:1234/api/v1/roles?page=0&&size=10&&sort=priority`,
        config
      )
      .then((res) => {
        console.log(res.data.payload);
        setRoles(res.data.payload);
      })
      .catch((err) => err);
  }, [postRequest, putRequest, deleteRequest]);

  return (
    <App>
      <div className="header">
        <h3 style={{ margin: 0 }}>Roles</h3>
        <Search
          search={search}
          handleSearch={handleSearch}
          placeholder={"Search the Roles name"}
        />
        <div>
          <button className="get" onClick={handleOpen}>
            Create new Role
          </button>
          <RolesCom
            decide={"create"}
            open={open}
            setOpen={setOpen}
            setPostRequest={setPostRequest}
            setPutRequest={setPutRequest}
          />
        </div>
      </div>
      <DataGrid
        rows={roles
          .filter((row) =>
            row.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((row) => ({
            id: row.id,
            name: row.name,
            createdAt: row.createdAt.split("T").join(" AT "),
          }))}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5, 8]}
        localeText={{
          noRowsLabel: `
              : "No Data Available"
          `,
        }}
        checkboxSelection
        onRowSelectionModelChange={handleSelectionModelChange}
      />
      {selectedRows.length > 0 ? (
        <div className="buttons">
          {selectedRows.length === 1 ? (
            <>
              <button
                className="get"
                onClick={() => {
                  handleOpenEdit();
                }}
              >
                Edit
              </button>
              <button
                className="get"
                onClick={() => {
                  handleOpenShow(id);
                }}
              >
                Show
              </button>
            </>
          ) : null}
          <button
            className="get"
            onClick={() => {
              handleDelete("roles", selectedRows, setdeleteRequest);
            }}
          >
            Delete
          </button>
        </div>
      ) : null}
      <PopUp openModal={openShow} handleCloseModal={handleCloseShow}>
        <div style={{ textAlign: "center" }}>
          <h3>{infoShow.name}</h3>
          <div className="cat-info pop">
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <h3>Users</h3>
              </AccordionSummary>
              <AccordionDetails>
                {users.length > 0 ? (
                  users.map((user, i) => {
                    return (
                      <p
                        key={user.id}
                        className="med"
                        style={{ fontWeight: "bold" }}
                      >
                        <span>
                          {i + 1} : {user.name}
                        </span>
                      </p>
                    );
                  })
                ) : (
                  <p className="med" style={{ fontWeight: "bold" }}>
                    {" "}
                    No users for this Role{" "}
                  </p>
                )}
              </AccordionDetails>
            </Accordion>

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
            <p>
              Priority:{" "}
              <b>
                {infoShow.priority === null
                  ? "Not Available"
                  : infoShow.priority}
              </b>
            </p>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <h3>Authorities</h3>
              </AccordionSummary>
              <AccordionDetails>
                {authorities.length > 0 ? (
                  authorities.map((authorities, i) => {
                    return (
                      <p key={i} className="med" style={{ fontWeight: "bold" }}>
                        <span>
                          {i + 1} : {authorities}
                        </span>
                      </p>
                    );
                  })
                ) : (
                  <p className="med" style={{ fontWeight: "bold" }}>
                    {" "}
                    No authorities for this Role{" "}
                  </p>
                )}
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      </PopUp>
      <RolesCom
        decide={"edit"}
        id={id}
        open={openEdit}
        setOpen={setOpenEdit}
        setPostRequest={setPostRequest}
        setPutRequest={setPutRequest}
      />
    </App>
  );
};

export default Roles;
