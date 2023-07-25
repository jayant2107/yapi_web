// Auth Apis

import { getApi, postApi, putApi } from "./ApiMethod";
import { getApiExternal, postApiExternal } from "./ExternalCxcTeam/ApiMethodForExternal";

const SIGNUP_USER = "user/register";
const LOGIN_USER = "user/login";
const GOOGLE_SIGNUP = "user/loginWithGoogleId";
const FORGOT_PASSWORD = "user/forgotPassword";
const SETNEW_PASSWORD = "user/resetPassword";
const UPDATE_PROFILE_STATUS = "user/updateProfileStatus";
const GET_WORKSPACE_LISTING = "user/getWorkSpaceList";
const SWITCH_WORKSPACE = "user/switchWorkSpace";
const CREATE_WORKSPACE = "/user/createWorkSpace";
const CREATE_PAYER = "/payment/addPayerDetails";
const UPDATE_PAYER = "/payment/updatePayerDetails";
const LOGIN_MANAGER = "auth/login/webapp";



// Recording Apis
const RECORDING_LISTING = "recordings/start-stop-status/recordings";
const RECORDING_DETAILS = "/recordings/start-stop-status/recordings/details";

// Payment apis
const SAVED_CARD_DETAILS = "payment/createCustomerAndAttachPaymentMethod";
const PAYMENT_INTENT = "payment/createPaymentIntent";

// Team Module Apis
const GET_TRADES_LIST = "teams/trades";
const TEAM_LISTING = "teams";
const MANAGERS_LIST = "teams/managers";
const ON_GOING_RECORDINGS = "teams/on-going-recordings";
const ENABLE_DISABLE = "teams/enable-recording";



// Auth Apis

export const signupUser = (payload) => {
  return postApi(SIGNUP_USER, payload);
};
export const loginUser = (payload) => {
  return postApi(LOGIN_USER, payload);
};
export const SignupWithGoogle = (payload) => {
  return postApi(GOOGLE_SIGNUP, payload);
};
export const forgotPassword = (payload) => {
  return postApi(FORGOT_PASSWORD, payload);
};
export const resetPassword = (payload) => {
  return postApi(SETNEW_PASSWORD, payload);
};
export const updateProfileStatus = (payload) => {
  return putApi(UPDATE_PROFILE_STATUS, payload);
};
export const getWorkspaceListing = () => {
  return getApi(GET_WORKSPACE_LISTING);
};

// Recording Apis
export const getRecordingListing = (payload) => {
  return getApiExternal(
    `${RECORDING_LISTING}?${payload}`
  );
};

export const getRecordingDetail = (payload) => {
  return getApiExternal(
    `${RECORDING_DETAILS}?db=${payload?.name}&user_id=${payload?.userId}&db_name=${payload?.name}&record_id=${payload?.recordId}&arrived_on=${payload?.arrived_on}`
  );
};

// Payment apis

export const savedCardPaymentMethod = (payload) => {
  return postApi(SAVED_CARD_DETAILS, payload);
};

export const createPaymentIntent = (payload) => {
  return postApi(PAYMENT_INTENT, payload);
};

const SLACK_CONNECTION = "/slack/connections";
export const slackConnection = (payload) => {
  return postApiExternal(`${SLACK_CONNECTION}?db=${payload?.db_name}`, payload);
};

// Team module Apis

export const getTradesListing = (payload) => {
  return getApiExternal(`${GET_TRADES_LIST}?${payload}`);
};
export const getTeamListing = (payload) => {
  return getApiExternal(`${TEAM_LISTING}?${payload}`);
};

export const switchWorkspace = (payload) => {
  return putApi(SWITCH_WORKSPACE, payload);
};

export const createWorkspace = (payload) => {
  return postApi(CREATE_WORKSPACE, payload);
};
export const getManagerListing = (payload) => {
  return getApiExternal(`${MANAGERS_LIST}?${payload}`);
};
export const assignTrade = (id, payload) => {
  return postApiExternal(`${GET_TRADES_LIST}?${id}`, payload);
};
export const editTeamMembers = (id, payload) => {
  return postApiExternal(`${TEAM_LISTING}?${id}`, payload);
};
export const assignManager = (id, payload) => {
  return postApiExternal(`${MANAGERS_LIST}?${id}`, payload);
};
export const onGoingRecordingList = (id) => {
  return getApiExternal(`${ON_GOING_RECORDINGS}?${id}`);
};

export const enabledisablerecording = (id , payload) => {
  return postApiExternal(`${ENABLE_DISABLE}?${id}` , payload);
};

export const createPayer = (payload) => {
  return putApi(CREATE_PAYER, payload);
};

export const editPayer = (payload) => {
  return putApi(UPDATE_PAYER, payload);
};

export const loginInAsManager = (payload) => {
  return postApiExternal(LOGIN_MANAGER , payload);
};