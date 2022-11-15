export const saveUser = (user: any) => {
  sessionStorage.setItem("sessionData", JSON.stringify(user));
  // sessionStorage.setItem("user", user);
  // sessionStorage.setItem("access_token", user.access_token);
};

export const clearUser = (user: any) => {
  sessionStorage.removeItem("user");
};

export const getUser = () => {
  return sessionStorage.getItem("sessionData");
  // return sessionStorage.getItem("user");
};
