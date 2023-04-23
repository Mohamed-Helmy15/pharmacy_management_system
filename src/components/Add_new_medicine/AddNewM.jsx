/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import App, { config } from "../../App";
import Search from "../../materials/Search";
import axios from "axios";
import AddNewCom from "./AddNewCom";
import Tables from "./../../materials/Table";
import SelectBranches from "./../../materials/SelectBranches";
import { DataGrid } from "@mui/x-data-grid";

// const AddNewM = () => {
//   const minWidth = 100;

//   const columns = [
//     {
//       id: "marketName",
//       label: "Market Name",
//       minWidth,
//       align: "center",
//     },
//     {
//       id: "type",
//       label: "Type",
//       minWidth,
//       align: "center",
//     },
//     {
//       id: "price",
//       label: "Price",
//       minWidth,
//       align: "center",
//     },
//     {
//       id: "actions",
//       label: "Actions",
//       minWidth: minWidth + 50,
//       align: "center",
//     },
//   ];

//   const [search, setSearch] = useState("");
//   const [categories, setCategories] = useState([]);
//   const [types, setTypes] = useState([]);
//   const [suppliers, setSuppliers] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [putRequest, setPutRequest] = useState("");
//   const [dataRow, setDataRow] = useState([]);
//   const [postRequest, setPostRequest] = useState("");
//   const [deleteRequest, setdeleteRequest] = useState(0);

//   const handleOpen = () => setOpen(true);

//   const handleSearch = (e) => {
//     setSearch(e.target.value);
//   };

//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   useEffect(() => {
//     axios
//       .get("http://localhost:1234/api/v1/categories", config)
//       .then((res) => {
//         setCategories(res.data.payload);
//       })
//       .catch((err) => err);
//     axios
//       .get("http://localhost:1234/api/v1/medicines/types", config)
//       .then((res) => {
//         setTypes(res.data.payload);
//       })
//       .catch((err) => err);
//     axios
//       .get("http://localhost:1234/api/v1/suppliers", config)
//       .then((res) => {
//         setSuppliers(res.data.payload);
//       })
//       .catch((err) => err);

//     axios
//       .get(
//         `http://localhost:1234/api/v1/medicines?page=${page}&size=${rowsPerPage}&sort=price&pharmacy=${window.localStorage.getItem(
//           "thisBranch"
//         )}`,
//         config
//       )
//       .then((res) => {
//         setDataRow(res.data.payload);
//       })
//       .catch((err) => err);
//   }, [deleteRequest, putRequest, postRequest]);

//   return (
//     <App>
//       <div className="header">
//         <h3 style={{ margin: 0 }}>Medicines</h3>
//         <Search
//           search={search}
//           handleSearch={handleSearch}
//           placeholder={"Search the medicines name"}
//         />
//         <div>
//           <button className="get" onClick={handleOpen}>
//             Create new Medicines
//           </button>
//           <AddNewCom
//             decide={"create"}
//             open={open}
//             setOpen={setOpen}
//             categories={categories}
//             types={types}
//             supplires={suppliers}
//             setPostRequest={setPostRequest}
//             setPutRequest={setPutRequest}
//           />
//         </div>
//       </div>
//       <Tables
//         columns={columns}
//         dataRow={dataRow}
//         page={page}
//         rowsPerPage={rowsPerPage}
//         handleChangePage={handleChangePage}
//         handleChangeRowsPerPage={handleChangeRowsPerPage}
//         section={"medicines"}
//         setPutRequest={setPutRequest}
//         deleteRequest={deleteRequest}
//         setdeleteRequest={setdeleteRequest}
//         search={search}
//         keySearch={"marketName"}
//       />
//     </App>
//   );
// };

// export default AddNewM;

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "marketName", headerName: "market name", width: 130 },
  { field: "scientificName", headerName: "scientific name", width: 130 },
  {
    field: "count",
    headerName: "Count",
    type: "number",
    width: 90,
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
    width: 130,
  },
  {
    field: "type",
    headerName: "Type",
    type: "number",
    width: 90,
  },
];

const AddNewM = () => {
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [open, setOpen] = useState(false);
  const [putRequest, setPutRequest] = useState("");
  const [dataRow, setDataRow] = useState([]);
  const [postRequest, setPostRequest] = useState("");
  const [deleteRequest, setdeleteRequest] = useState(0);
  const [pharmacySelected, setPharmacySelected] = useState("");
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const handleOpen = () => setOpen(true);

  useEffect(() => {
    axios
      .get("http://localhost:1234/api/v1/categories", config)
      .then((res) => {
        setCategories(res.data.payload);
      })
      .catch((err) => err);
    axios
      .get("http://localhost:1234/api/v1/medicines/types", config)
      .then((res) => {
        setTypes(res.data.payload);
      })
      .catch((err) => err);
    axios
      .get("http://localhost:1234/api/v1/suppliers", config)
      .then((res) => {
        setSuppliers(res.data.payload);
      })
      .catch((err) => err);

    axios
      .get(
        `http://localhost:1234/api/v1/medicines?&sort=price&pharmacy=${window.localStorage.getItem(
          "thisBranch"
        )}`,
        config
      )
      .then((res) => {
        setDataRow(res.data.payload);
      })
      .catch((err) => err);
  }, [deleteRequest, putRequest, postRequest]);

  // const handleSelectionModelChange = (selectionModel) => {
  //   const selectedRowObjects = rows.filter((row) =>
  //     selectionModel.includes(row.id)
  //   );
  //   setSelectedRows(selectedRowObjects);
  // };

  return (
    <App>
      <SelectBranches
        value={pharmacySelected}
        setValue={setPharmacySelected}
        storage={"thisBranch"}
      />
      <div className="header">
        <h3 style={{ margin: 0 }}>Medicines</h3>
        <Search
          search={search}
          handleSearch={handleSearch}
          placeholder={"Search the medicines name"}
        />
        <div>
          <button className="get" onClick={handleOpen}>
            Create new Medicines
          </button>
          <AddNewCom
            decide={"create"}
            open={open}
            setOpen={setOpen}
            categories={categories}
            types={types}
            supplires={suppliers}
            setPostRequest={setPostRequest}
            setPutRequest={setPutRequest}
          />
        </div>
      </div>

      <DataGrid
        rows={dataRow.filter((row) =>
          row.marketName.toLowerCase().includes(search.toLowerCase())
        )}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        localeText={{
          noRowsLabel: `${
            window.localStorage.getItem("branch") === "undefined" ||
            !window.localStorage.getItem("branch")
              ? "Please Select The Branch"
              : "No Data Available"
          }`,
        }}
        // onStateChange={(params) => {
        //   if (params.editRows["1"]) {
        //     setCount(params.editRows["1"]["count"].value);
        //   }
        //   // console.log(params.editRows["1"].count.value);
        // }}
        // onCellEditStop={(params) => {
        //   let updatedCount = {
        //     pharmacy: 1,
        //     medicine: 1,
        //     count,
        //   };
        //   axios
        //     .post(
        //       "http://localhost:1234/api/v1/medicines/update-count",
        //       updatedCount,
        //       config
        //     )
        //     .then((res) => props.setCount(count))
        //     .catch((err) => console.log(err));
        // }}

        checkboxSelection
        // onRowSelectionModelChange={handleSelectionModelChange}
      />
    </App>
  );
};

export default AddNewM;
