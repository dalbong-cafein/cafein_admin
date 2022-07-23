import { atom } from "recoil";

export const editcafe = atom({
  key: "editcafe",
  default: {
    storeId: "",
    phone: "",
    website: "",
    monOpen: "",
    monClose: "",
    tueOpen: "",
    tueClose: "",
    wedOpen: "",
    wedClose: "",
    thuOpen: "",
    thuClose: "",
    friOpen: "",
    friClose: "",
    satOpen: "",
    satClose: "",
    sunOpen: "",
    sunClose: "",
    wifiPassword: "",
    etcTime: "",
    deleteImageIdList: [],
    updateImageFiles: [],
  },
});
