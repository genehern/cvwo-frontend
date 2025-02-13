import React, { useReducer } from "react";
import { IconButton, Typography, Box, Tooltip } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ThumbUp";
import ArrowDownwardIcon from "@mui/icons-material/ThumbDown";
import CommentIcon from "@mui/icons-material/Comment";
import { postPostVote, postCommentVote } from "../utils/api";
interface VoteButtonsProps {
  initialUpvotes: number;
  initialDownvotes: number;
  initialIsUpvote: boolean;
  initialIsDownvote: boolean;
  setIsBoxOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isBoxOpen: boolean;
  id: number;
  voteType: string;
}

interface VoteState {
  upvotes: number;
  downvotes: number;
  isUpvote: boolean;
  isDownVote: boolean;
}

type VoteAction = { type: "UPVOTE" } | { type: "DOWNVOTE" };

const voteReducer = (state: VoteState, action: VoteAction): VoteState => {
  switch (action.type) {
    case "UPVOTE":
      return {
        ...state,
        isUpvote: !state.isUpvote,
        upvotes: state.isUpvote ? state.upvotes - 1 : state.upvotes + 1,
        isDownVote: false,
        downvotes: state.isDownVote ? state.downvotes - 1 : state.downvotes,
      };
    case "DOWNVOTE":
      return {
        ...state,
        isDownVote: !state.isDownVote,
        downvotes: state.isDownVote ? state.downvotes - 1 : state.downvotes + 1,
        isUpvote: false,
        upvotes: state.isUpvote ? state.upvotes - 1 : state.upvotes,
      };
    default:
      return state;
  }
};

const VoteButtons: React.FC<VoteButtonsProps> = ({
  initialUpvotes = 0,
  initialDownvotes = 0,
  initialIsUpvote,
  initialIsDownvote,
  setIsBoxOpen,
  isBoxOpen,
  id,
  voteType,
}) => {
  const initialState: VoteState = {
    upvotes: initialUpvotes,
    downvotes: initialDownvotes,
    isUpvote: initialIsUpvote,
    isDownVote: initialIsDownvote,
  };

  const [state, dispatch] = useReducer(voteReducer, initialState);

  const handleUpvote = (postOrComment: string) => {
    if (isUpvote) {
      return;
    }
    if (localStorage.getItem("username") == null) {
      alert("Log in to upvote!");
      return;
    }
    try {
      if (postOrComment === "post") {
        postPostVote(id);
      } else {
        postCommentVote(id, false);
      }
      dispatch({ type: "UPVOTE" });
    } catch {
      window.alert("Failed");
    }
  };

  const handleDownvote = (postOrComment: string) => {
    try {
      if (isDownVote) {
        return;
      }
      if (localStorage.getItem("username") == null) {
        alert("Log in to upvote!");
        return;
      }
      if (postOrComment === "post") {
        postPostVote(id);
      } else {
        postCommentVote(id, false);
      }
      dispatch({ type: "DOWNVOTE" });
    } catch {
      window.alert("Failed");
    }
  };
  const { upvotes, downvotes, isUpvote, isDownVote } = state;

  return (
    <Box display="flex" alignItems="center" justifyContent="start" gap={1}>
      <Box display="flex" alignItems="center" justifyContent="start" gap={0}>
        {/* Upvote Button */}
        <Box display="flex" flexDirection="column" alignItems="center">
          <Tooltip title="Upvote">
            <IconButton
              onClick={() => handleUpvote(voteType)}
              sx={{
                color: isUpvote ? "#003366" : "#66a3ff",
                backgroundColor: isUpvote ? "#e6f0ff" : "transparent",
                "&:hover": {
                  backgroundColor: isUpvote ? "#cce0ff" : "#f5f5f5",
                },
              }}
            >
              <ArrowUpwardIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Tooltip>
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            {upvotes}
          </Typography>
        </Box>

        {/* Downvote Button */}
        <Box display="flex" flexDirection="column" alignItems="center">
          <Tooltip title="Downvote">
            <IconButton
              onClick={() => handleDownvote(voteType)}
              sx={{
                color: isDownVote ? "#660000" : "#ff6666",
                backgroundColor: isDownVote ? "#ffe6e6" : "transparent",
                "&:hover": {
                  backgroundColor: isDownVote ? "#ffcccc" : "#f5f5f5",
                },
              }}
            >
              <ArrowDownwardIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Tooltip>
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            {downvotes}
          </Typography>
        </Box>
      </Box>
      <IconButton onClick={() => setIsBoxOpen(!isBoxOpen)}>
        <CommentIcon sx={{ fontSize: 30 }} />
      </IconButton>
    </Box>
  );
};

export default VoteButtons;
