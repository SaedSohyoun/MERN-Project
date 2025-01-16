import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Snackbar,
  Alert,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useProductStore } from "../store/product";

const ProductCard = ({ product }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const { deleteProduct, updateProduct } = useProductStore();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    setSnackbarMessage(message);
    setSnackbarSeverity(success ? "success" : "error");
    setOpenSnackbar(true);
  };

  const handleUpdateProduct = async () => {
    const { success, message } = await updateProduct(product._id, updatedProduct);
    setSnackbarMessage(success ? "Product updated successfully" : message);
    setSnackbarSeverity(success ? "success" : "error");
    setOpenSnackbar(true);
    setOpenDialog(false);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box
      sx={{
        maxWidth: 320,
        boxShadow: 3,
        borderRadius: 2,
        overflow: "hidden",
        transition: "transform 0.3s ease",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: 6,
        },
      }}
    >
      <img
        src={product.image}
        alt={product.name}
        style={{ width: "100%", height: 200, objectFit: "cover" }}
      />
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          {product.name}
        </Typography>
        <Typography variant="body1" color="textSecondary" mb={2}>
          ${product.price}
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton onClick={() => setOpenDialog(true)} color="primary">
            <Edit />
          </IconButton>
          <IconButton
            onClick={() => handleDeleteProduct(product._id)}
            color="error"
          >
            <Delete />
          </IconButton>
        </Box>
      </Box>

      {/* Dialog for updating product */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Update Product</DialogTitle>
        <DialogContent>
          <TextField
            label="Product Name"
            fullWidth
            margin="normal"
            value={updatedProduct.name}
            onChange={(e) =>
              setUpdatedProduct({ ...updatedProduct, name: e.target.value })
            }
          />
          <TextField
            label="Price"
            type="number"
            fullWidth
            margin="normal"
            value={updatedProduct.price}
            onChange={(e) =>
              setUpdatedProduct({ ...updatedProduct, price: e.target.value })
            }
          />
          <TextField
            label="Image URL"
            fullWidth
            margin="normal"
            value={updatedProduct.image}
            onChange={(e) =>
              setUpdatedProduct({ ...updatedProduct, image: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleUpdateProduct}
            color="primary"
            variant="contained"
          >
            Update
          </Button>
          <Button onClick={() => setOpenDialog(false)} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for feedback */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: isMobile ? "center" : "right",
        }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProductCard;