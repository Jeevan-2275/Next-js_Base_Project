// pages/market/compare.js
import { useState } from "react";
import { Container, Typography, Button } from "@mui/material";
import SearchBar from "../../components/SearchBar";
import CompareTable from "../../components/CompareTable";
import EmptyState from "../../components/EmptyState";

const MFAPI = "https://api.mfapi.in/mf";

function parseHistory(data) {
  return data.map(d => ({ date: d.date, nav: Number(d.nav) }));
}

function findNearest(history, targetISO) {
  const target = new Date(targetISO);
  let best = null, bestDiff = Infinity;
  history.forEach(h => {
    const d = new Date(h.date);
    const diff = Math.abs(d - target);
    if (diff <= 3 * 24 * 3600 * 1000 && diff < bestDiff) {
      best = h; bestDiff = diff;
    }
  });
  return best;
}

export default function ComparePage() {
  const [codes, setCodes] = useState([]);
  const [input, setInput] = useState("");
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleAdd(q) {
    if (!q || codes.length >= 3) return;
    setLoading(true);
    try {
      const res = await fetch(`${MFAPI}/${q}`);
      if (!res.ok) { setLoading(false); return; }
      const data = await res.json();
      if (!data || !data.data) { setLoading(false); return; }
      const history = parseHistory(data.data);
      const latest = history[0];
      const now = new Date();
      const back90 = new Date(now); back90.setMonth(now.getMonth() - 3);
      const back180 = new Date(now); back180.setMonth(now.getMonth() - 6);
      const p90 = findNearest(history, back90.toISOString());
      const p180 = findNearest(history, back180.toISOString());
      const r3 = p90 ? (((latest.nav - p90.nav) / p90.nav) * 100).toFixed(2) : null;
      const r6 = p180 ? (((latest.nav - p180.nav) / p180.nav) * 100).toFixed(2) : null;

      setCodes(prev => [...prev, q]);
      setRows(prev => {
        const map = {};
        map[q] = {
          latestNav: latest.nav,
          latestDate: latest.date,
          r3: r3 !== null ? `${r3}%` : "—",
          r6: r6 !== null ? `${r6}%` : "—",
        };
        return [...prev, map];
      });
    } catch (e) {
      // ignore
    }
    setLoading(false);
  }

  function buildTable() {
    if (!codes.length) return null;
    // aggregate rows expected by CompareTable
    const labels = [
      { label: "Latest NAV", key: "latestNav" },
      { label: "Latest Date", key: "latestDate" },
      { label: "Approx 3m Return", key: "r3" },
      { label: "Approx 6m Return", key: "r6" },
    ];

    // build values per code from rows array
    const valuesPerCode = {};
    rows.forEach(m => {
      const c = Object.keys(m)[0];
      valuesPerCode[c] = m[c];
    });

    const tableRows = labels.map(l => ({
      label: l.label,
      values: codes.reduce((acc, c) => {
        acc[c] = valuesPerCode[c] ? (valuesPerCode[c][l.key] ?? "—") : "—";
        return acc;
      }, {})
    }));

    return <CompareTable rows={tableRows} codes={codes} />;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Compare Funds</Typography>
      <Typography variant="body2" color="text.secondary">Add up to 3 scheme codes</Typography>

      <div style={{ marginTop: 8 }}>
        <input placeholder="Scheme code" value={input} onChange={(e) => setInput(e.target.value)} />
        <Button onClick={() => { handleAdd(input); setInput(""); }} variant="contained" sx={{ ml: 1 }} disabled={codes.length >= 3 || loading}>Add</Button>
      </div>

      {codes.length === 0 && <EmptyState title="No codes" hint="Add up to 3 scheme codes to compare." />}

      {buildTable()}

      <div style={{ marginTop: 8 }}>
        <Button onClick={() => { setCodes([]); setRows([]); }} variant="outlined">Clear</Button>
      </div>
    </Container>
  );
}
