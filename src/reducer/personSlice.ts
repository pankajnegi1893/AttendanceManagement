import { createSlice } from "@reduxjs/toolkit";
import { getDaysInMonth } from "../helpers/dateHelper";

const initialState = {
  name: "Pankaj Negi",
  role: "Software Developer",
  all: getDaysInMonth(new Date().getMonth()),
  used: 0,
};

export const personSlice = createSlice({
  name: "person",
  initialState,
  reducers: {
    applyLeave: (state, action) => {
      state.used += action.payload.leaves;
    },
  },
});

// Action creators are generated for each case reducer function
export const { applyLeave } = personSlice.actions;

export default personSlice.reducer;
