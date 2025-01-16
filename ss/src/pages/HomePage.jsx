import React, { useEffect } from 'react';
import { Container, Grid, Typography, Box, Link } from '@mui/material';
import { useProductStore } from '../store/product';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  console.log("products", products);

  return (
    <Container maxWidth="xl" sx={{ py: 12 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', spacing: 8 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{
            background: 'linear-gradient(to right, cyan, blue)',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            textAlign: 'center',
          }}
        >
          Current Products 🚀
        </Typography>

        <Grid
          columns={{ xs: 1, sm: 2, md: 3 }}
          spacing={5}
          sx={{ width: '100%' }}
        >
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </Grid>

        {products.length === 0 && (
          <Typography variant="h6" color="text.secondary" textAlign="center">
            No products found 😢{' '}
            <Link href="/create" color="primary" sx={{ textDecoration: 'underline' }}>
              Create a product
            </Link>
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default HomePage;