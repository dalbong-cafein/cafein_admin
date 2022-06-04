import axios from "axios";
import { withAuthInstance } from "./index";

export const registerMemoApi = async (id, content, where) => {
  let body = null;
  if (where === "/management") {
    body = {
      storeId: id,
      content: content,
    };
  } else if (where === "/review") {
    body = {
      reviewId: id,
      content: content,
    };
  } else if (where === "/user") {
    body = {
      memberId: id,
      content: content,
    };
  }

  return await withAuthInstance.post(`/memos`, body);
};

export const memoDataApi = async (id) => {
  return await withAuthInstance.get(`/memos/${id}`);
};
