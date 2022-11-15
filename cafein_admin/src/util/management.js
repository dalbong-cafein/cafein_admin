import axios from "axios";
import { withAuthInstance } from "./index";
axios.defaults.withCredentials = true;

export const feedCreateApi = async (register) => {
  const formData = new FormData();
  formData.append("storeName", register.storeName);
  formData.append("siNm", register.siNm);
  formData.append("sggNm", register.sggNm);
  formData.append("rNm", register.rNm);
  formData.append("rNum", register.rNum);
  formData.append("lngX", register.lngX);
  formData.append("latY", register.latY);
  formData.append("monOpen", register.monOpen);
  formData.append("monClose", register.monClose);
  formData.append("tueOpen", register.tueOpen);
  formData.append("tueClose", register.tueClose);
  formData.append("wedOpen", register.wedOpen);
  formData.append("wedClose", register.wedClose);
  formData.append("thuOpen", register.thuOpen);
  formData.append("thuClose", register.thuClose);
  formData.append("friOpen", register.friOpen);
  formData.append("friClose", register.friClose);
  formData.append("satOpen", register.satOpen);
  formData.append("satClose", register.satClose);
  formData.append("sunOpen", register.sunOpen);
  formData.append("sunClose", register.sunClose);
  formData.append("recommendation", register.recommendation);
  formData.append("socket", register.socket);
  formData.append("wifi", register.wifi);
  formData.append("restroom", register.restroom);
  formData.append("tableSize", register.tableSize);
  formData.append("wifiPassword", register.wifiPassword);
  formData.append("etcTime", register.etcTime);
  formData.append("phone", register.phone);
  register.imageFiles.forEach((img) => formData.append("imageFiles", img));

  return axios({
    method: "POST",
    url: process.env.REACT_APP_API_URL + "/admin/stores",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const feedEditApi = async (register) => {
  const formData = new FormData();
  const keys = Object.keys(register);
  for (let key of keys) {
    if (key != "updateImageFiles") {
      if (key == "phone" || key == "wifiPassword" || key == "website" || key == "etcTime") {
        formData.append(key, register[key]);
      } else if (!!register[key]) {
        formData.append(key, register[key]);
      }
    }
  }

  if (register.updateImageFiles)
    register.updateImageFiles.forEach((img) => formData.append("updateImageFiles", img));

  return axios({
    method: "PUT",
    url: process.env.REACT_APP_API_URL + `/admin/stores/${register.storeId}`,
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

//피드 리스트
export const feedDataApi = async (page, sort) => {
  return await withAuthInstance.get(`/stores?page=${page}&sort=${sort}`);
};

//피드 상세 데이터
export const feedDetailApi = async (id) => {
  return await withAuthInstance.get(`/stores/${id}`);
};

//피드 평가데이터
export const feedDetailReviewApi = async (id) => {
  return await withAuthInstance.get(`/stores/${id}/reviews/detail-evaluation`);
};

//피드 검색어
export const feedSearchApi = async (keyword, searchType, page, sort, area) => {
  const type =
    searchType === "카페명"
      ? "sn"
      : searchType === "분류"
      ? "s"
      : searchType === "위치"
      ? "a"
      : ["a", "sn", "s"];
  return await withAuthInstance.get(
    `/stores?page=${page}&sort=${sort}&searchType=${type}&keyword=${keyword}&sggNm=${
      area != "전체" ? area : ""
    }`
  );
};

//카페 삭제
export const cafeDelApi = async (id) => {
  return await withAuthInstance.delete(`/stores/${id}`);
};

//카페 혼잡도
export const cafeCongestionsListApi = async (page, id, day) => {
  if (!!day) {
    return await withAuthInstance.get(`/stores/${id}/congestions?page=${page}&minusDays=${day}`);
  } else {
    return await withAuthInstance.get(`/stores/${id}/congestions?page=${page}`);
  }
};
