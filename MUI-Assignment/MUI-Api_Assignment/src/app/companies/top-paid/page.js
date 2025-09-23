"use client";

import { useEffect, useState } from "react";
import { Container, Grid, Card, CardHeader, CardContent, Chip, Typography } from "@mui/material";

export default function TopPaidCompanies() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetch("/api/companies/top-paid?limit=5")
      .then((res) => res.json())
      .then((data) => setCompanies(data.items));
  }, []);

  return (
    <Container>
      <Grid container spacing={3}>
        {companies.map((company, index) => (
          <Grid item xs={12} sm={6} md={4} key={company._id}>
            <Card>
              <CardHeader
                title={company.name}
                subheader={company.location}
                action={index === 0 && <Chip label="Top Paid" color="primary" />}
              />
              <CardContent>
                <Typography>Base Salary: {company.salaryBand?.base ?? "N/A"}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
