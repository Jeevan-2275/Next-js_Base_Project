"use client";

import { useEffect, useState } from "react";
import { Container, Paper, Typography, CircularProgress } from "@mui/material";

export default function CompaniesCount() {
  const [count, setCount] = useState(null);

  useEffect(() => {
    fetch("/api/companies/count")
      .then((res) => res.json())
      .then((data) => setCount(data.total));
  }, []);

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
        {count === null ? (
          <CircularProgress />
        ) : (
          <Typography variant="h5">
            We have <b>{count}</b> companies in our database.
          </Typography>
        )}
      </Paper>
    </Container>
  );
}
