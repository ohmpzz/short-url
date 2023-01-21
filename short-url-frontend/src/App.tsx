import { createTheme, ThemeProvider } from '@mui/material';
import { BrowserRouter as Router } from 'react-router-dom';

import { WrappedRoutes } from './pages/WrappedRoutes';

const theme = createTheme({
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: '1rem',
          backgroundColor: 'rgba(255, 255, 255, 1)',
          boxShadow: 'rgb(0 0 0 / 16%) 0 0 6px', // rgb(0 0 0 / 16%) 0 0 6px // 0px 8px 40px rgba(112, 144, 176, 0.2)
        },
      },
      defaultProps: {
        variant: 'outlined',
      },
    },
    MuiButton: {
      defaultProps: {
        variant: 'contained',
        disableElevation: true,
        color: 'primary',
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <WrappedRoutes />
      </Router>
    </ThemeProvider>
  );
}

export default App;
