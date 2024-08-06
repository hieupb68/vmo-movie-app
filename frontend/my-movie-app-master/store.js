import { configureStore } from "@reduxjs/toolkit";
import {
  darkModeReducer,
  phimTabReducer,
  danhMucTabReducer,
  nguoiDungTabReducer,
  feedbackTabReducer,
} from "./slices/redux";

const store = configureStore({
  reducer: {
    darkMode: darkModeReducer,
    phimTab: phimTabReducer,
    danhMucTab: danhMucTabReducer,
    nguoiDungTab: nguoiDungTabReducer,
    feedbackTab: feedbackTabReducer,
  },
});

export default store;
