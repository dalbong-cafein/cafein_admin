import { atom } from "recoil";

export const registerNotice = atom({
  key: "registerNotice",
  default: {
    title: "",
    content: "",
    boardCategoryId: "",
    imageFiles: [],
  },
});
