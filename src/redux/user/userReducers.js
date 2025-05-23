const initialState = {
  currentUser: null,
  isLoggedIn: false,
  authStatus: "idle",
  error: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "user/startLogin":
      return { ...state, authStatus: "loading", error: null };
    case "user/loginSuccess":
      return {
        ...state,
        authStatus: "succeeded",
        isLoggedIn: true,
        currentUser: action.payload,
      };
    case "user/loginFail":
      return { ...state, authStatus: "failed", error: action.payload };
    case "user/logout":
      return { ...initialState };
    default:
      return state;
  }
};
