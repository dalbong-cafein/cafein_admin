import { atom } from "recoil";

export const editcafe = atom({
  key: "editcafe",
  default: {
    storeId: "",
    phone: "",
    website: "",
    monOpen: null,
    monClose: null,
    tueOpen: null,
    tueClose: null,
    wedOpen: null,
    wedClose: null,
    thuOpen: null,
    thuClose: null,
    friOpen: null,
    friClose: null,
    satOpen: null,
    satClose: null,
    sunOpen: null,
    sunClose: null,
    wifiPassword: "",
    etcTime: "",
    deleteImageIdList: [],
    updateImageFiles: [],
  },
});
