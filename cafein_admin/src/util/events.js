import axios from "axios";
import { withAuthInstance } from "./index";

export const marketingListApi = async (page, sort) => {
  return await withAuthInstance.get(`/coupons?page=${page}&sort=${sort}`);
};

//쿠폰리스트 검색
export const marketingSearchApi = async (searchType, keyword, page, sort) => {
  const sub =
    searchType === "분류"
      ? "cp"
      : searchType === "회원 번호"
      ? "m"
      : searchType === "휴대폰"
      ? "p"
      : ["p", "cp", "m"];
  return await withAuthInstance.get(
    `/coupons?page=${page}&sort=${sort}&searchType=${sub}&keyword=${keyword}`
  );
};
export const eventListApi = async (search, page, sort) => {
  return await withAuthInstance.get(
    `/boards?boardCategoryId=2&page=${page}&sort=${sort}&size=9${search && `&keyword=${search}`}`
  );
};

//게시글 삭제
export const postDelApi = async (id) => {
  return await withAuthInstance.delete(`/boards/${id}`);
};

//게시글 수정
export const editNoticeApi = async (register) => {
  const formData = new FormData();
  formData.append("title", register.title);
  formData.append("content", register.content);
  formData.append("boardId", register.boardId);
  formData.append("deleteImageId", register.deleteImageId);
  register.imageFile.forEach((img) => formData.append("imageFile", img));

  return await axios({
    method: "put",
    url: process.env.REACT_APP_API_URL + `/admin/boards/${register.boardId}`,
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const changeStateApi = async (id) => {
  return await withAuthInstance.patch(`/coupons/${id}`);
};

export const registerNoticeApi = async (register) => {
  const formData = new FormData();
  formData.append("title", register.title);
  formData.append("content", register.content);
  formData.append("boardCategoryId", register.boardCategoryId);
  register.imageFiles.forEach((img) => formData.append("imageFiles", img));

  return axios({
    method: "POST",
    url: process.env.REACT_APP_API_URL + "/admin/boards",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const regImgApi = async (content) => {
  const formData = new FormData();
  formData.append("boardId", content.id);
  formData.append("imageFile", content.file);

  return axios({
    method: "POST",
    url: process.env.REACT_APP_API_URL + "/admin/events",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const eventImgApi = (page, sort) => {
  return withAuthInstance.get(`/events?size=12&page=${page}&sort=${sort}`);
};

export const delEventImgApi = (id) => {
  return withAuthInstance.delete(`/events/${id}`);
};

export const getReportListApi = async (page, sort, search, searchType) => {
  if (search) {
    const type =
      searchType === "회원 번호"
        ? "m"
        : searchType === "분류"
        ? "rp"
        : searchType === "리뷰 번호"
        ? "r"
        : ["m", "rp", "r"];
    return await withAuthInstance.get(
      `/reports?size=12&page=${page}&sort=${sort}&searchType=${type}&keyword=${search}`
    );
  } else {
    return await withAuthInstance.get(`/reports?size=12&page=${page}&sort=${sort}`);
  }
};
export const changeReportStatusApi = async (id, status) => {
  return await withAuthInstance.patch(`/reports/${id}/${status}`);
};
