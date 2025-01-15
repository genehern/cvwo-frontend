import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { postCardDataI } from "../types";

export default function PostCard({
  title,
  primary_tag,
  content,
  username,
  date,
}: postCardDataI) {
  return (
    <Card sx={{ width: "500px" }}>
      <CardContent>
        <Typography gutterBottom variant="h5">
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          <Stack direction="column" spacing={2}>
            <Stack direction="row" spacing={1}>
              {primary_tag}
            </Stack>
            <Typography variant="body1" component="div">
              {username} {date}
            </Typography>
            <Typography variant="body2" component="div">
              {content}
            </Typography>
          </Stack>
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Read More</Button>
      </CardActions>
    </Card>
  );
}
