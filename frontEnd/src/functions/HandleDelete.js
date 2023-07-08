import axios from "axios";
import swal from "sweetalert";
import { config } from "./../App";

const handleDelete = (section, rows, setdeleteRequest) => {
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover it",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      rows.map((row) => {
        axios
          .delete(`http://localhost:1234/api/v1/${section}/${row.id}`, config)
          .then((res) => {
            setdeleteRequest(res);
            swal("Deleted Successfully!", {
              icon: "success",
            });
          })
          .catch((err) => {
            console.log(err);
            setdeleteRequest(err);
            swal("", "the delete operation hasn't been completed!", "info");
          });
        return true;
      });
    } else {
      swal("", "the delete operation hasn't been completed!", "info");
    }
  });
};

export default handleDelete;
