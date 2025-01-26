import Comment from "../components/Comment";
import React from "react";
import Navbar from "../components/Navbar";
import PostCard from "../components/PostCard";
function PostWithComment() {
  const exampleComment = {
    id: 1,
    postId: 123,
    userId: 456,
    parentCommentId: null,
    content: "This is a great post!",
    createdAt: new Date(),
    username: "john_doe",
    replies: [
      {
        id: 2,
        postId: 123,
        userId: 789,
        parentCommentId: 1,
        content: "Thanks! I appreciate it.",
        createdAt: new Date(),
        username: "jane_doe",
        replies: [],
        isUpvoted: false,
        isDownvoted: false,
        upvotes: 0,
        downvotes: 0,
      },
    ],
    isUpvoted: false,
    isDownvoted: false,
    upvotes: 5,
    downvotes: 1,
  };
  return (
    <div>
      <Comment {...exampleComment} />
    </div>
  );
}

export default PostWithComment;
