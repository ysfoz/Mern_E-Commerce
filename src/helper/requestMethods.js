import axios from "axios";
import { getUserFailure, getUserStart, loginSuccess,registerSuccess,logoutSuccess,getUserDeleteSuccess,getUserUpdate } from "../redux/userRedux";

const BASE_URL ="https://mern-e-commerce-api.herokuapp.com/api/";




const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root"))?.user)?.jwtToken
console.log("🚀 ~ file: requestMethods.js ~ line 10 ~ TOKEN11", TOKEN)


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
    console.log(res)
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

//update did not work
export const updateUser = async (dispatch, id, user) => {
console.log("🚀 ~ file: requestMethods.js ~ line 60 ~ updateUser ~ id", id)
console.log("🚀 ~ file: requestMethods.js ~ line 60 ~ updateUser ~ user", user)

  
  dispatch(getUserStart());
  try {
   const res = await userRequest.put(`/users/${id}`, user);
   console.log("🚀 ~ file: requestMethods.js ~ line 65 ~ updateUser ~ res", res)
    
    dispatch(getUserUpdate(res?.data));
  } catch (error) {
    console.log("🚀 ~ file: requestMethods.js ~ line 70 ~ updateUser ~ error", error)
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



