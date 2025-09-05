// components/EmptyState.js
import { Typography, Box } from "@mui/material";

export default function EmptyState({ title = "No data", hint }) {
  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h6">{title}</Typography>
      {hint && <Typography variant="body2" color="text.secondary">{hint}</Typography>}
    </Box>
  );
}
