import { startLogin, loginSuccess, loginFail } from "./userActions";
import { loginUser } from "../../api/jsonServer";

export const loginThunk = (username, password) => async (dispatch) => {
  dispatch(startLogin());
  try {
    const user = await loginUser(username, password);
    user
      ? dispatch(loginSuccess(user))
      : dispatch(loginFail("Wrong credentials"));
  } catch (error) {
    dispatch(loginFail(error));
  }
};
