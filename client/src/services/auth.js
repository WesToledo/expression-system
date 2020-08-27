export const TOKEN_KEY = 'user_token';
export const USER_ID = 'user_id';

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const login = (token, userId) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_ID, userId);
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_ID);
};

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;

