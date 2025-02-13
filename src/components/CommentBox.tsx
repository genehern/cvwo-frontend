import { useState } from "react";
import { TextField, InputAdornment, Button, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
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
                  setInputValue("");
                  window.alert("success");
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
