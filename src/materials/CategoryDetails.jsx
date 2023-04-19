import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Search from "./Search";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const rows = props.medicines;
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [searchText, setSearchText] = React.useState("");

  const handleSelectionModelChange = (selectionModel) => {
    const selectedRowObjects = rows.filter((row) =>
      selectionModel.includes(row.id)
    );
    setSelectedRows(selectedRowObjects);
  };

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
        // checkboxSelection
        onRowSelectionModelChange={handleSelectionModelChange}
      />
      {selectedRows.length > 0 ? (
        <button
          className="get"
          style={{ marginTop: "10px" }}
          onClick={() => {
            navigate("/bills", { state: { selectedRows } });
          }}
        >
          Confirm
        </button>
      ) : null}
    </div>
  );
}
