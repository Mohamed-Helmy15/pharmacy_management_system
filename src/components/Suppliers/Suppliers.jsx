import React, { useState, useEffect } from "react";
import App, { config } from "../../App";
import Search from "./../../materials/Search";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import SupplierCom from "./SupplierCom";
import swal from "sweetalert";
import PopUp from "./../../materials/PopUp";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", width: 150 },
  { field: "email", headerName: "Email", width: 230 },
  {
    field: "address",
    headerName: "Address",
    width: 200,
  },
];

const Suppliers = () => {
  const [search, setSearch] = useState("");
  const [suppliers, setSuppliers] = useState([]);
  const [infoShow, setinfoShow] = useState([]);
  const [addreShow, setAddreShow] = useState({});
  const [phones, setPhones] = useState([]);
  const [address, setAddress] = useState([]);
  const [createTime, setCreateTime] = useState("");
  const [updateTime, setUpdateTime] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [id, setId] = useState("");
  const [open, setOpen] = useState(false);
  const [openShow, setOpenShow] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [putRequest, setPutRequest] = useState("");
  const [postRequest, setPostRequest] = useState("");
  const [deleteRequest, setdeleteRequest] = useState("");

  const handleOpen = () => setOpen(true);

  const handleOpenShow = (id) => {
    setOpenShow(true);
    axios
      .get(`http://localhost:1234/api/v1/suppliers/${id}`, config)
      .then((res) => console.log(res))
      .catch((err) => {
        setinfoShow(err.response.data.payload);
        setAddreShow(err.response.data.payload.address);
        setPhones(err.response.data.payload.phones);
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

  const handleDelete = (rows) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover it",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        rows.map((row) => {
          axios
            .delete(`http://localhost:1234/api/v1/suppliers/${row.id}`, config)
            .then((res) => {
              setdeleteRequest(res);
              swal("Deleted Successfully!", {
                icon: "success",
              });
            })
            .catch((err) => {
              setdeleteRequest(err);
              swal("", "the delete operation hasn't been completed!", "info");
            });
          return true;
        });
      } else {
        swal("", "the delete operation hasn't been completed!", "info");
      }
    });
  };

  const handleCloseShow = () => {
    setOpenShow(false);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSelectionModelChange = (selectionModel) => {
    const selectedRowObjects = suppliers.filter((row) =>
      selectionModel.includes(row.id)
    );
    setSelectedRows(selectedRowObjects);
    if (selectedRowObjects.length > 0) {
      setId(selectedRowObjects[0].id);
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:1234/api/v1/suppliers`, config)
      .then((res) => {
        setSuppliers(res.data.payload);
      })
      .catch((err) => err);
    //

    axios
      .get(`http://localhost:1234/api/v1/addresses`, config)
      .then((res) => setAddress(res.data.payload))
      .catch((err) => err);
  }, [putRequest, postRequest, deleteRequest]);

  return (
    <App>
      <div className="header">
        <h3 style={{ margin: 0 }}>Suppliers</h3>
        <Search
          search={search}
          handleSearch={handleSearch}
          placeholder={"Search the suppliers name"}
        />
        <div>
          <button className="get" onClick={handleOpen}>
            Create new Suppliers
          </button>
          <SupplierCom
            decide={"create"}
            open={open}
            setOpen={setOpen}
            address={address}
            setPostRequest={setPostRequest}
            setPutRequest={setPutRequest}
          />
        </div>
      </div>
      <DataGrid
        rows={suppliers.filter((row) =>
          row.name.toLowerCase().includes(search.toLowerCase())
        )}
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
              handleDelete(selectedRows);
            }}
          >
            Delete
          </button>
        </div>
      ) : null}
      <PopUp openModal={openShow} handleCloseModal={handleCloseShow}>
        <div style={{ textAlign: "center" }}>
          <h3>{infoShow.name}</h3>
          <div className="cat-info">
            <p>
              Address:
              <b>
                {addreShow.governorate} - {addreShow.city} - {addreShow.town}
                {` ${addreShow.street !== null ? `-${addreShow.street}` : ""}`}
              </b>
            </p>
            <p>
              Email:{" "}
              <b>
                {infoShow.email === null ? "Not Available" : infoShow.email}
              </b>
            </p>
            <p>
              Phones:{" "}
              <b>
                {phones.length === 0
                  ? "Not Available"
                  : phones.map((phone, i) => {
                      return phones.length !== i + 1 ? `${phone} - ` : phone;
                    })}
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
      <SupplierCom
        decide={"edit"}
        id={id}
        open={openEdit}
        setOpen={setOpenEdit}
        address={address}
        setPostRequest={setPostRequest}
        setPutRequest={setPutRequest}
      />
    </App>
  );
};

export default Suppliers;
