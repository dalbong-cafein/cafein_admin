import axios from "axios";
import { withAuthInstance } from "./index";

export const reviewDataApi = async () => {
  return await withAuthInstance.get("/reviews");
};
