import axios from "axios"

const BASE_URL = "http://localhost:5001/api/"
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOWU1NGJlNWNkMjczOGIzOTJkYzI0YyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzNzc3OTU1NywiZXhwIjoxNjM4MDM4NzU3fQ.StV_SRxeieyF9HJUP6cZW_J0wNd895tnubgQVihNn0Q"

export const publicRequest = axios.create({
    baseURL : BASE_URL
});

export const userRequest = axios.create({
    baseURL:BASE_URL,
    headers:{token:`Bearer ${TOKEN}`}
})
