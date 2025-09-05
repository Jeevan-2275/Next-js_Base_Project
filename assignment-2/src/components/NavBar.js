// components/NavBar.js
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "next/link";
import Box from "@mui/material/Box";

export default function NavBar() {
  return (
    <AppBar position="sticky" sx={{ mb: 2 }}>
      <Toolbar sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          MF Dashboard
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button component={Link} href="/learn" color="inherit">Learn</Button>
          <Button component={Link} href="/learn/funds" color="inherit">Funds</Button>
          <Button component={Link} href="/learn/tools" color="inherit">Tools</Button>
          <Button component={Link} href="/market" color="inherit">Market</Button>
          <Button component={Link} href="/market/compare" color="inherit">Compare</Button>
          <Button component={Link} href="/market/about" color="inherit">About</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
