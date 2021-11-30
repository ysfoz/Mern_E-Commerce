import axios from "axios"

const BASE_URL = "http://localhost:5001/api/";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOWU1NGJlNWNkMjczOGIzOTJkYzI0YyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzODI4NTM4NCwiZXhwIjoxNjM4NTQ0NTg0fQ.EspRZ-6B-Uk8o2Rd5Ivz1Qm-DLDXcnzHL33fNWA-gW8"

export const publicRequest = axios.create({
    baseURL : BASE_URL
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: { token: `Bearer ${TOKEN}` },
  });