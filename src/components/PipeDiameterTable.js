import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const diameterData = [
  { dn: 10, mm: 17.2 },
  { dn: 15, mm: 21.3 },
  { dn: 20, mm: 26.9 },
  { dn: 25, mm: 33.7 },
  { dn: 32, mm: 42.4 },
  { dn: 40, mm: 48.3 },
  { dn: 50, mm: 60.3 },
  { dn: 65, mm: 76.1 },
  { dn: 80, mm: 88.9 },
  { dn: 100, mm: 114.3 },
  { dn: 125, mm: 139.7 },
  { dn: 150, mm: 168.3 },
  { dn: 200, mm: 219.1 },
];

const PipeDiameterTable = () => {
  return (
    <Paper>
      <Typography variant="h6" component="div" sx={{ padding: 2 }}>
        Pipe Diameters (DN to mm)
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>DN (Nominal Diameter)</TableCell>
              <TableCell>Diameter (mm)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {diameterData.map((row) => (
              <TableRow key={row.dn}>
                <TableCell>{row.dn}</TableCell>
                <TableCell>{row.mm}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default PipeDiameterTable;
