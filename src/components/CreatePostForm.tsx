import React, { useState } from "react";
import { TextField, Button, Paper, Typography } from "@mui/material";
import { createPost } from "../utils/api";
import { useNavigate } from "react-router-dom";

const CreateTextPost: React.FC = () => {
  const [title, setTitle] = useState("");
  const [primaryTag, setPrimaryTag] = useState("");
  const [secondaryTag, setSecondaryTag] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      await createPost(title, content, primaryTag, secondaryTag);
      navigate("/");

      window.alert("Posted Succesfully");
    } catch {
      window.alert("Failed to post");
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{ padding: 3, maxWidth: 600, margin: "auto", marginTop: 12 }}
    >
      <Typography variant="h5" gutterBottom>
        Create Post
      </Typography>

      {/* Title Input */}
      <TextField
        fullWidth
        label="Interest Group*"
        variant="outlined"
        value={primaryTag}
        onChange={(e) => setPrimaryTag(e.target.value)}
        sx={{ marginBottom: 2 }}
      />

      <TextField
        fullWidth
        label="Label*"
        variant="outlined"
        value={secondaryTag}
        onChange={(e) => setSecondaryTag(e.target.value)}
        sx={{ marginBottom: 2 }}
      />

      <TextField
        fullWidth
        label="Title*"
        variant="outlined"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{ marginBottom: 2 }}
      />

      {/* Content Input */}
      <TextField
        fullWidth
        label="Content*"
        multiline
        minRows={10}
        variant="outlined"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        sx={{ marginBottom: 2 }}
      />

      {/* Submit Button */}
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleClick}
        disabled={!title || !content || !primaryTag || !secondaryTag} // Disable button if title or content is empty
      >
        Post
      </Button>
    </Paper>
  );
};

export default CreateTextPost;
