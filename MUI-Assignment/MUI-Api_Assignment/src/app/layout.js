"use client";

import { useState, createContext, useContext } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { AppBar, Toolbar, Typography, IconButton, Box, Button } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Link from "next/link";

const ThemeToggleContext = createContext();
export const useThemeToggle = () => useContext(ThemeToggleContext);

export default function RootLayout({ children }) {
  const [mode, setMode] = useState("light");
  const toggleMode = () => setMode((prev) => (prev === "light" ? "dark" : "light"));

  const theme = createTheme({ palette: { mode } });

  return (
    <ThemeToggleContext.Provider value={toggleMode}>
      <html lang="en">
        <body>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar position="sticky">
              <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Company Explorer
                </Typography>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Button component={Link} href="/" color="inherit">Home</Button>
                  <Button component={Link} href="/companies/count" color="inherit">Count</Button>
                  <Button component={Link} href="/companies/top-paid" color="inherit">Top Paid</Button>
                  <Button component={Link} href="/companies/headcount-range" color="inherit">Headcount</Button>
                  <Button component={Link} href="/companies/by-skill/DSA" color="inherit">Skill</Button>
                  <Button component={Link} href="/companies/by-location/Hyderabad" color="inherit">Location</Button>
                  <Button component={Link} href="/companies/benefit/Insurance" color="inherit">Benefit</Button>
                  <IconButton color="inherit" onClick={toggleMode}>
                    {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
                  </IconButton>
                </Box>
              </Toolbar>
            </AppBar>
            <Box sx={{ p: 3 }}>{children}</Box>
          </ThemeProvider>
        </body>
      </html>
    </ThemeToggleContext.Provider>
  );
}
