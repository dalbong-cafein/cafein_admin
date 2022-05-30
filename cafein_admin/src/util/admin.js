import axios from "axios";
import { withAuthInstance } from "./index";

export const adminFeedListApi = async (page, sort) => {
  return await withAuthInstance.get(`/boards?page=${page}&sort=${sort}`);
};
