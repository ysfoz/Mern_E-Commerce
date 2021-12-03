import axios from "axios";
import { fetchFailure, fetchStart, loginSuccess } from "../redux/userRedux";

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

export const login = async (dispatch, user) => {
  dispatch(fetchStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    console.log(res)
    dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(fetchFailure());
  }
};
