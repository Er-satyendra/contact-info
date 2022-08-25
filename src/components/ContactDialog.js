import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useLocation, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";

import Checkbox from "@mui/material/Checkbox";
const theme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  palette: {
    primary: {
      main: "#46139f",
      darker: "#46139f",
    },
    secondary: {
      main: "#ff7f50",
      contrastText: "#ff7f50",
    },
  },
});

function ContactDialog(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");

  const [rowData, setRowData] = React.useState(null);

  const [filteredData, setFilteredData] = React.useState([]);
  const [showEven, setShowEven] = React.useState(false);

  useEffect(() => {
    if (location.search != "") {
      setOpen(true);
      setFilteredData(props.dialogConfig.data);
    } else {
      setOpen(false);
    }
  }, [props]);

  useEffect(() => {
    const timeOutId = setTimeout(() => searchData(), 1000);
    return () => clearTimeout(timeOutId);
  }, [search]);

  const handleClickOpen = (type) => {
    setShowEven(false);
    navigate(`/dashboard?type=${type}`);
  };

  const handleClose = () => {
    if (rowData) {
      setRowData(null);
    } else {
      navigate("/dashboard");
    }
  };

  const handleChange = (ev) => {
    let page = new URLSearchParams(location.search).get("page");
    setShowEven(ev.target.checked);
    if (ev.target.checked)
      setFilteredData(
        props.dialogConfig.data
          .filter((x) => +x.id % 2 == 0)
          .slice(0, 10 * parseInt(page ?? 1))
      );
    else {
      setFilteredData(
        props.dialogConfig.data.slice(0, 10 * parseInt(page ?? 1))
      );
    }
  };

  const onEnter = (ev) => {
    if (ev.key == "Enter") {
      searchData();
    }
  };

  const searchData = () => {
    if (search) {
      setFilteredData(
        props.dialogConfig.data.filter(
          (x) =>
            x.id.toString().includes(search) ||
            x.postId.toString().includes(search) ||
            x.name.includes(search) ||
            x.email.includes(search) ||
            x.body.includes(search)
        )
      );
    } else {
      setFilteredData(props.dialogConfig.data);
    }
  };

  return (
    <div className="ContactDialog vh-100 d-flex justify-content-center align-items-center">
      <Dialog
        fullWidth={true}
        maxWidth={"md"}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {rowData ? "Contact Info" : props.dialogConfig.dialogTitle}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          {rowData ? null :
            <div>
              <TextField
                type="text"
                label="Search"
                className="w-100"
                name="Search"
                onKeyPress={onEnter}
                onChange={(ev) => {
                  setSearch(ev.target.value);
                  setShowEven(false);
                }}
                value={search}
              />
            </div>
}
            {rowData ? (
              <div>
                <div className="row">
                  <div className="col-12 col-sm-4 text-primary">Id:</div>
                  <div className="col-12 col-sm-8 text-success">
                    {rowData.id}
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-sm-4 text-primary">Post Id:</div>
                  <div className="col-12 col-sm-8 text-success">
                    {rowData.postId}
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-sm-4 text-primary">Name:</div>
                  <div className="col-12 col-sm-8 text-success">
                    {rowData.name}
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-sm-4 text-primary">Email:</div>
                  <div className="col-12 col-sm-8 text-success">
                    {rowData.email}
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-sm-4 text-primary">Body:</div>
                  <div className="col-12 col-sm-8 text-success">
                    {rowData.body}
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">Id</th>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Post Id</th>
                      <th scope="col">Body</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((item, index) => (
                      <tr key={index} onClick={() => setRowData(item)}>
                        <th scope="row">{item.id}</th>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.postId}</td>
                        <td>{item.body}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {rowData ? null : (
            <Checkbox
              label="Show Even"
              checked={showEven}
              onChange={handleChange}
            />
          )}

          <ThemeProvider theme={theme}>
            {rowData ? null : (
              <Button
                color="primary"
                variant="outline"
                onClick={() => handleClickOpen("all")}
              >
                All Contacts
              </Button>
            )}
            {rowData ? null : (
              <Button
                color="secondary"
                variant="outline"
                onClick={() => handleClickOpen("us")}
                autoFocus
              >
                US Contacts
              </Button>
            )}
            <Button
              color="primary"
              variant="outline"
              onClick={handleClose}
              autoFocus
            >
              Close
            </Button>
          </ThemeProvider>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ContactDialog;
