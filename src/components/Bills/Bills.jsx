import React, { useState } from "react";
import App from "../../App";
import Search from "../../materials/Search";

const Bills = () => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <App>
      <div className="header">
        <h3 style={{ margin: 0 }}>Bills</h3>
        <Search
          search={search}
          handleSearch={handleSearch}
          placeholder={"Search the Bills name"}
        />
        <div>
          <button className="get" onClick={handleOpen}>
            Create new Bills
          </button>
        </div>
      </div>
    </App>
  );
};

export default Bills;
