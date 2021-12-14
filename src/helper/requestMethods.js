import axios from "axios";
import { getUserFailure, getUserStart, loginSuccess,registerSuccess,logoutSuccess,getUserDeleteSuccess,getUserUpdate } from "../redux/userRedux";

const BASE_URL ="https://mern-e-commerce-api.herokuapp.com/api/";

let TOKEN = {}

if (localStorage.getItem("persist:root")){
TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root"))?.user)?.currentUser?.jwtToken
}

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
    const res = await publicRequest.post("/auth/register", newuser);
    dispatch(registerSuccess(res?.data));
  } catch (error) {
    dispatch(getUserFailure());
  }
};

//update
export const updateUser = async (dispatch, id, user) => {
  
  dispatch(getUserStart());
  try {
   await userRequest.put(`/users/${id}`, user);
    
    dispatch(getUserUpdate(id, user));
  } catch (error) {
    dispatch(getUserFailure());
  }
};

//delete

export const deleteUser = async (id, dispatch) => {
  dispatch(getUserStart());
  try {
    await userRequest.delete(`/users/${id}`);

    dispatch(getUserDeleteSuccess(id));
  } catch (error) {
    dispatch(getUserFailure());
  }
};



