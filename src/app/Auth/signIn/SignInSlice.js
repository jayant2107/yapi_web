import { createSlice } from "@reduxjs/toolkit";

export const SignInSlice = createSlice({
  name: "SignInSlice",
  initialState: {
    data: null,
    sideNav: false,
    notificationTab: 1,
    rememberMe: null,
    verifyOtp: null
  },
  reducers: {
    SignInStep: (state, actions) => {
      if (actions) {
        state.data = actions.payload;
      }
    }
  }
});

export const { SignInStep, OpenSideNav, NotificationTabs, RememberMe, VerifyOtpAction } =
  SignInSlice.actions;
export default SignInSlice.reducer;
