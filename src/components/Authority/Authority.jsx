import React, { useState, useEffect } from "react";
import App, { config } from "../../App";
import Search from "./../../materials/Search";
import AuthorityCom from "./AuthorityCom";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import PopUp from "./../../materials/PopUp";
import handleDelete from "./../../functions/HandleDelete";

const Authority = () => {
  const columns = [
    { field: "id", headerName: "ID", width: 170 },
    { field: "name", headerName: "Name", width: 170 },
    { field: "createdAt", headerName: "Created At", width: 270 },
  ];

  const [auth, setAuth] = useState("");
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [putRequest, setPutRequest] = useState("");
  const [postRequest, setPostRequest] = useState("");
  const [deleteRequest, setdeleteRequest] = useState("");
  const [authority, setAuthority] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [id, setId] = useState("");
  const [openShow, setOpenShow] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [infoShow, setinfoShow] = useState([]);
  const [createTime, setCreateTime] = useState("");
  const [updateTime, setUpdateTime] = useState("");

  const handleSelectionModelChange = (selectionModel) => {
    const selectedRowObjects = authority.filter((row) =>
      selectionModel.includes(row.id)
    );
    setSelectedRows(selectedRowObjects);
    if (selectedRowObjects.length > 0) {
      setId(selectedRowObjects[0].id);
    }
  };

  const handleOpen = () => setOpen(true);

  const handleCloseShow = () => {
    setOpenShow(false);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleOpenShow = (id) => {
    setOpenShow(true);
    axios
      .get(`http://localhost:1234/api/v1/authorities/${id}`, config)
      .then((res) => res)
      .catch((err) => {
        console.log(err);
        setinfoShow(err.response.data.payload);
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
    setAuth(localStorage.getItem("role"));
    axios
      .get(
        `http://localhost:1234/api/v1/authorities?page=0&&size=100&&sort=name`,
        config
      )
      .then((res) => {
        setAuthority(res.data.payload);
      })
      .catch((err) => err);
  }, [putRequest, postRequest, deleteRequest]);
  return (
    <App>
      <div className="header">
        <h3 style={{ margin: 0 }}>Authority</h3>
        <Search
          search={search}
          handleSearch={handleSearch}
          placeholder={"Search the Authority name"}
        />
        <div>
          {auth === "super" && (
            <button className="get" onClick={handleOpen}>
              Create new Authority
            </button>
          )}
          <AuthorityCom
            decide={"create"}
            open={open}
            setOpen={setOpen}
            setPostRequest={setPostRequest}
            setPutRequest={setPutRequest}
          />
        </div>
      </div>
      <DataGrid
        rows={authority
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
        pageSizeOptions={[5, 8, 20]}
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
              {auth === "super" && (
                <button
                  className="get"
                  onClick={() => {
                    handleOpenEdit();
                  }}
                >
                  Edit
                </button>
              )}
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
          {auth === "super" && (
            <button
              className="get"
              onClick={() => {
                handleDelete("authorities", selectedRows, setdeleteRequest);
              }}
            >
              Delete
            </button>
          )}
        </div>
      ) : null}
      <PopUp openModal={openShow} handleCloseModal={handleCloseShow}>
        <div style={{ textAlign: "center" }}>
          <h3>{infoShow.name}</h3>
          <div className="cat-info">
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
      </PopUp>
      <AuthorityCom
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

export default Authority;
