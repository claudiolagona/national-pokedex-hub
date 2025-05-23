// Action to start the Login
export const startLogin = () => ({
  type: "user/startLogin",
});

// Action to a succes while Login
export const loginSuccess = (user) => ({
  type: "user/loginSuccess",
  payload: user,
});

// Action to a failure while Login
export const loginFail = (error) => ({
  type: "user/loginFail",
  payload: error,
});

// Action to Logout
export const logout = () => ({
  type: "user/logout",
});
