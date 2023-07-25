import axios from "axios";
import { SignInStep } from "../app/Auth/signIn/SignInSlice";
import { store } from "../app/store/store";

// const EndPoint =
//   process.env.REACT_APP_BASEURL + process.env.REACT_APP_API_VERSION;

// const EndPoint = "http://192.168.1.50:3003/";
const EndPoint = "https://pvh70dmep5.execute-api.us-east-2.amazonaws.com/Dev/";



const Api = axios.create({
  timeout: 1000000,
  baseURL: EndPoint
});

Api.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
Api.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
Api.interceptors.request.use(
  (config) => {
    if (store.getState()?.LoginSlice?.data?.token) {
      const token = `Bearer ${store.getState()?.LoginSlice?.data?.token}`;
      config.headers = {
        Authorization: token
      };
    } else {
      // const lang = store.getState().languageDirection.language;
      console.log(store);
    }
    return config;
  },
  (error) =>
    // Do something with request error
    Promise.reject(error)
);

// Add a response interceptor
Api.interceptors.response.use(
  (response) => {
    if (response.data.status === 401) {
      store.dispatch(SignInStep(null));
    } else {
      return response;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default Api;
