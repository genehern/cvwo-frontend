import axios from "axios";
import { CommentI, postCardDataI } from "../types";
import { QueryFunctionContext } from "@tanstack/react-query";
import camelcaseKeys from "camelcase-keys";

axios.defaults.withCredentials = true;

const backendUrl: string | undefined = process.env.REACT_APP_BACKEND_URL;

const apiClient = axios.create({
  baseURL: backendUrl,
});

// Add a response interceptor to transform keys to camelCase
apiClient.interceptors.response.use(
  (response) => {
    if (response.data) {
      response.data = camelcaseKeys(response.data, { deep: true });
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const createPost = async (
  title: string,
  content: string,
  primaryTag: string,
  secondaryTag: string
) => {
  const apiLink: string = "/protected/posts";
  try {
    await apiClient.post(apiLink, {
      title: title,
      content: content,
      primary_tag: primaryTag,
      secondary_tag: secondaryTag,
    });
  } catch {}
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
  const apiLink: string = `/public/posts?pageNum=${pageParam}&limitNum=${LIMIT}`;

  try {
    const res = await apiClient.get(apiLink);
    const posts: postCardDataI[] = res.data;
    console.log(posts);
    return {
      data: posts,
      currentPage: pageParam,
      nextPage: posts.length === LIMIT ? pageParam + 1 : null,
    };
  } catch (error) {
    throw new Error("Failed to fetch posts.");
  }
};

export const postComment = async (
  postId: number,
  parentCommentId: number | null,
  content: string
) => {
  const apiLink: string = `protected/comments`;
  try {
    await apiClient.post(apiLink, {
      post_id: postId,
      parentCommentId: parentCommentId,
      content: content,
    });
  } catch (error) {
    throw new Error("Failed to create comment");
  }
};

export const postPostVote = async (
  postId: number,
  upvote: boolean,
  downvote: boolean
) => {
  const apiLink: string = `protected/votes/postVote`;
  try {
    await apiClient.post(apiLink, {
      post_id: postId,
      upvote: upvote,
      downvote: downvote,
    });
    console.log(postId, upvote, downvote);
  } catch (error) {
    throw new Error("Failed to fetch posts.");
  }
};

export const postCommentVote = async (commentId: number, upvote: boolean) => {
  const apiLink: string = `protected/posts/upvote`;
  try {
    await apiClient.post(apiLink);
  } catch (error) {
    throw new Error("Failed to fetch posts.");
  }
};

export const getComments = async (
  context: QueryFunctionContext<string[], number>,
  postId: number
): Promise<{
  data: CommentI[];
  currentPage: number;
  nextPage: number | null;
}> => {
  const LIMIT = 10;
  const pageParam = context.pageParam ?? 1;
  const apiLink: string = `/public/comments?postId=${postId}&pageNum=${pageParam}&limitNum=${LIMIT}`;

  try {
    const res = await apiClient.get(apiLink);
    const comments: CommentI[] = res.data;
    if (comments == null) {
      return { data: [], currentPage: pageParam, nextPage: null };
    }
    return {
      data: comments,
      currentPage: pageParam,
      nextPage: comments.length === LIMIT ? pageParam + 1 : null,
    };
  } catch (error) {
    throw new Error("Failed to fetch posts.");
  }
};
