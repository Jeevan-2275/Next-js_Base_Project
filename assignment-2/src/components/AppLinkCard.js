// components/AppLinkCard.js
import { Card, CardContent, Typography, Button } from "@mui/material";
import Link from "next/link";

export default function AppLinkCard({ title, desc, href }) {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {desc}
        </Typography>
        <Button component={Link} href={href} variant="contained" size="small">
          Open
        </Button>
      </CardContent>
    </Card>
  );
}
