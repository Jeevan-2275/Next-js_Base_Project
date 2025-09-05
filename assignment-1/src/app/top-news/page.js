import { Container, Typography, List, ListItem, Link as MuiLink } from "@mui/material";
import Link from "next/link";

export const revalidate = 600; // ISR: refresh every 10 min

async function getTopNews() {
  const res = await fetch(
    "https://hn.algolia.com/api/v1/search?tags=story&hitsPerPage=10"
  );
  return res.json();
}

export default async function TopNewsPage() {
  const data = await getTopNews();

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Top 10 Tech News
      </Typography>

      <List>
        {data.hits.map((story) => (
          <ListItem key={story.objectID} sx={{ flexDirection: "column", alignItems: "flex-start" }}>
            <MuiLink
              href={story.url || "http://codinggita.com/"}
              target="_blank"
              variant="h6"
            >
              {story.title}
            </MuiLink>
            <Typography variant="body2" color="text.secondary">
              {story.points} points • {story.author} •{" "}
              {new Date(story.created_at).toLocaleString()}
            </Typography>
            <Link href={`/story/${story.objectID}`}>View Details</Link>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
