import { atom } from "recoil";
import { persistAtom } from "./common";
export const adminState = atom({
  key: "adminState",
  default: {
    email: null,
    image: null,
  },
  effects_UNSTABLE: [persistAtom],
});
