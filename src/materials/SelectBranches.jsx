import React, { useState, useEffect, useRef } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { config } from "./../App";

const SelectBranches = (props) => {
  const [pharmacies, setPharmacies] = useState([]);
  const [loading, setLoading] = useState(true);
  const pharmacySelectedRefInCat = useRef(props.value);
  useEffect(() => {
    if (props.medCat === "med" && props.auth !== "super") {
      axios
        .get(`http://localhost:1234/api/v1/users/pharmacies`, config)
        .then((response) => {
          setPharmacies(response.data.payload);
          setLoading(false);
        })
        .catch((err) => err);
    } else {
      axios
        .get(`http://localhost:1234/api/v1/pharmacies`, config)
        .then((response) => {
          setPharmacies(response.data.payload);

          setLoading(false);
        })
        .catch((err) => err);
    }
  }, [props.auth, props.medCat]);

  return (
    loading === false && (
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
    )
  );
};

export default SelectBranches;
