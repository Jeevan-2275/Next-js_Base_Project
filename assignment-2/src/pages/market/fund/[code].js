// pages/market/fund/[code].js
import React from "react";
import FundDetail from "../../../components/FundDetail";
import EmptyState from "../../../components/EmptyState";
import { Container } from "@mui/material";

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
      best = h;
      bestDiff = diff;
    }
  });
  return best;
}

export async function getServerSideProps(context) {
  const { code } = context.params;
  try {
    const res = await fetch(`${MFAPI}/${code}`);
    if (!res.ok) return { props: { error: true } };
    const data = await res.json();
    if (!data || !data.data) return { props: { error: true } };

    const history = parseHistory(data.data);
    const latest = history[0];

    // compute approx returns
    const now = new Date();
    const back30 = new Date(now); back30.setMonth(now.getMonth() - 1);
    const back90 = new Date(now); back90.setMonth(now.getMonth() - 3);
    const p30 = findNearest(history, back30.toISOString());
    const p90 = findNearest(history, back90.toISOString());

    const computeReturn = (latestNav, past) => {
      if (!latestNav || !past) return null;
      return Number((((latestNav - past.nav) / past.nav) * 100).toFixed(2));
    };

    const oneMonth = computeReturn(latest.nav, p30);
    const threeMonth = computeReturn(latest.nav, p90);

    return {
      props: {
        scheme: {
          scheme_name: data.meta ? data.meta.scheme_name : data.schemeName,
          schemeCode: code,
          latestNav: latest.nav,
          latestDate: latest.date,
        },
        history,
        returns: { oneMonth, threeMonth },
        notes: {
          oneMonthNote: p30 ? null : "No NAV near 1 month lookback within ±3 days.",
          threeMonthNote: p90 ? null : "No NAV near 3 month lookback within ±3 days.",
        }
      }
    };
  } catch (e) {
    return { props: { error: true } };
  }
}

export default function MarketFund({ scheme, history, returns, notes, error }) {
  if (error) {
    return <EmptyState title="No data" hint="Invalid code or API failure." />;
  }
  return (
    <Container>
      <FundDetail scheme={scheme} history={history} />
      <div style={{ marginTop: 16 }}>
        <strong>Trailing returns:</strong>
        <div>1m: {returns.oneMonth !== null ? `${returns.oneMonth}%` : "—"} {notes.oneMonthNote && <em>({notes.oneMonthNote})</em>}</div>
        <div>3m: {returns.threeMonth !== null ? `${returns.threeMonth}%` : "—"} {notes.threeMonthNote && <em>({notes.threeMonthNote})</em>}</div>
      </div>
    </Container>
  );
}
