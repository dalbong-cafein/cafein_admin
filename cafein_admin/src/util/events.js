import axios from "axios";
import { withAuthInstance } from "./index";

export const marketingListApi = async (page, sort) => {
  return await withAuthInstance.get(`/coupons?page=${page}&sort=${sort}`);
};

//대시용
export const marketingDListApi = async () => {
  return await withAuthInstance.get(`/coupons/limit`);
};

//쿠폰리스트 검색
export const marketingSearchApi = async (sub, keyword, page, sort) => {
  return await withAuthInstance.get(
    `/coupons?page=${page}&sort=${sort}&searchType=${sub}&keyword=${keyword}`
  );
};
export const eventListApi = async (page, sort) => {
  return await withAuthInstance.get(`/boards?boardCategoryId=2`);
};

export const changeStateApi = async (id) => {
  return await withAuthInstance.patch(`/coupons/${id}`);
};

export const registerNoticeApi = async (register) => {
  const formData = new FormData();
  formData.append("title", register.title);
  formData.append("content", register.content);
  formData.append("boardCategoryId", register.boardCategoryId);
  if (register.imageFiles.length > 0) {
    for (let i = 0; i < register.imageFiles.length; i++) {
      formData.append("imageFiles", register.imageFiles[i]);
    }
  }

  return axios({
    method: "POST",
    url: process.env.REACT_APP_API_URL + "/admin/boards",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
