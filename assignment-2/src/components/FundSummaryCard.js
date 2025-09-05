// components/FundSummaryCard.js
import { Card, CardContent, Typography, Link as MuiLink } from "@mui/material";
import Link from "next/link";

function formatDateISO(d) {
  const dt = new Date(d);
  const dd = String(dt.getDate()).padStart(2, "0");
  const mm = String(dt.getMonth() + 1).padStart(2, "0");
  const yyyy = dt.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
}

export default function FundSummaryCard({ scheme }) {
  // scheme: { scheme_name, latestNav, latestDate, schemeCode }
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">
          <MuiLink href={`/learn/fund/${scheme.schemeCode}`} component={Link}>
            {scheme.scheme_name || "—"}
          </MuiLink>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          NAV: {scheme.latestNav ?? "—"} • {scheme.latestDate ? formatDateISO(scheme.latestDate) : "—"}
        </Typography>
      </CardContent>
    </Card>
  );
}
