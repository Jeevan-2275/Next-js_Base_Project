import { Container, Typography, List, ListItem, Link as MuiLink } from "@mui/material";

export const dynamic = "force-dynamic"; // SSR

async function getStory(id) {
  try {
    const res = await fetch(`https://hn.algolia.com/api/v1/items/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function StoryPage({ params }) {
  const story = await getStory(params.id);

  if (!story) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography variant="h6">Story not found or failed to load.</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h5" gutterBottom>
        <MuiLink href={story.url || "http://codinggita.com/"} target="_blank">
          {story.title}
        </MuiLink>
      </Typography>

      <Typography variant="body2" color="text.secondary" gutterBottom>
        {story.points} points • {story.author} •{" "}
        {new Date(story.created_at).toLocaleString()}
      </Typography>

      <Typography variant="h6" sx={{ mt: 3 }}>
        Top Comments
      </Typography>
      <List>
        {story.children.slice(0, 3).map((c) => (
          <ListItem key={c.id}>{c.text ? c.text.replace(/<[^>]+>/g, "") : ""}</ListItem>
        ))}
      </List>
    </Container>
  );
}
