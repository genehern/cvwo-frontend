export interface CommentI {
  id: number;
  postId: number;
  userId: number;
  parentCommentId: number | null; // Use `null` for optional/pointer fields
  content: string;
  createdAt: Date;
  username: string;
  replies: CommentI[]; // Recursive type for nested comments
  isUpvoted: boolean;
  isDownvoted: boolean;
  upvotes: number;
  downvotes: number;
}

export interface postCardDataI {
  id: number;
  userId: number;
  username: string;
  title: string;
  content: string;
  createdAt: Date;
  primaryTag: string;
  isUpvoted: boolean;
  isDownvoted: boolean;
  comments: CommentI[]; // Array of CommentDTO
  upvotes: number;
  downvotes: number;
  enableReadMore?: boolean;
}
