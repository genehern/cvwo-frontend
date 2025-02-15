import { useState } from "react";
import { TextField, InputAdornment, Button, IconButton } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { postComment } from "../utils/api";

function CommentBox({
  setIsBoxOpen,
  postId,
  parentCommentId,
}: {
  setIsBoxOpen: React.Dispatch<React.SetStateAction<boolean>>;
  postId: number;
  parentCommentId: number | null;
}) {
  const [inputValue, setInputValue] = useState<string>("");
  const queryClient = useQueryClient();
  const location = useLocation();
  const id = location.state;
  return (
    <div>
      <TextField
        required
        id="filled-basic"
        label="Comment"
        variant="filled"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setInputValue(e.target.value)
        }
        fullWidth
        multiline
        rows={3}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Button
                onClick={() => {
                  setIsBoxOpen(false);
                }}
              >
                Cancel
              </Button>

              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  postComment(postId, parentCommentId, inputValue);
                  setIsBoxOpen(false);
                  queryClient.refetchQueries({
                    queryKey: ["posts", `comments${id}`],
                  });
                  setInputValue("");
                }}
                endIcon={<></>}
              >
                Comment
              </Button>
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
}

export default CommentBox;
