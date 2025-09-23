"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Container, Typography, Grid, Card, CardContent, Chip } from "@mui/material";

export default function CompaniesByLocation() {
  const { location } = useParams();
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetch(`/api/companies/by-location/${location}`)
      .then((res) => res.json())
      .then((data) => setCompanies(data.items));
  }, [location]);

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Companies in <Chip label={location} color="primary" />
      </Typography>
      <Grid container spacing={3}>
        {companies.length === 0 ? (
          <Typography>No companies found in {location}</Typography>
        ) : (
          companies.map((company) => (
            <Grid item xs={12} sm={6} md={4} key={company._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{company.name}</Typography>
                  <Typography>Headcount: {company.headcount ?? "N/A"}</Typography>
                  <Typography>Skills: {company.skills?.join(", ") ?? "N/A"}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
}
