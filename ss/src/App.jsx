import React, { useState } from 'react';
import { Box, Button, CssBaseline, useTheme, ThemeProvider, createTheme } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import CreatePage from './pages/CreatePage';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';

function App() {
  // State om de modus (licht of donker) te beheren
  const [mode, setMode] = useState('light'); 

  // Maak een thema aan op basis van de huidige modus (licht of donker)
  const theme = createTheme({
    palette: {
      mode, // Kan 'light' of 'dark' zijn
      primary: {
        main: '#1976d2', // Je primaire kleur
      },
      secondary: {
        main: '#dc004e', // Je secundaire kleur
      },
      background: {
        default: mode === 'light' ? '#f5f5f5' : '#121212', // Achtergrondkleur afhankelijk van de modus
        paper: mode === 'light' ? '#ffffff' : '#333333',  // Achtergrondkleur van papier (bijvoorbeeld een kaart)
      },
      text: {
        primary: mode === 'light' ? '#000000' : '#ffffff', // Tekstkleur afhankelijk van de modus
        secondary: mode === 'light' ? '#757575' : '#b0b0b0', // Secundaire tekstkleur
      },
    },
  });

  // Functie om de modus om te schakelen tussen licht en donker
  const toggleMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Zorgt voor een consistente styling in de app */}
      <Box minHeight="100vh" bgcolor={theme.palette.background.default}>
        <Navbar />
        <Button 
          variant="contained" 
          color="primary" 
          onClick={toggleMode} 
          sx={{ position: 'fixed', top: 20, right: 20 }}
        >
          Toggle Mode
        </Button>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
        </Routes>
      </Box>
    </ThemeProvider>
  );
}

export default App;