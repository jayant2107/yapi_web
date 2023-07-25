import axios from "axios";
import { SignInStep } from "../../app/Auth/signIn/SignInSlice";
import { store } from "../../app/store/store";

// const EndPoint = "https://zwyqzr416a.execute-api.us-east-2.amazonaws.com/prod/api/v1";
const EndPoint = "https://2t22l5tik1.execute-api.us-west-2.amazonaws.com/prod/api/v1";

const ExternalApi = axios.create({
  timeout: 1000000,
  baseURL: EndPoint
});

ExternalApi.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
ExternalApi.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
ExternalApi.interceptors.request.use(
  (config) => {
    const username = "adlevapis";
    const password = "hbP6BysGU9mcKaW6n1OEGRsYqoh77VP5";
    const btoaToken = btoa(`${username}:${password}`);
    const token = "Basic " + btoaToken;
    if (token) {
      //   const token = "Basic YWRsZXZhcGlzOm13OE9IQmp6Tjg1NlhyaWtSRGVYMTlXMDI4czdjdkVv";
      config.headers = {
        Authorization: token
      };
    }
    return config;
  },
  (error) =>
    // Do something with request error
    Promise.reject(error)
);

// Add a response interceptor
ExternalApi.interceptors.response.use(
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
export default ExternalApi;
