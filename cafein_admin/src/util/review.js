import axios from "axios";
import { withAuthInstance } from "./index";

export const reviewDataApi = async (page, sort) => {
  return await withAuthInstance.get(`/reviews?page=${page}&sort=${sort}`);
};

//회원별
export const reviewUserDataApi = async (id) => {
  return await withAuthInstance.get(`/members/${id}/reviews`);
};

export const reviewDetailApi = async (id) => {
  return await withAuthInstance.get(`/reviews/${id}`);
};

export const reviewSearchApi = async (keyword, searchType, page, sort) => {
  const sub =
    searchType === "분류"
      ? "r"
      : searchType === "회원 번호"
      ? "w"
      : searchType === "카페 번호"
      ? "s"
      : ["s", "c", "w"];
  return await withAuthInstance.get(
    `/reviews?page=${page}&sort=${sort}&searchType=${sub}&keyword=${keyword}`
  );
};

export const reviewDelApi = async (id) => {
  return await withAuthInstance.delete(`/reviews/${id}`);
};

export const reviewReportApi = async (id, reportCId) => {
  const data = { reviewId: id, reportCategoryId: reportCId };

  return await withAuthInstance.post(`/reviews/${id}/reports`, data);
};

export const changePostStatusApi = async (id, isPost) => {
  return await withAuthInstance.patch(`/reviews/${id}/${isPost ? "stop-posting" : "post"}`);
};

//신고가능여부체크
export const isAbleReportApi = async (id) => {
  return await withAuthInstance.get(`/reviews/${id}/reports/check-possible-report`);
};
