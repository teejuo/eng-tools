import React from 'react';
import { Container, Typography } from '@mui/material';
import PipeMassCalculator from '../components/PipeMassCalculator';

const PipeMassCalculatorPage = () => {
  return (
    <Container>
      <Typography variant="h4" component="div" gutterBottom>
        Pipe Mass Calculator
      </Typography>
      <PipeMassCalculator />
    </Container>
  );
};

export default PipeMassCalculatorPage;
