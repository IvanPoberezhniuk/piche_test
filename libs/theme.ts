import { createTheme } from "@mui/material/styles";

let theme = createTheme({
  palette: {
    primary: {
      main: "#15CEDC",
    },
  },
});

theme = createTheme(theme, {
  typography: {
    h2: theme.unstable_sx({
      fontSize: { xs: "2rem", sm: "2.3rem", md: "3rem", lg: "4rem" },
    }),
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained",
        disableElevation: "true",
      },
      styleOverrides: {
        root: theme.unstable_sx({ color: "#ffffff" }),
      },
    },
  },
});

export { theme };
