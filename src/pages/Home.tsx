import Navbar from "../components/Navbar";
import PostCard from "../components/PostCard";
import { Box, CircularProgress } from "@mui/material";
import { QueryCache, useInfiniteQuery } from "@tanstack/react-query";
import { fetchPosts } from "../utils/api";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

function Home() {
  const { data, error, status, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["posts"],
      queryFn: fetchPosts,
      initialPageParam: 0,
      getNextPageParam: (lastPage) => lastPage.nextPage,
    });
  
  const { ref, inView } = useInView();
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
        {data.pages.map((page) => (
          <div key={page.currentPage}>
            {page.data.map((item) => (
              <Box
                key={item.id}
                sx={{
                  width: "100%",
                  mt: 5,
                }}
              >
                <PostCard {...item} enableReadMore={true} />
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

export default Home;
