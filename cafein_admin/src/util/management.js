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
  if (register.imageFiles.length > 0) {
    for (let i = 0; i < register.imageFiles.length; i++) {
      formData.append("imageFiles", register.imageFiles[i]);
    }
  }

  return axios({
    method: "POST",
    url: process.env.REACT_APP_API_URL + "/admin/stores",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${axios.defaults.headers.common["Authorization"]}`,
    },
    withCredentials: true,
  });
  //  return await axios.post(
  //   `${process.env.REACT_APP_API_URL}/admin/stores`,
  //   formData,

  // );
};

export const feedDataApi = async (page, sort) => {
  return await withAuthInstance.get(`/stores?page=${page}&sort=${sort}`);
};
