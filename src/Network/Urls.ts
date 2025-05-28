const BASE_URL = 'https://staging-api.ourclassconnect.com';
export const ewcApiKey = '65A9A772-409F-4120-A2D3-30F78D8E76F8';
export const ewcAppId = '117B9FE0-9D5D-4A9A-9E71-469415821009';

// User Auth Urls
export const SIGNUP_URL = BASE_URL + '/v1/parents/signup';
export const LOGIN_URL = BASE_URL + '/v1/auth/parents/signin';
export const SIGNOUT_URL = BASE_URL + '/v1/auth/parents/signout';
export const VERIFY_REG_CODE_URL = BASE_URL + '/v1/auth/parents/verify-regcode';
export const GOOGLE_SIGNUP_REQUEST_URL = BASE_URL + '/v1/parents/google-signup';
export const GOOGLE_SIGNIN_REQUEST_URL =
  BASE_URL + '/v1/auth/parents/google-signin';
export const GET_GOOGLE_USERINFO_URL =
  'https://www.googleapis.com/oauth2/v2/userinfo';
export const FORGET_PASSWORD_URL =
  BASE_URL + '/v1/auth/parents/forgot-password';

//Parent Home Url
export const GET_CHILD_LIST_URL = BASE_URL + '/v1/students/parents/';
