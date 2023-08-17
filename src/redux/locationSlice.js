import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentLocation: null,
  loading: false,
  error: false,
};

export const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    gotLocationSuccessfully: (state, action) => {
      state.currentLocation = action.payload;
      state.loading = false;
    },
    locationFailure: (state) => {
      state.loading = false;
      state.error = true;
    }
  },
});

export const {gotLocationSuccessfully, locationFailure} = locationSlice.actions

export default locationSlice.reducer;
