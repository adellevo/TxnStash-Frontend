export const saveUser = (token: any) => {
  sessionStorage.setItem("sessionData", JSON.stringify(token));
  // sessionStorage.setItem("user", user);
  // sessionStorage.setItem("access_token", user.access_token);
};

export const clearUser = () => {
  sessionStorage.removeItem("sessionData");
};

export const getUser = () => {
  return sessionStorage.getItem("sessionData");
  // return sessionStorage.getItem("user");
};
