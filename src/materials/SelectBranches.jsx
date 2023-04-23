import React, { useState, useEffect, useRef } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { config } from "./../App";

const SelectBranches = (props) => {
  const [pharmacies, setPharmacies] = useState([]);
  //   const [pharmacySelected, setPharmacySelected] = useState("");
  const pharmacySelectedRefInCat = useRef(props.value);
  useEffect(() => {
    axios
      .get(`http://localhost:1234/api/v1/pharmacies`, config)
      .then((response) => {
        setPharmacies(response.data.payload);
      })
      .catch((err) => err);
  }, []);

  return (
    <div>
      <Autocomplete
        options={pharmacies.map((pharmacy) => ({
          id: pharmacy.id,
          label: pharmacy.name,
        }))}
        renderInput={(params) => <TextField {...params} label="Pharmacy" />}
        value={props.value}
        onChange={(e, value) => {
          props.setValue(value);
          pharmacySelectedRefInCat.current = value;
          window.localStorage.setItem(
            props.storage,
            pharmacySelectedRefInCat.current.id
          );
        }}
        sx={{
          width: "100%",
        }}
        isOptionEqualToValue={(option, value) => option.id === value.id}
      />
    </div>
  );
};

export default SelectBranches;
// value ===> pharmacySelected
// setValue ===> setPharmacySelected
// ref ===> pharmacySelectedRef
// storage ===> the name of the local storage
