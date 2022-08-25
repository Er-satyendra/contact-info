
import "./App.css";

import Button from "@mui/material/Button";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import Routes from './Routes';


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

function App() {
  return (
    <div className="App vh-100 d-flex justify-content-center align-items-center">
      <Routes/>
    </div>
  );
}

export default App;
