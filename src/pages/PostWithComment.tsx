import Navbar from "../components/Navbar";
import Comment from "../components/Comment";
import { Box, CircularProgress } from "@mui/material";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getComments } from "../utils/api";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useParams, useLocation } from "react-router-dom";
import PostCard from "../components/PostCard";
import { postCardDataI } from "../types";

function PostWithComment() {
  let { id } = useParams();
  const postId = Number(id);
  const location = useLocation();
  const postData = location.state;
  const { data, error, status, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: [`comments${postId}`],
      queryFn: (context) => getComments(context, postId),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => lastPage.nextPage,
    });

  const { ref, inView } = useInView();
  console.log(postData);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  return status === "pending" ? (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <CircularProgress />
    </Box>
  ) : status === "error" ? (
    <Box textAlign="center" mt={4}>
      <p>Error: {error.message}</p>
    </Box>
  ) : (
    <>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          mt: 10,
        }}
      >
        <PostCard {...postData} enableReadMore={false} />
        {data.pages !== null &&
          data.pages.map((page) => (
            <div key={page.currentPage}>
              {page.data.map((item) => (
                <Box
                  key={item.id}
                  sx={{
                    width: "100%",
                    mt: 5,
                  }}
                >
                  <Comment {...item} />
                </Box>
              ))}
            </div>
          ))}

        <Box ref={ref} mt={2}>
          {isFetchingNextPage && <CircularProgress />}
        </Box>
      </Box>
    </>
  );
}

export default PostWithComment;
