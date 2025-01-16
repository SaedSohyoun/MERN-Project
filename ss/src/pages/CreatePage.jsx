import { Box, Button, Container, Typography, TextField, useTheme, Snackbar, Alert } from '@mui/material';
import { useState } from 'react';
import { useProductStore } from '../store/product';

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    image: '',
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const { createProduct } = useProductStore();

  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);

    if (success) {
      setSnackbarSeverity('success');
      setSnackbarMessage(message);
    } else {
      setSnackbarSeverity('error');
      setSnackbarMessage(message);
    }

    setOpenSnackbar(true);
    setNewProduct({ name: '', price: '', image: '' });
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" alignItems="center" my={4}>
        <Typography variant="h4" component="h1" textAlign="center" gutterBottom>
          Create New Product
        </Typography>

        <Box
          sx={{
            width: '100%',
            backgroundColor: useTheme().palette.mode === 'dark' ? 'grey.800' : 'white',
            padding: 4,
            borderRadius: 2,
            boxShadow: 2,
          }}
        >
          <form>
            <TextField
              label="Product Name"
              variant="outlined"
              fullWidth
              margin="normal"
              name="name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />
            <TextField
              label="Price"
              variant="outlined"
              fullWidth
              margin="normal"
              type="number"
              name="price"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            />
            <TextField
              label="Image URL"
              variant="outlined"
              fullWidth
              margin="normal"
              name="image"
              value={newProduct.image}
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
            />

            <Button
              variant="contained"
              color="primary"
              onClick={handleAddProduct}
              fullWidth
              sx={{ mt: 2 }}
            >
              Add Product
            </Button>
          </form>
        </Box>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CreatePage;