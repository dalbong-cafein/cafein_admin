import { withAuthInstance } from "./index";

export const userListApi = async (sort, page) => {
  return await withAuthInstance.get(`/members?page=${page}&sort=${sort}`);
};
export const userSearchApi = async (sub, keyword, sort, page) => {
  return await withAuthInstance.get(
    `/members?page=${page}&sort=${sort}&searchType=${sub}&keyword=${keyword}`
  );
};
export const userReportApi = async (id) => {
  return await withAuthInstance.get(`/members/${id}/reports`);
};
export const userDetailApi = async (id) => {
  return await withAuthInstance.get(`/members/${id}`);
};

export const stickerApi = async (id) => {
  return await withAuthInstance.get(`/stickers?memberId=${id}`);
};

export const stickerDelApi = async (id, type, sId) => {
  if (type === "카공 카페 등록") {
    return await withAuthInstance.delete(
      `/stickers/storeType?storeId=${sId}&memberId=${id}`
    );
  } else if (type === "카페 리뷰 작성") {
    return await withAuthInstance.delete(
      `/stickers/reviewType?reviewId=${sId}&memberId=${id}`
    );
  } else if (type === "혼잡도 공유") {
    return await withAuthInstance.delete(
      `/stickers/congestionType?congestionId=${sId}&memberId=${id}`
    );
  }
};

//회원 탈퇴
export const userLeaveApi = async (id) => {
  return await withAuthInstance.delete(`/members/${id}`);
};

//회원정보 수정
export const userDataUpdateApi = async (data) => {
  return await withAuthInstance.put(`/members`, data);
};
