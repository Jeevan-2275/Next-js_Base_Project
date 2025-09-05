// pages/market/index.js
import React from "react";
import FundList from "../../components/FundList";
import EmptyState from "../../components/EmptyState";
import { Container, Typography } from "@mui/material";

const MFAPI = "https://api.mfapi.in/mf";

function parseHistory(data) {
  return data.map(d => ({ date: d.date, nav: Number(d.nav) }));
}

// helper: find nav nearest to target date within ±3 days
function findNearest(history, targetDateISO) {
  const target = new Date(targetDateISO);
  let best = null;
  let bestDiff = Infinity;
  history.forEach((h) => {
    const d = new Date(h.date);
    const diff = Math.abs(d - target);
    if (diff <= 3 * 24 * 3600 * 1000 && diff < bestDiff) {
      best = h;
      bestDiff = diff;
    }
  });
  return best;
}

export async function getStaticProps() {
  const codesStr = process.env.NEXT_PUBLIC_MARKET_LIST || "122639,120492,125497,118825,125354";
  const codes = codesStr.split(",").map(s => s.trim()).slice(0, 5);

  const now = new Date();
  const back30 = new Date(now);
  back30.setDate(now.getDate() - 30);
  const back30ISO = back30.toISOString();

  const fetches = await Promise.all(codes.map(async (code) => {
    try {
      const res = await fetch(`${MFAPI}/${code}`);
      if (!res.ok) return null;
      const data = await res.json();
      if (!data || !data.data) return null;
      const history = parseHistory(data.data);
      const latest = history[0];
      const past = findNearest(history, back30ISO);
      let oneMonthReturn = null;
      if (latest && past) {
        oneMonthReturn = ((latest.nav - past.nav) / past.nav) * 100;
      }
      return {
        scheme_name: data.meta ? data.meta.scheme_name : data.schemeName,
        schemeCode: code,
        latestNav: latest ? latest.nav : null,
        latestDate: latest ? latest.date : null,
        oneMonthReturn: oneMonthReturn !== null ? Number(oneMonthReturn.toFixed(2)) : null,
      };
    } catch { return null; }
  }));

  const items = fetches.filter(Boolean);

  return {
    props: { items },
    revalidate: 3600, // 1 hour
  };
}

export default function MarketPage({ items }) {
  if (!items || !items.length) {
    return <EmptyState title="No market data" hint="API unavailable." />;
  }
  return (
    <Container>
      <Typography variant="h4" gutterBottom>Market Snapshot</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        Revalidated hourly.
      </Typography>

      <FundList items={items.map(i => ({
        ...i,
        // show oneMonthReturn included in latestDate line via FundSummaryCard; for simplicity we retain same component
      }))} />
      {/* Show computed returns in simple list below */}
      {items.map(it => (
        <div key={it.schemeCode}>
          <Typography variant="body2">
            {it.scheme_name}: 1m return: {it.oneMonthReturn !== null ? `${it.oneMonthReturn}%` : "—"}
          </Typography>
        </div>
      ))}
    </Container>
  );
}
