import React, { useState, useEffect } from "react";
import App, { config } from "../../App";
import Search from "./../../materials/Search";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import AddressCom from "./AddressCom";
import PopUp from "./../../materials/PopUp";
import handleDelete from "./../../functions/HandleDelete";

const columns = [
  { field: "id", headerName: "ID", width: 170 },
  { field: "Address", headerName: "Address", width: 390 },
];

const Address = () => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [openShow, setOpenShow] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [dataRow, setDataRow] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [id, setId] = useState("");
  const [postRequest, setPostRequest] = useState("");
  const [putRequest, setPutRequest] = useState("");
  const [deleteRequest, setdeleteRequest] = useState("");
  const [infoShow, setinfoShow] = useState([]);
  const [createTime, setCreateTime] = useState("");
  const [updateTime, setUpdateTime] = useState("");

  const handleOpen = () => setOpen(true);

  const handleOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleOpenShow = (id) => {
    axios
      .get(`http://localhost:1234/api/v1/addresses/${id}`, config)
      .then((res) => res)
      .catch((err) => {
        setOpenShow(true);
        setinfoShow(err.response.data.payload);
        setCreateTime(
          err.response.data.payload.createdAt.split("T").join(" At ")
        );
        setUpdateTime(
          err.response.data.payload.updatedAt.split("T").join(" At ")
        );
      });
  };

  const handleCloseShow = () => {
    setOpenShow(false);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSelectionModelChange = (selectionModel) => {
    const selectedRowObjects = dataRow.filter((row) =>
      selectionModel.includes(row.id)
    );
    setSelectedRows(selectedRowObjects);
    if (selectedRowObjects.length > 0) {
      setId(selectedRowObjects[0].id);
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:1234/api/v1/addresses", config)
      .then((res) => {
        setDataRow(res.data.payload);
      })
      .catch((err) => err);
  }, [postRequest, putRequest, deleteRequest]);

  return (
    <App>
      <div className="header">
        <h3 style={{ margin: 0 }}>Address</h3>
        <Search
          search={search}
          handleSearch={handleSearch}
          placeholder={"Search the address"}
        />
        <div>
          <button className="get" onClick={handleOpen}>
            Create new Address
          </button>
          <AddressCom
            decide={"create"}
            open={open}
            setOpen={setOpen}
            setPostRequest={setPostRequest}
            setPutRequest={setPutRequest}
          />
        </div>
      </div>

      <DataGrid
        rows={dataRow
          .filter((row) =>
            row.town.toLowerCase().includes(search.toLowerCase())
          )
          .map((row) => ({
            id: row.id,
            Address: `${row.governorate} - ${row.city} - ${row.town} ${
              row.street !== null ? "- " + row.street : ""
            }`,
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
          noRowsLabel: `${"No Data Available"}`,
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
              handleDelete("addresses", selectedRows, setdeleteRequest);
            }}
          >
            Delete
          </button>
        </div>
      ) : null}

      <PopUp openModal={openShow} handleCloseModal={handleCloseShow}>
        <div style={{ textAlign: "center" }}>
          <div className="cat-info">
            <p>
              Address:
              <b>
                {infoShow.governorate} - {infoShow.city} - {infoShow.town}
                {` ${infoShow.street !== null ? `-${infoShow.street}` : ""}`}
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
      </PopUp>

      <AddressCom
        decide={"edit"}
        open={openEdit}
        id={id}
        setOpen={setOpenEdit}
        setPostRequest={setPostRequest}
        setPutRequest={setPutRequest}
      />
    </App>
  );
};

export default Address;
