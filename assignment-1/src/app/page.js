"use client";

import { useState } from "react";
import {
  Container,
  Typography,
  Button,
  TextField,
  List,
  ListItem,
  CircularProgress,
} from "@mui/material";
import Link from "next/link";

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    setSearched(true);
    setResults([]);
    try {
      const res = await fetch(
        `https://hn.algolia.com/api/v1/search?query=${query}&tags=story&hitsPerPage=5`
      );
      const data = await res.json();
      setResults(data.hits);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Mini Tech News
      </Typography>

      {/* Static intro (SSG) */}
      <Typography variant="body1" gutterBottom>
        <strong>CSR:</strong> Rendered in the browser using JavaScript.
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>SSR:</strong> HTML generated on the server for every request.
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>SSG:</strong> Pre-rendered at build time for fast static pages.
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>ISR:</strong> Static pages revalidated periodically for freshness.
      </Typography>

      {/* Links */}
      <Button component={Link} href="/top-news" variant="contained" sx={{ mt: 2, mr: 2 }}>
        Top News
      </Button>
      <Button
        component={Link}
        href="/story/38600909"
        variant="outlined"
        sx={{ mt: 2 }}
      >
        Sample Story
      </Button>

      {/* CSR Search Widget */}
      <Typography variant="h6" sx={{ mt: 4 }}>
        Search Hacker News (CSR)
      </Typography>
      <TextField
        fullWidth
        placeholder="Enter keyword..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{ my: 2 }}
      />
      <Button variant="contained" onClick={handleSearch}>
        Search
      </Button>

      {loading && (
        <Typography sx={{ mt: 2 }}>
          <CircularProgress size={20} sx={{ mr: 1 }} /> Searching…
        </Typography>
      )}

      {!loading && searched && results.length === 0 && (
        <Typography sx={{ mt: 2 }}>No results.</Typography>
      )}

      <List>
        {results.map((r) => (
          <ListItem key={r.objectID}>
            <Link href={r.url || "http://codinggita.com/"} target="_blank">
              {r.title}
            </Link>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
