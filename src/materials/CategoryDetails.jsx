// import React, { useState } from "react";
// import Box from "@mui/material/Box";
// import Collapse from "@mui/material/Collapse";
// import IconButton from "@mui/material/IconButton";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Typography from "@mui/material/Typography";
// import Paper from "@mui/material/Paper";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
// import SearchIcon from "@mui/icons-material/Search";
// import CountButton from "./CountButton";

// function Row(props) {
//   const { row } = props;
//   const [ordered, setOrdered] = useState(false);
//   const [open, setOpen] = useState(false);

//   return (
//     <React.Fragment>
//       <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
//         <TableCell>
//           <IconButton
//             aria-label="expand row"
//             size="small"
//             onClick={() => setOpen(!open)}
//           >
//             {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
//           </IconButton>
//         </TableCell>
//         <TableCell align="center" component="th" scope="row">
//           {row.marketName}
//         </TableCell>
//         <TableCell align="center">{row.scientificName}</TableCell>
//         <TableCell align="center">{row.count}</TableCell>
//         <TableCell align="center">{row.price}</TableCell>
//         <TableCell align="center">
//           <CountButton limit={row.count} />
//         </TableCell>
//         <TableCell align="center">
//           <button
//             className="get"
//             onClick={() => {
//               setOrdered(!ordered);
//             }}
//             style={{ backgroundColor: ordered ? "#e64942" : null }}
//           >
//             {ordered ? "cancel" : "sell"}
//           </button>
//         </TableCell>
//       </TableRow>
//       <TableRow>
//         <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
//           <Collapse in={open} timeout="auto" unmountOnExit>
//             <Box sx={{ margin: 1 }}>
//               <Typography variant="h6" gutterBottom component="div">
//                 Details
//               </Typography>
//               <Table size="small" aria-label="purchases">
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>Expiration</TableCell>
//                     <TableCell align="center">Type</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   <TableCell>{row.expiration}</TableCell>
//                   <TableCell align="center">{row.type}</TableCell>
//                 </TableBody>
//               </Table>
//             </Box>
//           </Collapse>
//         </TableCell>
//       </TableRow>
//     </React.Fragment>
//   );
// }

// export default function CategoryDetails(props) {
//   const [medicine, setMedicine] = useState("");
//   const handleMedicineSearch = (e) => {
//     setMedicine(e.target.value);
//   };

//   return (
//     <TableContainer component={Paper}>
//       <div className="searchWrapper">
//         <input
//           type="text"
//           placeholder="Search..."
//           value={medicine}
//           onChange={handleMedicineSearch}
//           className="search-input"
//         />
//         <SearchIcon
//           style={{
//             transform: "translateX(-40px)",
//             color: "#0f467e",
//           }}
//         />
//       </div>
//       <Table aria-label="collapsible table">
//         <TableHead>
//           <TableRow>
//             <TableCell />
//             <TableCell align="center">Market Name</TableCell>
//             <TableCell align="center">Scientific Name</TableCell>
//             <TableCell align="center">Count</TableCell>
//             <TableCell align="center">Price</TableCell>
//             <TableCell align="center">Quantity</TableCell>
//             <TableCell align="center">Order</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {props.medicines
//             .filter((el) => {
//               return el["marketName"]
//                 .toLowerCase()
//                 .includes(medicine.toLowerCase())
//                 ? el
//                 : null;
//             })
//             .map((row) => (
//               <Row key={row.id} row={row} />
//             ))}
//         </TableBody>
//       </Table>
//       <button
//         className="get"
//         onClick={() => {
//           // console.log(sold);
//         }}
//       >
//         Confirm
//       </button>
//     </TableContainer>
//   );
// }

// import * as React from "react";
// import { DataGrid } from "@mui/x-data-grid";

// const columns = [
//   { field: "id", headerName: "ID", width: 70 },
//   { field: "firstName", headerName: "First name", width: 130 },
//   { field: "lastName", headerName: "Last name", width: 130 },
//   {
//     field: "age",
//     headerName: "Age",
//     type: "number",
//     width: 90,
//   },
//   {
//     field: "fullName",
//     headerName: "Full name",
//     description: "This column has a value getter and is not sortable.",
//     sortable: false,
//     width: 160,
//     valueGetter: (params) =>
//       `${params.row.firstName || ""} ${params.row.lastName || ""}`,
//   },
// ];

// const rows = [
//   { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
//   { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
//   { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
//   { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
//   { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
//   { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
//   { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
//   { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
//   { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
// ];

// export default function DataTable() {
//   const [selectedRows, setSelectedRows] = React.useState([]);

//   const handleSelectionModelChange = (selectionModel) => {
//     const selectedRowObjects = rows.filter((row) =>
//       selectionModel.includes(row.id)
//     );
//     setSelectedRows(selectedRowObjects);
//   };

//   return (
//     <div style={{ height: 400, width: "100%" }}>
//       <DataGrid
//         rows={rows}
//         columns={columns}
//         pageSize={5}
//         rowsPerPageOptions={[5]}
//         checkboxSelection
//         onRowSelectionModelChange={handleSelectionModelChange}
//       />
//       <div
//         onClick={() => {
//           console.log(JSON.stringify(selectedRows));
//         }}
//       >
//         Selected Rows:
//         <ul>
//           {selectedRows.map((row) => (
//             <li key={row.id}>{JSON.stringify(row)}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }
