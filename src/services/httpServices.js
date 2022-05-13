import axios from "axios";
import { toast } from "react-toastify";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.interceptors.response.use(null, (error) => {
  const expecteError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expecteError) {
    console.log("logging err", error);
    toast.error("an unexpected error occured");
  }
  return Promise.reject(error);
});

export function setJwt(jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}
const exportedObj = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
};
export default exportedObj;
