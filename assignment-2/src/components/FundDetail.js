// components/FundDetail.js
import { Typography, Table, TableBody, TableRow, TableCell } from "@mui/material";

function formatDateISO(d) {
  const dt = new Date(d);
  const dd = String(dt.getDate()).padStart(2, "0");
  const mm = String(dt.getMonth() + 1).padStart(2, "0");
  const yyyy = dt.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
}

export default function FundDetail({ scheme, history }) {
  // scheme: { scheme_name, schemeCode, latestNav, latestDate }
  // history: array [{date, nav}] most recent first
  return (
    <>
      <Typography variant="h5" gutterBottom>{scheme.scheme_name}</Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Latest NAV: {scheme.latestNav} • {scheme.latestDate ? formatDateISO(scheme.latestDate) : ""}
      </Typography>

      <Typography variant="h6" sx={{ mt: 2 }}>Recent NAVs</Typography>
      <Table>
        <TableBody>
          {history.slice(0, 30).map((h) => (
            <TableRow key={h.date}>
              <TableCell>{formatDateISO(h.date)}</TableCell>
              <TableCell>{h.nav}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
