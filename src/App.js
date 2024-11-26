import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, IconButton, Drawer, List, ListItem, ListItemText, useTheme, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PipeMassCalculatorPage from './pages/PipeMassCalculatorPage';
import PipeDiameterTablePage from './pages/PipeDiameterTablePage';
import HomePage from './pages/HomePage';

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  return (
    <Router>
      <div className="App">
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}
            >
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
                  component={Link}
                  to="/mass-calculator"
                >
                  Pipe Mass Calculator
                </Button>
                <Button
                  color="inherit"
                  component={Link}
                  to="/diameter-table"
                >
                  Pipe Diameters Table
                </Button>
              </>
            )}
          </Toolbar>
        </AppBar>
        <Container sx={{ marginTop: 3 }}>
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/mass-calculator" element={<PipeMassCalculatorPage />} />
            <Route path="/diameter-table" element={<PipeDiameterTablePage />} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App;
