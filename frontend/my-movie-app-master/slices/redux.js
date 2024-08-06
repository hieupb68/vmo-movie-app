import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

// Initial states
const initialDarkModeState = false;
const initialPhimTabState = true;
const initialDanhMucTabState = false;
const initialNguoiDungTabState = false;
const initialFeedbackTabState = false;

const darkModeSlice = createSlice({
  name: "darkMode",
  initialState: initialDarkModeState,
  reducers: {
    toggleDarkMode: (state) => !state,
  },
});

const phimTabSlice = createSlice({
  name: "phimTab",
  initialState: initialPhimTabState,
  reducers: {
    setActive: (state, { payload }) => payload,
  },
});

const danhMucTabSlice = createSlice({
  name: "danhMucTab",
  initialState: initialDanhMucTabState,
  reducers: {
    setActive: (state, { payload }) => payload,
  },
});

const nguoiDungTabSlice = createSlice({
  name: "nguoiDungTab",
  initialState: initialNguoiDungTabState,
  reducers: {
    setActive: (state, { payload }) => payload,
  },
});

const feedbackTabSlice = createSlice({
  name: "feedbackTab",
  initialState: initialFeedbackTabState,
  reducers: {
    setActive: (state, { payload }) => payload,
  },
});

export const { toggleDarkMode } = darkModeSlice.actions;

export const { setActive: setActivePhimTab } = phimTabSlice.actions;

export const { setActive: setActiveDanhMucTab } = danhMucTabSlice.actions;

export const { setActive: setActiveNguoiDungTab } = nguoiDungTabSlice.actions;

export const { setActive: setActiveFeedbackTab } = feedbackTabSlice.actions;

export const getDarkMode = (state) => state?.darkMode;

export const getPhimTab = (state) => state?.phimTab;
export const getDanhMucTab = (state) => state?.danhMucTab;
export const getNguoiDungTab = (state) => state?.nguoiDungTab;
export const getFeedbackTab = (state) => state?.feedbackTab;

export const darkModeReducer = darkModeSlice.reducer;
export const phimTabReducer = phimTabSlice.reducer;
export const danhMucTabReducer = danhMucTabSlice.reducer;
export const nguoiDungTabReducer = nguoiDungTabSlice.reducer;
export const feedbackTabReducer = feedbackTabSlice.reducer;
