import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    saveforlater: [],
    orders: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },

    deleteProduct: (state, action) => {
      for (let i in state.products) {
        if (state.products[i]._id === action.payload) {
          state.total -= state.products[i].price * state.products[i].quantity;
          state.quantity -= 1;
          state.products.splice(i, 1);
        }
      }
    },
    deleteSaveForLater: (state, action) => {
      for (let i in state.saveforlater) {
        if (state.saveforlater[i]._id === action.payload) {
          state.saveforlater.splice(i, 1);
        }
      }
    },

    addSaveForLater: (state, action) => {
      for (let i in state.products) {
        if (state.products[i]._id === action.payload) {
          state.total -= state.products[i].price * state.products[i].quantity;
          state.quantity -= 1;
          const product = state.products.splice(i, 1);
          state.saveforlater.push(...product);
        }
      }
    },
    addProductsFromSaveForLater: (state, action) => {
      for (let i in state.saveforlater) {
        if (state.saveforlater[i]._id === action.payload) {
          state.total +=
            state.saveforlater[i].price * state.saveforlater[i].quantity;
          state.quantity += 1;
          const product = state.saveforlater.splice(i, 1);
          state.products.push(...product);
        }
      }
    },
    addProductsToOrders: (state, action) => {
      state.orders = [...state.products,...state.orders];
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
    setProductQuantity: (state, action) => {
      for (let i in state.products) {
        if (state.products[i]._id === action.payload.id) {
          if (state.products[i].quantity > action.payload.quantity) {
            state.total -= state.products[i].price;
          } else if (state.products[i].quantity < action.payload.quantity) {
            state.total += state.products[i].price;
          }
          state.products[i].quantity = action.payload.quantity;
        }
      }
    },
    removeall:(state)=>{
      state.products= []
    state.saveforlater= []
    state.quantity= 0
    state.total= 0
    }
  },
});

export const {
  addProduct,
  changeQuantity,
  deleteProduct,
  addSaveForLater,
  deleteSaveForLater,
  addProductsFromSaveForLater,
  addProductsToOrders,
  setProductQuantity,
  removeall
} = cartSlice.actions;
export default cartSlice.reducer;
