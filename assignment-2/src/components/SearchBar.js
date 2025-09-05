// components/SearchBar.js
"use client";
import { useState } from "react";
import { Box, TextField, Button } from "@mui/material";

export default function SearchBar({ onSearch, placeholder = "Enter scheme code" }) {
  const [q, setQ] = useState("");
  return (
    <Box sx={{ display: "flex", gap: 1, mb: 2, flexWrap: "wrap" }}>
      <TextField
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={placeholder}
        size="small"
      />
      <Button variant="contained" onClick={() => onSearch(q.trim())}>Fetch</Button>
    </Box>
  );
}
