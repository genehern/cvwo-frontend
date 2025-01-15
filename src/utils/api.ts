import axios from "axios";
import { postCardDataI } from "../types";
import { QueryFunctionContext } from "@tanstack/react-query";

axios.defaults.withCredentials = true;

const backendUrl: string | undefined = process.env.REACT_APP_BACKEND_URL;

export const createPost =
  (title: string, content: string, primaryTag: string, secondaryTag: string) =>
  async () => {
    const apiLink: string = `${backendUrl}/protected/post/createPost`;
    try {
      await axios.post(apiLink, {
        title: title,
        content: content,
        primary_tag: primaryTag,
        secondary_tag: secondaryTag,
      });
    } catch {
      alert("Error posting, check your connection again.");
    }
  };

export const fetchPosts = async (
  context: QueryFunctionContext<string[], number>
): Promise<{
  data: postCardDataI[];
  currentPage: number;
  nextPage: number | null;
}> => {
  const LIMIT = 10;
  const pageParam = context.pageParam ?? 1;
  const apiLink: string = `${backendUrl}/public/post?pageNum=${pageParam}&limitNum=${LIMIT}`;

  try {
    const res = await axios.get(apiLink);
    const posts: postCardDataI[] = res.data;

    return {
      data: posts,
      currentPage: pageParam,
      nextPage: posts.length === LIMIT ? pageParam + 1 : null,
    };
  } catch (error) {
    throw new Error("Failed to fetch posts.");
  }
};
