import axios from "axios";
import { withAuthInstance } from "./index";

export const registerMemoApi = async (id, content, where) => {
  let page = null;
  if (where === "/management") page = "storeId";
  else if (where === "/review") page = "reviewId";
  else if (where === "/user") page = "memberId";

  return await withAuthInstance.post(`/memos`, { page: id, content: content });
};

export const memoDataApi = async (id) => {
  return await withAuthInstance.get(`/memos/${id}`);
};
