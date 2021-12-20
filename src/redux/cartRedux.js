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
},
    deleteSaveForLater: (state, action) => {

      for(let i in state.saveforlater){
      
        if (state.saveforlater[i]._id === action.payload){
          // state.total -= state.saveforlater[i].price * state.saveforlater[i].quantity
          // state.quantity -= 1
          state.saveforlater.splice(i,1)
          
        }
    
  }
},

addSaveForLater:(state,action)=>{
  for(let i in state.products){
    if(state.products[i]._id === action.payload){
      state.total -= state.products[i].price * state.products[i].quantity
      state.quantity -= 1
      const product = state.products.splice(i,1)
      state.saveforlater.push(...product)
    }
  }
},
addProductsFromSaveForLater:(state,action)=>{
  for(let i in state.saveforlater){
    if(state.saveforlater[i]._id === action.payload){
      state.total += state.saveforlater[i].price * state.saveforlater[i].quantity
      state.quantity += 1
      const product = state.saveforlater.splice(i,1)
      state.products.push(...product)
    }
  }
},
addSaveForLater2:(state,action)=>{
  
state.saveforlater = []

},

  },
});

export const { addProduct, removeAll, changeQuantity,deleteProduct,addSaveForLater,addSaveForLater2,deleteSaveForLater,addProductsFromSaveForLater } = cartSlice.actions;
export default cartSlice.reducer;
