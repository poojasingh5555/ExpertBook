import axios from "axios";

const API = axios.create({
  baseURL: "https://expertbook.onrender.com",
});

export default API;
