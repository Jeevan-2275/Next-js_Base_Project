"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Container, Typography, Grid, Card, CardContent, Chip } from "@mui/material";

export default function CompaniesBySkill() {
  const { skill } = useParams();
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetch(`/api/companies/by-skill/${skill}`)
      .then((res) => res.json())
      .then((data) => setCompanies(data.items));
  }, [skill]);

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Companies requiring <Chip label={skill} color="secondary" />
      </Typography>
      <Grid container spacing={3}>
        {companies.map((company) => (
          <Grid item xs={12} sm={6} md={4} key={company._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{company.name}</Typography>
                <Typography>Location: {company.location}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
