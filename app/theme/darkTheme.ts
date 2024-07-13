import { createTheme } from "@mui/material/styles";


const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#a216ff",
    },
    background: {
      default: "#FFFFFF",
    },
    borderColor: {
      main: "#dba5ff",
    },
    tableHeader: {
      main: "#a981c6",
    },
    cardBg:{
        main:"#0f001e"
    },
    fontColor:{
        main:"#FFFFFF",
        dark:"#FFFFFF",
    }
  },
  typography: {
    h6: {
      color: "#333333",
    },
    subtitle1: {
      fontSize: 18,
    },
  },
});

export default darkTheme;