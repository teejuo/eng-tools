import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, IconButton, Drawer, List, ListItem, ListItemText, Menu, MenuItem, Box, Link as MuiLink, useTheme, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import BuildIcon from '@mui/icons-material/Build';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PipeMassCalculator from './components/PipeMassCalculator';
import PipeDiameterTable from './components/PipeDiameterTable';
import HomePage from './pages/HomePage';

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Router basename="/eng-tools">
      <Box className="App" sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}
            >
              <HomeIcon sx={{ marginRight: 1 }} />
              Engineering Tools
            </Typography>
            {isMobile ? (
              <>
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={toggleDrawer(true)}
                >
                  <MenuIcon />
                </IconButton>
                <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                  <List>
                    <ListItem button component={Link} to="/mass-calculator" onClick={toggleDrawer(false)}>
                      <ListItemText primary="Pipe Mass Calculator" />
                    </ListItem>
                    <ListItem button component={Link} to="/diameter-table" onClick={toggleDrawer(false)}>
                      <ListItemText primary="Pipe Diameters Table" />
                    </ListItem>
                  </List>
                </Drawer>
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
                  <MenuItem component={Link} to="/mass-calculator" onClick={handleMenuClose} startIcon={<ListAltIcon />}>
                    Pipe Mass Calculator
                  </MenuItem>
                  <MenuItem component={Link} to="/diameter-table" onClick={handleMenuClose} startIcon={<ListAltIcon />}>
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

        <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 3, textAlign: 'center', marginTop: 'auto' }}>
          <Typography variant="body1">
            © {new Date().getFullYear()} Engineering Tools. All rights reserved.
          </Typography>
          <Typography variant="body2">
            <MuiLink href="/privacy-policy" color="inherit" sx={{ textDecoration: 'none' }}>Privacy Policy</MuiLink> | <MuiLink href="/terms-of-service" color="inherit" sx={{ textDecoration: 'none' }}>Terms of Service</MuiLink>
          </Typography>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
