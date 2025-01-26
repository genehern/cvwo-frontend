import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { postCardDataI } from "../types";
import VoteButtons from "./VoteButtons";
import { useState } from "react";
import CommentBox from "./CommentBox";
export default function PostCard({
  id,
  userId,
  username,
  title,
  content,
  createdAt,
  primaryTag,
  isUpvoted,
  isDownvoted,
  comments,
  upvotes,
  downvotes,
}: postCardDataI) {
  const [isBoxOpen, setIsBoxOpen] = useState<boolean>(false);
  return (
    <Card sx={{ width: "500px" }}>
      <CardContent>
        <Typography gutterBottom variant="h5">
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          <Stack direction="column" spacing={2}>
            <Stack direction="row" spacing={1}>
              {primaryTag}
            </Stack>
            <Typography variant="body1" component="div">
              {username} {createdAt.toLocaleString()}
            </Typography>
            <Typography variant="body2" component="div">
              {content}
            </Typography>
          </Stack>
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Read More</Button>
        <VoteButtons
          initialIsUpvote={isUpvoted}
          initialDownvotes={downvotes}
          initialUpvotes={upvotes}
          initialIsDownvote={isDownvoted}
          id={id}
          voteType="post"
          setIsBoxOpen={setIsBoxOpen}
          isBoxOpen={isBoxOpen}
        />
      </CardActions>
      {isBoxOpen ? (
        <CommentBox
          setIsBoxOpen={setIsBoxOpen}
          postId={id}
          parentCommentId={null}
        />
      ) : (
        <></>
      )}
    </Card>
  );
}
