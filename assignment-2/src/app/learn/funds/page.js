// app/learn/funds/page.js
import FundList from "../../../components/FundList";
import EmptyState from "../../../components/EmptyState";
import { Container, Typography } from "@mui/material";

export const revalidate = 86400; // 1 day

const MFAPI = "https://api.mfapi.in/mf";

async function fetchScheme(code) {
  const res = await fetch(`${MFAPI}/${code}`);
  if (!res.ok) return null;
  const data = await res.json();
  if (!data || !data.data) return null;
  const latest = data.data[0];
  return {
    scheme_name: data.meta ? data.meta.scheme_name : data.schemeName || data.scheme_name,
    schemeCode: code,
    latestNav: latest ? latest.nav : null,
    latestDate: latest ? latest.date : null,
  };
}

export default async function LearnFunds() {
  const codesStr = process.env.NEXT_PUBLIC_CURATED_LEARN || "122639,120492,125497,118825,125354,118955,120166,120586,118778,130503";
  const codes = codesStr.split(",").map(s => s.trim()).filter(Boolean).slice(0, 10);

  const arr = await Promise.all(codes.map((c) => fetchScheme(c)));
  const items = arr.filter(Boolean);

  if (!items.length) {
    return <EmptyState title="No funds available" hint="API may be down or codes are invalid." />;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Curated Funds</Typography>
      <FundList items={items} />
    </Container>
  );
}
