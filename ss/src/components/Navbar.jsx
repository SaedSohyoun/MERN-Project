import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Box, Typography, IconButton } from "@mui/material";
import { PlusSquare as PlusSquareIcon } from "@mui/icons-material";
import { Moon } from "@mui/icons-material";
import { Sun } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

const Navbar = ({ toggleColorMode }) => {
  const theme = useTheme(); // Krijg het huidige thema
  const isDarkMode = theme.palette.mode === "dark"; // Controleer of de huidige modus donker is

  return (
    <Container maxWidth="lg" sx={{ px: 4 }}>
      <Box
        sx={{
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            textTransform: "uppercase",
            textAlign: "center",
            background: "linear-gradient(to right, cyan, blue)",
            backgroundClip: "text",
            color: "transparent",
            fontSize: { xs: "22px", sm: "28px" },
          }}
        >
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            Product Store 🛒
          </Link>
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Link to="/create">
            <Button>
              <PlusSquareIcon fontSize="large" />
            </Button>
          </Link>
          <IconButton onClick={toggleColorMode} color="inherit">
            {isDarkMode ? <Moon /> : <Sun />}
          </IconButton>
        </Box>
      </Box>
    </Container>
  );
};

export default Navbar;