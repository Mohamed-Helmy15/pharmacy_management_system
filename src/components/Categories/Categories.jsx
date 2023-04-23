/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import styles from "./Categories.module.css";
import axios from "axios";
import Tables from "../../materials/Table";
import Search from "../../materials/Search";
import CatCom from "./CatCom";
import App, { config } from "../../App";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import SelectBranches from "../../materials/SelectBranches";

export const style = {
  position: "absolute",
  top: "50%",
  width: 400,
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  p: 4,
};

const Categories = () => {
  const [pharmacies, setPharmacies] = useState([]);
  const [pharmacySelected, setPharmacySelected] = useState("");
  const pharmacySelectedRef = useRef(pharmacySelected);
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [postRequest, setpostRequest] = useState("");
  const [putRequest, setPutRequest] = useState(0);
  const [deleteRequest, setdeleteRequest] = useState(0);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const minWidth = 100;
  const columns = [
    { id: "name", label: "Category name", minWidth, align: "center" },

    {
      id: "actions",
      label: "Actions",
      minWidth: minWidth + 50,
      align: "center",
    },
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpen = () => setOpen(true);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    axios
      .get(
        `http://localhost:1234/api/v1/categories?page=${page}&size=${rowsPerPage}&sort=name`,
        config
      )
      .then((response) => {
        setCategories(response.data.payload);
      })
      .catch((err) => err);
    axios
      .get(`http://localhost:1234/api/v1/pharmacies`, config)
      .then((response) => {
        setPharmacies(response.data.payload);
      })
      .catch((err) => err);
  }, [postRequest, deleteRequest, putRequest]);

  console.log(pharmacySelectedRef);

  return (
    <>
      <App>
        <SelectBranches
          value={pharmacySelected}
          setValue={setPharmacySelected}
          storage={"branch"}
        />
        <div className="header">
          <h3 style={{ margin: 0 }}>Categories</h3>
          <Search
            search={search}
            handleSearch={handleSearch}
            placeholder={"Search the category name"}
          />
          <div>
            <button className="get" onClick={handleOpen}>
              Create new Categories
            </button>

            <CatCom
              decide={"create"}
              open={open}
              setOpen={setOpen}
              setpostRequest={setpostRequest}
              postRequest={postRequest}
            />
          </div>
        </div>

        <div className={styles.content}>
          <Tables
            columns={columns}
            dataRow={categories}
            page={page} //pagination
            rowsPerPage={rowsPerPage} //pagination
            handleChangePage={handleChangePage} //pagination
            handleChangeRowsPerPage={handleChangeRowsPerPage} //pagination
            section={"categories"} // handle api
            deleteRequest={deleteRequest} // delete state in the section
            setdeleteRequest={setdeleteRequest} // set delete state to rerender the catergory component
            setPutRequest={setPutRequest} // set put state to rerender the catergory component
            search={search}
            keySearch={"name"}
          />
        </div>
      </App>
    </>
  );
};

export default Categories;
