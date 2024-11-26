import React, { useState } from 'react';
import { TextField, Button, ButtonGroup, Typography, Box, MenuItem, Select, FormControl, InputLabel, Grid, Card, CardContent, Paper } from '@mui/material';

const materials = [
  { name: 'Steel', density: 7850 }, // kg/m³
  { name: 'Aluminum', density: 2700 },
  { name: 'Copper', density: 8960 },
  { name: 'PVC', density: 1380 },
];

const dnToDiameter = {
  DN10: 17.2,
  DN15: 21.3,
  DN20: 26.9,
  DN25: 33.7,
  DN32: 42.4,
  DN40: 48.3,
  DN50: 60.3,
  DN65: 76.1,
  DN80: 88.9,
  DN100: 114.3,
  DN125: 139.7,
  DN150: 168.3,
};

const convertToMillimeters = (value, unit) => {
  switch (unit) {
    case 'mm': return value;
    case 'cm': return value * 10;
    case 'm': return value * 1000;
    default: return value;
  }
};

const convertFromMillimeters = (value, unit) => {
  switch (unit) {
    case 'mm': return value;
    case 'cm': return value / 10;
    case 'm': return value / 1000;
    default: return value;
  }
};

const PipeMassCalculator = () => {
  const [diameter, setDiameter] = useState('');
  const [radius, setRadius] = useState('');
  const [length, setLength] = useState('');
  const [thickness, setThickness] = useState('');
  const [density, setDensity] = useState(materials[0].density);
  const [selectedMaterial, setSelectedMaterial] = useState(materials[0].name);
  const [unit, setUnit] = useState('mm');
  const [measureType, setMeasureType] = useState('diameter');
  const [mass, setMass] = useState(null);
  const [selectedDN, setSelectedDN] = useState('');
  const [error, setError] = useState(null);

  const calculateMass = () => {
    const size = parseFloat(measureType === 'radius' ? radius * 2 : diameter);
    const sizeInMeters = convertToMillimeters(size, unit) / 1000; // Millimeters to meters
    const l = convertToMillimeters(parseFloat(length), unit) / 1000; // Millimeters to meters
    const t = convertToMillimeters(parseFloat(thickness), unit) / 1000; // Millimeters to meters
    const rho = parseFloat(density); // Density in kg/m³

    if ([sizeInMeters, l, t, rho].some(isNaN)) {
      setError('Please enter valid numerical values.');
      return;
    }
    setError(null);

    const d = sizeInMeters; // Diameter in meters
    const volume = Math.PI * ((d / 2) ** 2 - ((d / 2) - t) ** 2) * l; // Volume in m³
    const calculatedMass = volume * rho; // Mass in kg

    setMass(calculatedMass.toFixed(2)); // Set mass with 2 decimal precision
  };

  const handleMaterialChange = (event) => {
    const material = materials.find(mat => mat.name === event.target.value);
    setSelectedMaterial(material.name);
    setDensity(material.density);
  };

  const handleDNChange = (event) => {
    const dnValue = event.target.value;
    const diameterInCurrentUnit = convertFromMillimeters(dnToDiameter[dnValue], unit);
    setSelectedDN(dnValue);
    setDiameter(diameterInCurrentUnit.toString());
    setRadius((diameterInCurrentUnit / 2).toString());
  };

  const handleDiameterChange = (event) => {
    const diameterValue = parseFloat(event.target.value);
    if (!isNaN(diameterValue)) {
      setDiameter(diameterValue.toString());
      setRadius((diameterValue / 2).toString());
    } else {
      setDiameter('');
      setRadius('');
    }
  };
  
  const handleRadiusChange = (event) => {
    const radiusValue = parseFloat(event.target.value);
    if (!isNaN(radiusValue)) {
      setRadius(radiusValue.toString());
      setDiameter((radiusValue * 2).toString());
    } else {
      setRadius('');
      setDiameter('');
    }
  };

  const handleUnitChange = (newUnit) => {
    const diameterInMillimeters = convertToMillimeters(parseFloat(diameter), unit);
    const convertedDiameter = convertFromMillimeters(diameterInMillimeters, newUnit);
  
    const lengthInMillimeters = convertToMillimeters(parseFloat(length), unit);
    const convertedLength = convertFromMillimeters(lengthInMillimeters, newUnit);
  
    const thicknessInMillimeters = convertToMillimeters(parseFloat(thickness), unit);
    const convertedThickness = convertFromMillimeters(thicknessInMillimeters, newUnit);
  
    setUnit(newUnit);
    setDiameter(convertedDiameter.toString());
    setRadius((convertedDiameter / 2).toString());
    setLength(convertedLength.toString());
    setThickness(convertedThickness.toString());
  };

  const handleMeasureTypeChange = (type) => {
    if (type === 'radius' && measureType === 'diameter') {
      // Vaihdetaan Diameter -> Radius
      const currentDiameter = parseFloat(diameter);
      if (!isNaN(currentDiameter)) {
        setRadius((currentDiameter / 2).toString());
      }
    } else if (type === 'diameter' && measureType === 'radius') {
      // Vaihdetaan Radius -> Diameter
      const currentRadius = parseFloat(radius);
      if (!isNaN(currentRadius)) {
        setDiameter((currentRadius * 2).toString());
      }
    }
    setMeasureType(type); // Päivitetään mittatyyppi
  };
  

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <ButtonGroup fullWidth variant="contained">
                <Button color={unit === 'mm' ? 'primary' : 'default'} onClick={() => handleUnitChange('mm')}>Millimeters</Button>
                <Button color={unit === 'cm' ? 'primary' : 'default'} onClick={() => handleUnitChange('cm')}>Centimeters</Button>
                <Button color={unit === 'm' ? 'primary' : 'default'} onClick={() => handleUnitChange('m')}>Meters</Button>
              </ButtonGroup>
            </Grid>
            <Grid item xs={12}>
  <ButtonGroup fullWidth variant="contained">
    <Button
      color={measureType === 'diameter' ? 'primary' : 'default'}
      onClick={() => handleMeasureTypeChange('diameter')}
    >
      Diameter
    </Button>
    <Button
      color={measureType === 'radius' ? 'primary' : 'default'}
      onClick={() => handleMeasureTypeChange('radius')}
    >
      Radius
    </Button>
  </ButtonGroup>
</Grid>


            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>DN Size</InputLabel>
                <Select
                  value={selectedDN}
                  onChange={handleDNChange}
                  label="DN Size"
                >
                  {Object.keys(dnToDiameter).map((dn) => (
                    <MenuItem key={dn} value={dn}>
                      {dn}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField
    label={measureType === 'diameter' ? `Diameter (${unit})` : `Radius (${unit})`}
    variant="outlined"
    fullWidth
    value={measureType === 'diameter' ? diameter : radius}
    onChange={measureType === 'diameter' ? handleDiameterChange : handleRadiusChange}
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
            <Card sx={{ marginTop: 3 }}>
              <CardContent>
                <Typography variant="h6" component="div">
                  Calculation Result
                </Typography>
                <Typography variant="body1" component="div">
                  The calculated mass of the pipe is: <strong>{mass} kg</strong>
                </Typography>
              </CardContent>
            </Card>
          )}
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper elevation={3} sx={{ padding: 2 }}>
          <Typography variant="h6">Pipe Dimensions</Typography>
          <img src={`${process.env.PUBLIC_URL}/images/pipe-dimensions.png`} alt="Pipe Dimensions" style={{ width: '100%', height: 'auto' }} />
          <Typography variant="body1">
            The image on the right illustrates the pipe dimensions: diameter, length, and wall thickness.
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default PipeMassCalculator;
