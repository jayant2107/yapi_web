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
    },
    OpenSideNav: (state, action) => {
      if (action) {
        state.sideNav = action.payload;
      }
    },
    NotificationTabs: (state, action) => {
      if (action) {
        if (action.payload) {
          state.notificationTab = action.payload;
        }
      }
    },
    RememberMe: (state, action) => {
      if (action.payload) {
        state.rememberMe = action.payload;
      }
    },
    VerifyOtpAction: (state, action) => {
      if (action) {
        state.verifyOtp = action?.payload;
      }
    }
  }
});

export const { SignInStep, OpenSideNav, NotificationTabs, RememberMe, VerifyOtpAction } =
  SignInSlice.actions;
export default SignInSlice.reducer;
