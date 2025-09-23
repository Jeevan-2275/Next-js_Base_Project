"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Chip,
  Stack,
} from "@mui/material";

export default function HomePage() {
  const router = useRouter();

  const [skill, setSkill] = useState("");
  const [location, setLocation] = useState("");
  const [benefit, setBenefit] = useState("");
  const [minHeadcount, setMinHeadcount] = useState("");
  const [maxHeadcount, setMaxHeadcount] = useState("");

  const navigate = (path) => router.push(path);

  return (
    <Container>
      <Typography variant="h3" sx={{ mb: 4, textAlign: "center", fontWeight: "bold" }}>
        Welcome to Company Explorer
      </Typography>

      {/* Quick Navigation Cards */}
      <Grid container spacing={4}>
        {[
          { title: "Total Companies", desc: "See total companies", path: "/companies/count" },
          { title: "Top Paid Companies", desc: "View top paying companies", path: "/companies/top-paid" },
          { title: "Headcount Filter", desc: "Search by employee count", path: "/companies/headcount-range" },
        ].map((item) => (
          <Grid item xs={12} md={4} key={item.title}>
            <Card sx={{ cursor: "pointer" }} onClick={() => navigate(item.path)}>
              <CardContent>
                <Typography variant="h5">{item.title}</Typography>
                <Typography>{item.desc}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Search Section */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Search Companies
        </Typography>

        {/* Skill Search */}
        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
          <TextField label="Skill" placeholder="e.g., DSA" value={skill} onChange={(e) => setSkill(e.target.value)} />
          <Button variant="contained" onClick={() => skill && navigate(`/companies/by-skill/${skill}`)}>
            Search by Skill
          </Button>
        </Box>

        {/* Location Search */}
        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
          <TextField label="Location" placeholder="e.g., Hyderabad" value={location} onChange={(e) => setLocation(e.target.value)} />
          <Button variant="contained" onClick={() => location && navigate(`/companies/by-location/${location}`)}>
            Search by Location
          </Button>
        </Box>

        {/* Benefit Search */}
        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
          <TextField label="Benefit" placeholder="e.g., Insurance" value={benefit} onChange={(e) => setBenefit(e.target.value)} />
          <Button variant="contained" onClick={() => benefit && navigate(`/companies/benefit/${benefit}`)}>
            Search by Benefit
          </Button>
        </Box>

        {/* Headcount Search */}
        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
          <TextField label="Min Headcount" type="number" value={minHeadcount} onChange={(e) => setMinHeadcount(e.target.value)} />
          <TextField label="Max Headcount" type="number" value={maxHeadcount} onChange={(e) => setMaxHeadcount(e.target.value)} />
          <Button variant="contained" onClick={() => navigate(`/companies/headcount-range?min=${minHeadcount}&max=${maxHeadcount}`)}>
            Search
          </Button>
        </Box>
      </Box>

      {/* Quick Filters */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Quick Filters
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap">
          <Chip label="DSA" color="secondary" onClick={() => navigate("/companies/by-skill/DSA")} />
          <Chip label="Hyderabad" color="primary" onClick={() => navigate("/companies/by-location/Hyderabad")} />
          <Chip label="Insurance" color="success" onClick={() => navigate("/companies/benefit/Insurance")} />
          <Chip label="Top Paid" color="warning" onClick={() => navigate("/companies/top-paid")} />
        </Stack>
      </Box>
    </Container>
  );
}
