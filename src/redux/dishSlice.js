import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentDish: null,
  loading: false,
  error: false,
};

export const dishSlice = createSlice({
  name: "dish",
  initialState,
  reducers: {
    gotDishes : (state, action) => {
      state.currentDish = action.payload;
      state.loading = false;
    },
    errorOccur: (state) => {
      state.loading = false;
      state.error = true;
    },
    clear: (state) => {
      state.currentDish = null;
      state.loading = false;
      state.error = false;
    },
    }
  }
);

export const {gotDishes, errorOccur, clear} = dishSlice.actions

export default dishSlice.reducer;
