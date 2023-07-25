import { message } from "antd";
import axios from "axios";

export const verifyGoogleToken = async (token, handleResponse) => {
  const response = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
    headers: { Authorization: `Bearer ${token?.access_token}` }
  });
  if (response?.status === 200) {
    const data = response?.data;
    let obj = {
      name: data?.name,
      email: data?.email,
      googleId: data?.sub
    };
    handleResponse(obj);
  } else {
    message.error(response?.message);
  }
};
