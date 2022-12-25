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
  deleteProduct,
  addProductsToOrders,
  setProductQuantity,
  getCartWithLogin,
} from "../redux/cartRedux";
// const BASE_URL = "https://shoppingoo-api.onrender.com/api/";
const BASE_URL = "http://localhost:8080/api/";

const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser?.jwtToken;

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
    await publicRequest.post("/auth/login", user).then((res) => {
      dispatch(loginSuccess(res?.data));
      getCart(dispatch, res?.data?._id, res?.data?.jwtToken);
    });
  } catch (error) {
    dispatch(getUserFailure());
  }
};

export const getCart = async (dispatch, id, token) => {
  dispatch(getCartStart());
  try {
    const res = await axios.get(`${BASE_URL}carts/find/${id}`, {
      headers: { token: `Bearer ${token}` },
    });

    dispatch(getCartWithLogin(res?.data?.products));
  } catch (error) {
    dispatch(getCartFailure());
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
export const createUpdateCart = async (dispatch, id, token, product) => {
  dispatch(getCartStart());
  try {
    const res = await axios.post(`${BASE_URL}carts/${id}`, product, {
      headers: { token: `Bearer ${token}` },
    });
    dispatch(addProduct(res?.data?.products));
  } catch (error) {
    dispatch(getCartFailure());
  }
};

// change product quantity in cart +

export const changeQuantityDB = async (
  dispatch,
  userId,
  id,
  quantity,
  token
) => {
  dispatch(getCartStart());
  try {
    await axios.put(
      `${BASE_URL}carts/${userId}`,
      { quantity, id },
      {
        headers: { token: `Bearer ${token}` },
      }
    );
    // await userRequest.put(`/carts/${userId}`, { quantity, id });

    dispatch(setProductQuantity({ id, quantity }));
  } catch (error) {
    dispatch(getCartFailure());
  }
};

// delete nur ein product from cart +

export const deleteoneProductfromDB = async (dispatch, userId, id, token) => {
  dispatch(getCartStart());
  try {
    await axios.post(
      `${BASE_URL}carts/delete/${userId}`,
      { id: id },
      {
        headers: { token: `Bearer ${token}` },
      }
    );
    // await userRequest.post(`/carts/delete/${userId}`, { id: id });

    dispatch(deleteProduct(id));
  } catch (error) {
    dispatch(getCartFailure());
  }
};

// delete all product from cart an move to orders

export const moveProductstoOrdersAndDelete = async (
  dispatch,
  userId,
  idList,
  token
) => {
  dispatch(getCartStart);
  try {
    await axios.delete(`${BASE_URL}carts/${userId}`, {
      headers: { token: `Bearer ${token}` },
    });
    increaseSaleAmount(userId, idList, token);

    dispatch(addProductsToOrders());

    // await userRequest.delete(`/carts/${userId}`)
  } catch (error) {
    dispatch(getCartFailure());
  }
};

// increase SAleAmount in DB
export const increaseSaleAmount = async (userId, idList, token) => {
  try {
    await axios.put(
      `${BASE_URL}products/salesupdate/${userId}`,
      { id: idList },
      {
        headers: { token: `Bearer ${token}` },
      }
    );

    // await userRequest.put(`/products/salesupdate/${userId}`, idList);
  } catch (error) {
    console.log(error);
  }
};
