import React, { useState } from "react";
import App from "../../App";
import Search from "../../materials/Search";

const AddNewM = () => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  return (
    <App>
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
        </div>
      </div>
    </App>
  );
};

export default AddNewM;
