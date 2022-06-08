import axios from "axios";
import { withAuthInstance } from "./index";

export const reviewDataApi = async (page, sort) => {
  return await withAuthInstance.get(`/reviews?page=${page}&sort=${sort}`);
};

export const reviewDetailApi = async (id) => {
  return await withAuthInstance.get(`/reviews/${id}`);
};

export const reviewSearchApi = async (keyword, sub, page, sort) => {
  return await withAuthInstance.get(
    `/reviews?page=${page}&sort=${sort}&searchType=${sub}&keyword=${keyword}`
  );
};
