import axios from "axios";
import { withAuthInstance } from "./index";

export const feedCreateApi = async (register) => {
  return await withAuthInstance.post("/stores", register);
};

export const feedDataApi = async (page) => {
  return await withAuthInstance.get(`/stores?page=${page}`);
};
