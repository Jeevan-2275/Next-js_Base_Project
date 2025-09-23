"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Stack,
} from "@mui/material";

export default function CompaniesByBenefit() {
  const { benefit } = useParams();
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetch(`/api/companies/benefit/${benefit}`)
      .then((res) => res.json())
      .then((data) => setCompanies(data.items));
  }, [benefit]);

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Companies offering <Chip label={benefit} color="success" />
      </Typography>

      <Grid container spacing={3}>
        {companies.length === 0 ? (
          <Typography>No companies found with this benefit.</Typography>
        ) : (
          companies.map((company) => (
            <Grid item xs={12} sm={6} md={4} key={company._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{company.name}</Typography>
                  <Typography>Location: {company.location}</Typography>
                  <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: "wrap" }}>
                    {company.benefits?.map((b) => (
                      <Chip key={b} label={b} size="small" />
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
}
