import axios from "axios";

/* base url to make requests to the movie darabase */
const instance = axios.create({
  baseURL: "/api/",
  timeout: 1000,
  headers: { Accept: "*/*" },
});

export default instance;
