import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    saveforlater:[],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity
    },
    removeAll:(state)=> {
      state.products =[]
    }
  },
});

export const { addProduct, removeAll } = cartSlice.actions;
export default cartSlice.reducer;
