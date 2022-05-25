import axios from "axios";
import { withAuthInstance } from "./index";

// export const feedCreateApi = async (register) => {
//   const formData = new FormData();
//   formData.append(
//     "register",
//     new Blob([JSON.stringify(register)], { type: "application/json" })
//   );
//   return await axios({
//     method: "POST",
//     url: "http://api.cafeinofficial.com/admin/stores",
//     data: formData,
//     headers: {
//       Authorization: `Bearer ${axios.defaults.headers.common["Authorization"]}`,
//       "Content-Type": `multipart/form-data`,
//     },
//   });
// };

export const feedDataApi = async (page) => {
  console.log(page);
  return await withAuthInstance.get(`/stores?page=${page}`);
};
