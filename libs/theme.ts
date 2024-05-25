import { createTheme } from '@mui/material/styles';

let theme = createTheme({
  palette: {
    primary: {
      main: '#15CEDC',
    },
  },
  typography: {
  },
});

theme = createTheme(theme, {
  components: {
    MuiButton: {
      defaultProps: {
        variant: 'contained',
        disableElevation: 'true'
      },
      styleOverrides: {
        root: theme.unstable_sx({ color: '#ffffff' }),
      }
    }
  }
}
);

export { theme };
