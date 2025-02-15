import { useState } from "react";
import { CommentI } from "../types";
import { timeDiffFromNow } from "../utils/helper";
import {
  Box,
  Typography,
  Button,
  Paper,
  Divider,
  Avatar,
  Stack,
} from "@mui/material";
import VoteButtons from "./VoteButtons";
import CommentBox from "./CommentBox";

function Comment({
  id,
  postId,
  userId,
  parentCommentId,
  content,
  createdAt,
  username,
  replies,
  isUpvoted,
  isDownvoted,
  upvotes,
  downvotes,
}: CommentI) {
  const [isBoxOpen, setIsBoxOpen] = useState<boolean>(false);
  return (
    <Paper
      elevation={1}
      sx={{
        marginBottom: 2,
        padding: 2,
      }}
    >
      {/* Comment header */}
      <Box>
        <Box>
          <Typography variant="subtitle1" fontWeight="bold">
            {username}
          </Typography>
        </Box>
        <Typography variant="caption" color="text.secondary">
          {timeDiffFromNow(createdAt)}
        </Typography>
      </Box>

      <Typography variant="body1" sx={{ marginTop: 1, marginBottom: 2 }}>
        {content}
      </Typography>
      <VoteButtons
        initialDownvotes={downvotes}
        initialUpvotes={upvotes}
        initialIsUpvote={isUpvoted}
        initialIsDownvote={isDownvoted}
        setIsBoxOpen={setIsBoxOpen}
        isBoxOpen={isBoxOpen}
        id={id}
        voteType="comment"
      />
      {isBoxOpen && (
        <CommentBox
          setIsBoxOpen={setIsBoxOpen}
          postId={postId}
          parentCommentId={parentCommentId}
        />
      )}
      {/* Nested replies */}
      {replies !== null && replies.length > 0 && (
        <Box sx={{ marginLeft: 4, marginTop: 2 }}>
          {replies.map((reply) => (
            <Comment key={reply.id} {...reply} />
          ))}
        </Box>
      )}
    </Paper>
  );
}

export default Comment;
