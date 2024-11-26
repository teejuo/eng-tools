import React, { useState } from 'react';
import { TextField, Button, Typography, Box, MenuItem, Select, FormControl, InputLabel, Grid, RadioGroup, FormControlLabel, Radio } from '@mui/material';

const materials = [
  { name: 'Steel', density: 7850 },
  { name: 'Aluminum', density: 2700 },
  { name: 'Copper', density: 8960 },
  { name: 'PVC', density: 1380 }
];

const PipeMassCalculator = () => {
  const [diameter, setDiameter] = useState('');
  const [length, setLength] = useState('');
  const [thickness, setThickness] = useState('');
  const [density, setDensity] = useState(materials[0].density); // Default is Steel
  const [selectedMaterial, setSelectedMaterial] = useState(materials[0].name);
  const [unit, setUnit] = useState('mm'); // Default unit is mm
  const [measureType, setMeasureType] = useState('diameter'); // Default measure type is diameter
  const [mass, setMass] = useState(null);

  const calculateMass = () => {
    const conversionFactor = unit === 'mm' ? 0.001 : unit === 'cm' ? 0.01 : 1; // Convert to meters
    const size = parseFloat(diameter) * conversionFactor;
    const l = parseFloat(length) * conversionFactor;
    const t = parseFloat(thickness) * conversionFactor;
    const rho = parseFloat(density);

    if (isNaN(size) || isNaN(l) || isNaN(t) || isNaN(rho)) {
      alert('Please enter valid numbers.');
      return;
    }

    const d = measureType === 'radius' ? size * 2 : size;
    const volume = Math.PI * ((d / 2) ** 2 - ((d / 2) - t) ** 2) * l;
    const mass = volume * rho;

    setMass(mass.toFixed(2));
  };

  const handleMaterialChange = (event) => {
    const material = materials.find(mat => mat.name === event.target.value);
    setSelectedMaterial(material.name);
    setDensity(material.density);
  };

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <Typography variant="h6">Unit</Typography>
            <RadioGroup row value={unit} onChange={(e) => setUnit(e.target.value)}>
              <FormControlLabel value="mm" control={<Radio />} label="Millimeters (mm)" />
              <FormControlLabel value="cm" control={<Radio />} label="Centimeters (cm)" />
              <FormControlLabel value="m" control={<Radio />} label="Meters (m)" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <Typography variant="h6">Measure Type</Typography>
            <RadioGroup row value={measureType} onChange={(e) => setMeasureType(e.target.value)}>
              <FormControlLabel value="diameter" control={<Radio />} label="Diameter" />
              <FormControlLabel value="radius" control={<Radio />} label="Radius" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label={measureType === 'diameter' ? `Diameter (${unit})` : `Radius (${unit})`}
            variant="outlined"
            fullWidth
            value={diameter}
            onChange={(e) => setDiameter(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label={`Length (${unit})`}
            variant="outlined"
            fullWidth
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label={`Thickness (${unit})`}
            variant="outlined"
            fullWidth
            value={thickness}
            onChange={(e) => setThickness(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Material Density</InputLabel>
            <Select
              value={selectedMaterial}
              onChange={handleMaterialChange}
              label="Material Density"
            >
              {materials.map((material) => (
                <MenuItem key={material.name} value={material.name}>
                  {material.name} ({material.density} kg/m³)
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Box my={2}>
        <Button variant="contained" color="primary" onClick={calculateMass}>
          Calculate Mass
        </Button>
      </Box>
      {mass !== null && (
        <Typography variant="h6" component="div" mt={2}>
          Mass: {mass} kg
        </Typography>
      )}
    </Box>
  );
};

export default PipeMassCalculator;
