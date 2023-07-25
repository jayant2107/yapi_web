import Api from "./Interceptor";

const LOGIN_URL = "restaurents/restaurentLogin";
const ForgotPassword_URL = "restaurents/forgotPassword";

//Login Api
export const loginApi = async (data) => {
  try {
    let result = await Api.post(LOGIN_URL, data);
    if (result.status === 200) {
      if (result.data.status === 200) {
        return result.data;
      } else {
        return result.data.message;
      }
    }
  } catch (error) {
    if (error) {
      return error;
    }
  }
};

export const ForgotPasswordApi = async (data) => {
  try {
    let result = await Api.post(ForgotPassword_URL, data);
    if (result.status === 200) {
      if (result.data.status === 200) {
        return result.data;
      } else {
        return result.data.message;
      }
    }
  } catch (error) {
    if (error) {
      return error;
    }
  }
};