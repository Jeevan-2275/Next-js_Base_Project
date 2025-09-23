"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  TextField,
  Button,
} from "@mui/material";

export default function CompaniesByHeadcountRange() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [min, setMin] = useState(searchParams.get("min") || "");
  const [max, setMax] = useState(searchParams.get("max") || "");
  const [companies, setCompanies] = useState([]);

  const fetchCompanies = () => {
    fetch(`/api/companies/headcount-range?min=${min}&max=${max}`)
      .then((res) => res.json())
      .then((data) => setCompanies(data.items));
  };

  useEffect(() => {
    if (min || max) fetchCompanies();
  }, []);

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Search by Headcount Range
      </Typography>

      {/* Search Filters */}
      <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
        <TextField
          label="Min"
          type="number"
          value={min}
          onChange={(e) => setMin(e.target.value)}
        />
        <TextField
          label="Max"
          type="number"
          value={max}
          onChange={(e) => setMax(e.target.value)}
        />
        <Button variant="contained" onClick={fetchCompanies}>
          Search
        </Button>
      </Box>

      {/* Results */}
      <Grid container spacing={3}>
        {companies.length === 0 ? (
          <Typography>No companies found in this range.</Typography>
        ) : (
          companies.map((company) => (
            <Grid item xs={12} sm={6} md={4} key={company._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{company.name}</Typography>
                  <Typography>Headcount: {company.headcount}</Typography>
                  <Typography>Location: {company.location}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
}
