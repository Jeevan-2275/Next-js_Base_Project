// pages/market/about.js
import { Container, Typography } from "@mui/material";

export async function getStaticProps() {
  return { props: {}, revalidate: false };
}

export default function AboutPage() {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>About: Routers & Rendering</Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        This app demonstrates both Next.js routers side-by-side:
      </Typography>
      <ul>
        <li>/learn/* uses the App Router (app/) with SSG/ISR/SSR/CSR.</li>
        <li>/market/* uses the Pages Router (pages/) with getStaticProps / getServerSideProps / client components.</li>
      </ul>
      <Typography variant="body2" color="text.secondary">
        Data comes exclusively from MFAPI (https://api.mfapi.in). NAVs may be delayed or missing on holidays; we pick nearest dates within ±3 days when computing returns.
      </Typography>
    </Container>
  );
}
