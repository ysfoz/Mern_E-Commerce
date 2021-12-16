import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
    jwtToken:null
   
  },
  reducers: {
    getUserStart: (state) => {
      state.isFetching = true;
      state.error = false;
      
    },
    getUserFailure: (state, action) => {
      state.isFetching = false;
      state.error = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.jwtToken = state.currentUser.jwtToken
      console.log("🚀 ~ file: userRedux.js ~ line 26 ~ jwtToken", state.jwtToken)
    },
    registerSuccess:(state) => {
      state.isFetching = false
      state.error = false;
    },
    logoutSuccess:(state)=>{
      state.error = false;
      state.currentUser = null
      state.jwtToken = null;
    },
   
    getUserDeleteSuccess: (state) => {
      state.error = false;
      state.isFetching = false;
      state.currentUser = null;
      state.jwtToken = null;
     
    },
    getUserUpdate:(state,action)=>{
      state.error = false;
      state.isFetching =false
      state.currentUser = action.payload
      // state.currentUser = {...action.payload, jwtToken:state.jwtToken}
     
      
    }
   
  },
});

export const {
  getUserStart,
  loginSuccess,
  getUserFailure,
  getAllUsersSuccess,
  getUserDeleteSuccess,
  logoutSuccess,
  registerSuccess,
  getUserUpdate
  
} = userSlice.actions;
export default userSlice.reducer;
