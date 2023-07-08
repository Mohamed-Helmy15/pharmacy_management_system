import React, { useState, useEffect } from "react";
import Loading from "./Loading/Loading";
import NewPassword from "./New_Password/NewPassword";
import axios from "axios";

const Reset = () => {
  const [loading, setLoading] = useState(null);
  useEffect(() => {
    const token = window.location.href.split("?")[1].split("=")[1];

    axios
      .post(
        "http://localhost:1234/api/v1/users/reset-password/check-expiration",
        {
          token: token,
        }
      )
      .then((res) => setLoading(res.data.payload.valid))
      .catch((err) => err);
  }, []);

  return (
    <>{loading === null ? <Loading /> : <NewPassword valid={loading} />}</>
  );
};

export default Reset;
