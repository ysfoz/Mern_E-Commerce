import axios from "axios";
import {
  getUserFailure,
  getUserStart,
  loginSuccess,
  registerSuccess,
  logoutSuccess,
  getUserDeleteSuccess,
  getUserUpdate,
} from "../redux/userRedux";
import {
  getCartStart,
  getCartFailure,
  addProduct,
  changeQuantity,
  deleteProduct,
  addSaveForLater,
  deleteSaveForLater,
  addProductsFromSaveForLater,
  addProductsToOrders,
  setProductQuantity,
  removeall,
} from "../redux/cartRedux";
const BASE_URL = "https://mern-e-commerce-api.herokuapp.com/api/";

const TOKEN = JSON.parse(
  JSON.parse(localStorage.getItem("persist:root"))?.user
)?.jwtToken;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});

// USER

// Login
export const login = async (dispatch, user) => {
  dispatch(getUserStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    console.log(res);
    dispatch(loginSuccess(res?.data));
  } catch (error) {
    dispatch(getUserFailure());
  }
};

//Logout
export const logout = async (dispatch) => {
  dispatch(getUserStart());
  try {
    dispatch(logoutSuccess());
  } catch (error) {
    dispatch(getUserFailure());
  }
};

//Create / Register
export const createUser = async (dispatch, newuser) => {
  dispatch(getUserStart());
  try {
    await publicRequest.post("/auth/register", newuser);
    dispatch(registerSuccess());
  } catch (error) {
    dispatch(getUserFailure());
  }
};

//update
export const updateUser = async (dispatch, id, user) => {
  dispatch(getUserStart());
  try {
    const res = await userRequest.put(`/users/${id}`, user);

    dispatch(getUserUpdate(res?.data));
  } catch (error) {
    dispatch(getUserFailure());
  }
};

//delete

export const deleteUser = async (id, dispatch) => {
  dispatch(getUserStart());
  try {
    await userRequest.delete(`/users/${id}`);

    dispatch(getUserDeleteSuccess());
  } catch (error) {
    dispatch(getUserFailure());
  }
};

//Cart

// create cart and add product +
export const createUpdateCart = async (dispatch, userId, product) => {
  dispatch(getCartStart());
  try {
    const res = await userRequest.post(`/carts/${userId}`, product);
    dispatch(addProduct(res?.data?.products));
  } catch (error) {
    dispatch(getCartFailure());
  }
};

// change product quantity in cart +

export const changeQuantityDB = async(dispatch,userId,id,quantity)=>{

  dispatch(getCartStart());
  try {
    const res = await userRequest.put(`/carts/${userId}`, {quantity,id});
  
    dispatch(setProductQuantity({id,quantity}));
  } catch (error) {
    dispatch(getCartFailure());
  }
}

// delete nur ein product from cart +

export const deleteoneProductfromDB = async(dispatch,userId,id)=>{
  dispatch(getCartStart());
  try {
    const res = await userRequest.post(`/carts/delete/${userId}`, {id:id});
    
    
    dispatch(deleteProduct(id));
  } catch (error) {
    dispatch(getCartFailure());
  }
}

// delete all product from cart an move to orders

export const moveProductstoOrdersAndDelete = async(dispatch,userId,idList)=> {
console.log("🚀 ~ file: requestMethods.js ~ line 143 ~ moveProductstoOrdersAndDelete ~ idList", idList)
  dispatch(getCartStart)
  try {
    const res = await userRequest.delete(`/carts/${userId}`).then(increaseSaleAmount(userId,idList))
    console.log("🚀 ~ file: requestMethods.js ~ line 147 ~ moveProductstoOrdersAndDelete ~ res", res)
    dispatch(addProductsToOrders())
    
  } catch (error) {
    dispatch(getCartFailure());
  }
}

export const increaseSaleAmount = async(userId,idList)=>{
  const res = await userRequest.put(`/products/salesupdate/${userId}`,idList)
  console.log("🚀 ~ file: requestMethods.js ~ line 155 ~ increaseSaleAmount ~ idList", idList)
  console.log("🚀 ~ file: requestMethods.js ~ line 155 ~ increaseSaleAmount ~ res", res)

}