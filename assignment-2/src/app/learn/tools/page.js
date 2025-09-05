// app/learn/tools/page.js
"use client";
import { useState } from "react";
import { Container, Typography } from "@mui/material";
import SearchBar from "../../../components/SearchBar";
import EmptyState from "../../../components/EmptyState";
import FundSummaryCard from "../../../components/FundSummaryCard";

export default function ToolsPage() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSearch(q) {
    if (!q) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch(`https://api.mfapi.in/mf/${q}`);
      if (!res.ok) {
        setResult({ error: true });
        setLoading(false);
        return;
      }
      const data = await res.json();
      if (!data || !data.data) {
        setResult({ error: true });
      } else {
        const latest = data.data[0];
        setResult({
          scheme_name: data.meta ? data.meta.scheme_name : data.schemeName,
          schemeCode: q,
          latestNav: latest ? latest.nav : null,
          latestDate: latest ? latest.date : null,
        });
      }
    } catch {
      setResult({ error: true });
    }
    setLoading(false);
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Tools</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        Enter a scheme code to fetch latest NAV.
      </Typography>

      <SearchBar onSearch={handleSearch} placeholder="Scheme code (e.g., 122639)" />

      {loading && <Typography>Loading…</Typography>}

      {!loading && result && result.error && (
        <EmptyState title="No result" hint="Invalid code or API error." />
      )}

      {!loading && result && !result.error && (
        <FundSummaryCard scheme={result} />
      )}
    </Container>
  );
}
