import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Search from "./Search";
import axios from "axios";
import { config } from "./../App";
const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "marketName", headerName: "market name", width: 130 },
  { field: "scientificName", headerName: "scientific name", width: 130 },
  {
    field: "count",
    headerName: "Count",
    type: "number",
    width: 90,
    editable: true,
  },
  {
    field: "price",
    headerName: "Price",
    type: "number",
    width: 90,
  },
  {
    field: "expiration",
    headerName: "Expiration",
    type: "number",
    width: 90,
  },
  {
    field: "type",
    headerName: "Type",
    type: "number",
    width: 90,
  },
];

export default function CategoryDetails(props) {
  const [count, setCount] = useState("");
  const rows = props.medicines;
  const [searchText, setSearchText] = React.useState("");

  // const handleSelectionModelChange = (selectionModel) => {
  //   const selectedRowObjects = rows.filter((row) =>
  //     selectionModel.includes(row.id)
  //   );
  //   setSelectedRows(selectedRowObjects);
  // };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <Search
        placeholder={"search by market name"}
        search={searchText}
        handleSearch={(e) => {
          setSearchText(e.target.value);
        }}
      />
      <DataGrid
        rows={rows.filter((row) =>
          row.marketName.toLowerCase().includes(searchText.toLowerCase())
        )}
        columns={columns}
        pageSize={7}
        rowsPerPageOptions={[1, 2, 3]}
        localeText={{
          noRowsLabel: `${
            window.localStorage.getItem("branch") === "undefined"
              ? "Please Select The Branch"
              : "No Data Available"
          }`,
        }}
        onStateChange={(params) => {
          if (params.editRows["1"]) {
            setCount(params.editRows["1"]["count"].value);
          }
          // console.log(params.editRows["1"].count.value);
        }}
        onCellEditStop={(params) => {
          let updatedCount = {
            pharmacy: 1,
            medicine: 1,
            count,
          };
          axios
            .post(
              "http://localhost:1234/api/v1/medicines/update-count",
              updatedCount,
              config
            )
            .then((res) => props.setCount(count))
            .catch((err) => console.log(err));
        }}

        // checkboxSelection
        // onRowSelectionModelChange={handleSelectionModelChange}
      />
      <div
        onClick={() => {
          console.log(count);
        }}
      >
        sdkfasdkd
      </div>
    </div>
  );
}
