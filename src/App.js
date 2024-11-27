import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, IconButton, Menu, MenuItem, Box, useTheme, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import BuildIcon from '@mui/icons-material/Build';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PipeMassCalculator from './components/PipeMassCalculator';
import PipeDiameterTable from './components/PipeDiameterTable';
import HomePage from './pages/HomePage';

function App() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  return (
    <Router basename="/eng-tools">
      <Box className="App" sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <AppBar position="static">
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            {/* Vasen osa: Engineering Tools */}
            <Button
              color="inherit"
              component={Link}
              to="/"
              startIcon={<HomeIcon />}
              sx={{
                textTransform: 'none',
                fontSize: '1.25rem',
                fontWeight: 'bold',
              }}
            >
              ENGINEERING TOOLS
            </Button>

            {/* Oikea osa: Tools-valikko ja mobiilivalikko */}
            {isMobile ? (
              <>
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={handleMobileMenuOpen}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  anchorEl={mobileMenuAnchor}
                  open={Boolean(mobileMenuAnchor)}
                  onClose={handleMobileMenuClose}
                >
                  <MenuItem
                    component={Link}
                    to="/mass-calculator"
                    onClick={handleMobileMenuClose}
                  >
                    Pipe Mass Calculator
                  </MenuItem>
                  <MenuItem
                    component={Link}
                    to="/diameter-table"
                    onClick={handleMobileMenuClose}
                  >
                    Pipe Diameters Table
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button
                  color="inherit"
                  onClick={handleMenuOpen}
                  startIcon={<BuildIcon />}
                >
                  Tools
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem
                    component={Link}
                    to="/mass-calculator"
                    onClick={handleMenuClose}
                    startIcon={<ListAltIcon />}
                  >
                    Pipe Mass Calculator
                  </MenuItem>
                  <MenuItem
                    component={Link}
                    to="/diameter-table"
                    onClick={handleMenuClose}
                    startIcon={<ListAltIcon />}
                  >
                    Pipe Diameters Table
                  </MenuItem>
                </Menu>
              </>
            )}
          </Toolbar>
        </AppBar>

        <Container sx={{ flexGrow: 1, marginTop: 3 }}>
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/mass-calculator" element={<PipeMassCalculator />} />
            <Route path="/diameter-table" element={<PipeDiameterTable />} />
          </Routes>
        </Container>

        <Box
          sx={{
            bgcolor: 'primary.main',
            color: 'white',
            py: 3,
            textAlign: 'center',
            marginTop: 'auto',
          }}
        >
          <Typography variant="body1">
            © {new Date().getFullYear()} Engineering Tools. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
