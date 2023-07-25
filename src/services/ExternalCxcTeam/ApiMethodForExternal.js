import ExternalApi from "./Interceptor.";


//get Api
export const getApiExternal = async (url) => {
  try {
    let result = await ExternalApi.get(url);
    if (result.status === 200) {
      if (result.data.status === 200 || result?.data?.message == "OK") {
        return result.data;
      } else {
        return result.data.message;
      }
    }
  } catch (e) {
    if (e) {
      return e;
    }
  }
};

//post Api
export const postApiExternal = async (url, data) => {
  try {
    let result = await ExternalApi.post(url, data);
    if (result.status === 200) {
      if (result.data.status === 200 || result?.data?.message == "OK") {
        return result.data;
      } else {
        return result.data.message;
      }
    }
  } catch (e) {
    if (e) {
      return e;
    }
  }
};

//put api

//put Api
export const putApiExternal = async (url, data) => {
  try {
    let result = await ExternalApi.put(url, data);
    if (result.status === 200) {
      if (result.data.status === 200) {
        return result.data;
      } else {
        return result.data.message;
      }
    }
  } catch (e) {
    if (e) {
      return e;
    }
  }
};

//delete Api
export const deleteApiExternal = async (url, data) => {
  try {
    let result = await ExternalApi.delete(url, { params: data });
    if (result.status === 200) {
      if (result.data.status === 200) {
        return result.data;
      } else {
        return result.data.message;
      }
    }
  } catch (e) {
    if (e) {
      return e;
    }
  }
};
