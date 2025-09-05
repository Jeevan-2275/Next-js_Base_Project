// app/learn/page.js
import AppLinkCard from "../../components/AppLinkCard";
import { Container, Typography } from "@mui/material";

export default function LearnHome() {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>Learn: Routers & Rendering</Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        This section demonstrates App Router routes. These pages use SSG/ISR/SSR/CSR as specified.
      </Typography>

      <AppLinkCard
        title="Funds (ISR)"
        desc="Daily snapshot of curated funds (server-side ISR)."
        href="/learn/funds"
      />
      <AppLinkCard
        title="Tools (CSR)"
        desc="Client-side quick lookup by scheme code."
        href="/learn/tools"
      />
      <AppLinkCard
        title="Sample fund (SSR)"
        desc="Open a fund detail (server-side dynamic)."
        href="/learn/fund/122639"
      />
    </Container>
  );
}
