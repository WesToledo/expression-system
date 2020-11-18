export const TOKEN_KEY = "user_token";
export const USER_ID = "user_id";
export const USER_NAME = "user_name";
export const USER_TYPE = "user_type";

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const login = (token, userId, userName, userType) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_ID, userId);
  localStorage.setItem(USER_NAME, userName);
  localStorage.setItem(USER_TYPE, userType);
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_ID);
};

export const getUserInfo = () => {
  return {
    name: localStorage.getItem(USER_NAME),
    type: localStorage.getItem(USER_TYPE),
  };
};

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
