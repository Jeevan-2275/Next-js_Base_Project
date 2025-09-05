// app/learn/fund/[code]/page.js
import FundDetail from "../../../../components/FundDetail";
import EmptyState from "../../../../components/EmptyState";
import { Typography, Container } from "@mui/material";

export const dynamic = "force-dynamic";

const MFAPI = "https://api.mfapi.in/mf";

async function fetchFull(code) {
  try {
    const res = await fetch(`${MFAPI}/${code}`, { cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();
    if (!data || !data.data) return null;
    // Ensure most recent first: API often gives newest-first; if not, sort.
    const history = data.data.map((d) => ({ date: d.date, nav: Number(d.nav) }));
    // try parse dates to JS dates by using as string, keep as date string for table.
    return {
      meta: data.meta || { scheme_name: data.schemeName || "Unknown" },
      history,
    };
  } catch {
    return null;
  }
}

export default async function FundPage({ params }) {
  const { code } = params;
  const payload = await fetchFull(code);

  if (!payload) {
    return (
      <Container>
        <EmptyState title="Fund not found" hint={`No data for code ${code}. Try another code.`} />
      </Container>
    );
  }

  // latest is first element
  const latest = payload.history[0] || null;
  const scheme = {
    scheme_name: payload.meta.scheme_name,
    schemeCode: code,
    latestNav: latest ? latest.nav : null,
    latestDate: latest ? latest.date : null,
  };

  return (
    <Container>
      <FundDetail scheme={scheme} history={payload.history} />
    </Container>
  );
}
