// components/CompareTable.js
import { Table, TableBody, TableRow, TableCell, Typography } from "@mui/material";

export default function CompareTable({ rows, codes }) {
  // rows: [{ label, values: { code: value } }]
  return (
    <>
      <Table sx={{ mb: 2 }}>
        <TableBody>
          <TableRow>
            <TableCell></TableCell>
            {codes.map((c) => (
              <TableCell key={c}><Typography fontWeight="bold">{c}</Typography></TableCell>
            ))}
          </TableRow>
          {rows.map((r) => (
            <TableRow key={r.label}>
              <TableCell>{r.label}</TableCell>
              {codes.map((c) => (
                <TableCell key={c}>{r.values[c] ?? "—"}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
