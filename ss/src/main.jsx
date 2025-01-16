import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Maak een thema voor je Material UI applicatie
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Je kunt hier je eigen kleuren instellen
    },
    secondary: {
      main: '#dc004e', // Je kunt hier je eigen kleuren instellen
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);