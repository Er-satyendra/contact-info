import React from "react";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { requestApi } from "../helpers/api.js";
import { useLocation, useNavigate } from "react-router-dom";

import ContactDialog from "../components/ContactDialog.js";
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

function HomePage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [dialogConfig, setDialogConfig] = React.useState({
    dialogTitle: "",
    data: [],
    type: "all",
    even: false,
  });

  React.useEffect(() => {
    getContacts();
  }, [location]);

  const getContacts = async () => {
    let result = await requestApi("GET", null, "/comments");
    if (location.search != "") {
      let type = new URLSearchParams(location.search).get("type");
      let even = new URLSearchParams(location.search).get("even");

      let d = {
        dialogTitle: type == "all" ? "All Contacts" : "US Contacts",
        data:
          type == "all"
            ? result
            : result.filter((x) => x.email.includes(".us")),
        type: type == "all" ? "all" : "us",
        even: even,
      };
      setDialogConfig(d);
    }
  };

  const handleClickOpen = (type, even) => {
    navigate(`/dashboard?type=${type}`);
  };


  return (
    <div className="HomePage vh-100 d-flex justify-content-center align-items-center">
      <ContactDialog dialogConfig={dialogConfig}/>
      <div className="container">
        <div className="row">
          <div className="col-12 d-flex justify-content-center">
            <ThemeProvider theme={theme}>
              <Button
                color="primary"
                variant="outlined"
                onClick={() => handleClickOpen("all")}
              >
                Button A
              </Button>
            </ThemeProvider>
          </div>
          <div className="col-12 d-flex justify-content-center mt-5">
            <ThemeProvider theme={theme}>
              <Button
                color="secondary"
                variant="outlined"
                onClick={() => handleClickOpen("us")}
              >
                Button B
              </Button>
            </ThemeProvider>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
