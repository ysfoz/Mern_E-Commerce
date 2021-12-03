import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    fetchStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    fetchFailure: (state, action) => {
      state.isFetching = false;
      state.error = true;
    },
    logoutSuccess:(state) =>{
      state.currentUser = null
    }
  },
});

export const { fetchStart, fetchFailure, loginSuccess, logoutSuccess } = userSlice.actions;
export default userSlice.reducer;
