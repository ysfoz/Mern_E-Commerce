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
  },
});

export const { setUserSearchInput } = productSlice.actions;
export default productSlice.reducer;
