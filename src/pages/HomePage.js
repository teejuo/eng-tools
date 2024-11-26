import React from 'react';
import { Container, Grid, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <Container>
      <Typography variant="h4" component="div" gutterBottom>
        Welcome to Engineering Tools
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/mass-calculator"
            fullWidth
            sx={{ padding: 3 }}
          >
            Pipe Mass Calculator
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/diameter-table"
            fullWidth
            sx={{ padding: 3 }}
          >
            Pipe Diameters Table
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;
