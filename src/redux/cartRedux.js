import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    saveforlater: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },
    removeAll: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
    deleteProduct: (state, action) => {

      for(let i in state.products){
      
        if (state.products[i]._id === action.payload){
          state.total -= state.products[i].price * state.products[i].quantity
          state.quantity -= 1
          state.products.splice(i,1)
          
        }
    
  }
}


    //   state.total = state.total - action.payload.price * action.payload.quantity
    //   state.products.splice(
    //     state.products.findIndex(
    //       (product) => product._id === action.payload.id
    //     ),
    //     1
    //   );
    //   state.quantity -= 1
    // },

    //!calistirmadim
    // changeQuantity:(state,action)=>{
    //   state.products[
    //     state.products.findIndex((item) => item._id === action.payload.id)
    // ] =

    // }
  },
});

export const { addProduct, removeAll, changeQuantity,deleteProduct } = cartSlice.actions;
export default cartSlice.reducer;
