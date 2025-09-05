// components/FundList.js
import Grid from "@mui/material/Grid";
import FundSummaryCard from "./FundSummaryCard";

export default function FundList({ items }) {
  return (
    <Grid container spacing={2}>
      {items.map((s) => (
        <Grid item xs={12} sm={6} md={4} key={s.schemeCode}>
          <FundSummaryCard scheme={s} />
        </Grid>
      ))}
    </Grid>
  );
}
