import axios from "axios";

const makeRequestBody = (jsonBody) => {
  try {
    let requestData = Object.keys(jsonBody)
      .map((key) => {
        return encodeURIComponent(key) + "=" + encodeURIComponent(jsonBody[key]);
      })
      .join("&");
    return requestData;
  } catch (error) {
    console.log("Error while making stripe request body: ", error);
  }
};

export const StripePaymentMethod = async (payload) => {
  let req = {
    "card[number]": payload?.cardNumber,
    "card[exp_month]": Number(payload?.validDate.split("/")?.[0]),
    "card[exp_year]": Number(payload?.validDate.split("/")?.[1]),
    "card[cvc]": payload?.cvc,
    "billing_details[name]": payload?.name,
    type: "card"
  };
  let encodePayload = makeRequestBody(req);

  console.log(encodePayload, "encodePayload");
  console.log(req, "payloadddddd----req");

  try {
    let result = await axios.post("https://api.stripe.com/v1/payment_methods", encodePayload, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Bearer sk_test_51N3542Gga6zbUjWII3x0AmqjFf1PSA3ySbYrs33GHDRTYIFqgaCFRyYeso9RqjfSpTMrialjLwrZ9IKXReqX1bif00Rs0fxuSD"
      }
    });
    if (result?.status === 200) {
      console.log(result, "result");
      return result?.data;
    } else {
      return result;
    }
  } catch (error) {
    return error;
  }
};

export const StripeListAllCards = async (stripeCustomer) => {
  try {
    let result = await axios.get(
      `https://api.stripe.com/v1/customers/${stripeCustomer}/payment_methods`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Bearer sk_test_51N3542Gga6zbUjWII3x0AmqjFf1PSA3ySbYrs33GHDRTYIFqgaCFRyYeso9RqjfSpTMrialjLwrZ9IKXReqX1bif00Rs0fxuSD"
        }
      }
    );
    if (result?.status === 200) {
      console.log(result, "result");
      return result?.data;
    } else {
      return result;
    }
  } catch (error) {
    return error;
  }
};

export const StripeConfirmIntent = async (payload) => {
  let req = {
    payment_method: "pm_card_visa"
  };
  let encodePayload = makeRequestBody(req);

  try {
    let result = await axios.post(
      `https://api.stripe.com/v1/payment_intents/${payload?.payment_intent_id}/confirm`,
      encodePayload,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Bearer sk_test_51N3542Gga6zbUjWII3x0AmqjFf1PSA3ySbYrs33GHDRTYIFqgaCFRyYeso9RqjfSpTMrialjLwrZ9IKXReqX1bif00Rs0fxuSD"
        }
      }
    );
    if (result?.status === 200) {
      console.log(result, "result");
      return result?.data;
    } else {
      return result;
    }
  } catch (error) {
    return error;
  }
};

export const StripeCreateBankAccountToken = async (payload) => {
  console.log(payload);
  let req = {
    "bank_account[country]": "IN",
    "bank_account[currency]": "inr",
    "bank_account[account_holder_name]": payload?.holdername,
    "bank_account[account_holder_type]": "individual",
    "bank_account[routing_number]": payload?.routingNumber,
    "bank_account[account_number]": payload?.accountNumber
  };
  let encodePayload = makeRequestBody(req);

  try {
    let result = await axios.post("https://api.stripe.com/v1/tokens", encodePayload, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Bearer sk_test_51N3542Gga6zbUjWII3x0AmqjFf1PSA3ySbYrs33GHDRTYIFqgaCFRyYeso9RqjfSpTMrialjLwrZ9IKXReqX1bif00Rs0fxuSD"
      }
    });
    if (result?.status === 200) {
      console.log(result, "result");
      return result?.data;
    } else {
      return result;
    }
  } catch (error) {
    return error;
  }
};

export const StripeCreateBankAccount = async (payload, customerId) => {
  let req = {
    source: payload?.id
  };
  let encodePayload = makeRequestBody(req);

  try {
    let result = await axios.post(
      `https://api.stripe.com/v1/customers/${customerId}/sources`,
      encodePayload,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Bearer sk_test_51N3542Gga6zbUjWII3x0AmqjFf1PSA3ySbYrs33GHDRTYIFqgaCFRyYeso9RqjfSpTMrialjLwrZ9IKXReqX1bif00Rs0fxuSD"
        }
      }
    );
    if (result?.status === 200) {
      console.log(result, "result");
      return result?.data;
    } else {
      return result;
    }
  } catch (error) {
    return error;
  }
};

export const StripeCustomerDetails = async (stripeCustomer) => {

    try {
      let result = await axios.get(
        `https://api.stripe.com/v1/customers/${stripeCustomer}`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization:
              "Bearer sk_test_51N3542Gga6zbUjWII3x0AmqjFf1PSA3ySbYrs33GHDRTYIFqgaCFRyYeso9RqjfSpTMrialjLwrZ9IKXReqX1bif00Rs0fxuSD"
          }
        }
      );
      if (result?.status === 200) {
        console.log(result, "result");
        return result?.data;
      } else {
        return result;
      }
    } catch (error) {
      return error;
    }


};