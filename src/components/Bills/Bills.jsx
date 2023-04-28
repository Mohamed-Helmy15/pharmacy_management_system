import React, { useState, useEffect } from "react";
import App, { config } from "../../App";
import Search from "../../materials/Search";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import FormatCurrency from "./../../FormatCurrency";
import swal from "sweetalert";

const columns = [
  { field: "id", headerName: "ID", width: 170 },
  { field: "customer", headerName: "Customer", width: 170 },
  { field: "createdAt", headerName: "Date", width: 270 },
  { field: "price", headerName: "Price", width: 200 },
];

const Bills = () => {
  const [search, setSearch] = useState("");
  const [openShow, setOpenShow] = useState(false);
  const [dataRow, setDataRow] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [id, setId] = useState("");
  const [putRequest, setPutRequest] = useState("");
  const [deleteRequest, setdeleteRequest] = useState("");

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
            .delete(
              `http://localhost:1234/api/v1/transactions/${row.id}`,
              config
            )
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

  const handleOpenShow = () => setOpenShow(true);

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
      .get("http://localhost:1234/api/v1/transactions/", config)
      .then((res) => setDataRow(res.data.payload))
      .catch((err) => err);
  }, [deleteRequest]);

  return (
    <App>
      <div className="header">
        <h3 style={{ margin: 0 }}>Bills</h3>
        <Search
          search={search}
          handleSearch={handleSearch}
          placeholder={"Search the customer name"}
        />
        {/* <div>
          <button className="get" onClick={handleOpen}>
            Create new Bills
          </button>
        </div> */}
      </div>

      <DataGrid
        rows={dataRow
          .filter((row) =>
            row.customer.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((row) => ({
            id: row.id,
            customer: row.customer.name,
            createdAt: row.createdAt.split("T").join(" AT "),
            price: FormatCurrency(row.price),
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
                  // handleOpenEdit();
                }}
              >
                Edit
              </button>
              <button
                className="get"
                onClick={() => {
                  // handleOpenShow(id);
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
    </App>
  );
};

export default Bills;
