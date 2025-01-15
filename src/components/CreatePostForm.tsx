import React, { useState } from "react";
import { TextField, Button, Paper, Typography } from "@mui/material";
import axios from "axios";

const CreateTextPost: React.FC = () => {
  const [title, setTitle] = useState("");
  const [primaryTag, setPrimaryTag] = useState("");
  const [secondaryTag, setSecondaryTag] = useState("");
  const [content, setContent] = useState("");

  const backendUrl: string | undefined = process.env.REACT_APP_BACKEND_URL;
  const apiLink: string = backendUrl + "/protected/post/createPost";

  const handleSubmit = async () => {
    // Post submission logic here
    try {
      console.log({ title: title, content: content });
      await axios.post(
        apiLink,
        {
          title: title,
          content: content,
          primary_tag: primaryTag,
          secondary_tag: secondaryTag,
        },
        { withCredentials: true }
      );
    } catch {
      alert("Error posting, check your connection again.");
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{ padding: 3, maxWidth: 600, margin: "auto", marginTop: 5 }}
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
        onClick={handleSubmit}
        disabled={!title || !content || !primaryTag || !secondaryTag} // Disable button if title or content is empty
      >
        Post
      </Button>
    </Paper>
  );
};

export default CreateTextPost;
