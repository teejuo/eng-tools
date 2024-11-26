import React from 'react';
import { Container, Typography } from '@mui/material';
import PipeDiameterTable from '../components/PipeDiameterTable';

const PipeDiameterTablePage = () => {
  return (
    <Container>
      <Typography variant="h4" component="div" gutterBottom>
        Pipe Diameters Table
      </Typography>
      <PipeDiameterTable />
    </Container>
  );
};

export default PipeDiameterTablePage;
