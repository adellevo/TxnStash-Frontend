import { MOCK_INFO } from "data/mock_info";

export const saveUser = (token: any) => {
  sessionStorage.setItem("sessionData", JSON.stringify(token));
  // sessionStorage.setItem("user", user);
  // sessionStorage.setItem("access_token", user.access_token);
};

export const saveUserData = (user: any) => {
  sessionStorage.setItem("user", JSON.stringify(user));
};

export const getUserData = () => {
  const user = sessionStorage.getItem("user");
  if (user) {
    return JSON.parse(user);
  }
  return MOCK_INFO.MOCK_ACCOUNT;
};

export const getUserId = () => {
  const user = sessionStorage.getItem("user");
  if (user) {
    return JSON.parse(user).id;
  }
  return MOCK_INFO.MOCK_ACCOUNT.userId;
};

export const clearUser = () => {
  sessionStorage.removeItem("sessionData");
};

export const getUser = () => {
  return sessionStorage.getItem("sessionData");
  // return sessionStorage.getItem("user");
};
