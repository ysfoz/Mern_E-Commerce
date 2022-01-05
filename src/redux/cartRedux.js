import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    saveforlater: [],
    orders: [],
    quantity: 0,
    total: 0,
    isFetching: false,
    error: false,
  },
  reducers: {
    getCartStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getCartFailure: (state, action) => {
      state.isFetching = false;
      state.error = true;
    },
    //+
    addProduct: (state, action) => {
      state.total = 0;
      state.products = action.payload;
      state.quantity = state.products?.length;
      for (let i = 0; i < state.products.length; i++) {
        state.total += state.products[i].price * state.products[i].quantity;
      }
    },
    getCartWithLogin: (state, action) => {
      state.products = []
      state.total = 0;
      state.products = action.payload;
      state.quantity = state.products?.length;
      for (let i = 0; i < state.products.length; i++) {
        state.total += state.products[i].price * state.products[i].quantity;
      }
    },

    //+
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
    // used nur in redux - not in DB
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
      state.orders = [...state.products, ...state.orders];
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
    //+
    setProductQuantity: (state, action) => {
      const product =
        state.products[
          state.products.findIndex(
            (product) => product._id === action.payload.id
          )
        ];
      if (product.quantity > action.payload.quantity) {
        state.total -= product.price;
      } else if (product.quantity < action.payload.quantity) {
        state.total += product.price;
      }
      product.quantity = action.payload.quantity;
    },
    // for logout
    removeall: (state) => {
      state.products = [];
      state.saveforlater = [];
      state.quantity = 0;
      state.total = 0;
      state.orders =[];
    },
  },
});

export const {
  getCartStart,
  getCartFailure,
  addProduct,
  deleteProduct,
  addSaveForLater,
  deleteSaveForLater,
  addProductsFromSaveForLater,
  addProductsToOrders,
  setProductQuantity,
  removeall,
  getCartWithLogin
} = cartSlice.actions;
export default cartSlice.reducer;
