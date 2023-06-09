import React from "react";
import SearchIcon from "@mui/icons-material/Search";

const Search = (props) => {
  return (
    <div className="searchWrapper">
      <input
        className="search-input"
        type="text"
        name="category"
        id="category"
        placeholder={props.placeholder}
        value={props.search}
        onChange={props.handleSearch}
      />
      <SearchIcon
        style={{
          transform: "translateX(-40px)",
          color: "#0f467e",
        }}
      />
    </div>
  );
};

export default Search;
