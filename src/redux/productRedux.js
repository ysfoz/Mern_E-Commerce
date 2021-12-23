import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    productList: [],
    searchText: "",
  },
  reducers: {
    setUserSearchInput: (state, action) => {
      state.searchText = action.payload;
    },
    resetUserSearchInput:(state)=>{
      state.searchText= ''
    }
  },
});

export const { setUserSearchInput,resetUserSearchInput } = productSlice.actions;
export default productSlice.reducer;
