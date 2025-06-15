import { useForm, FormProvider } from "react-hook-form";
import { InputFields } from "../components/form/InputFields";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "../redux/user/userThunks";
import { Navigate } from "react-router-dom";

export const Login = () => {
  const dispatch = useDispatch();
  const methods = useForm();

  const { authStatus, isLoggedIn, error } = useSelector((state) => state.user);

  const onSubmit = async (data) => {
    const { username, password } = data;
    dispatch(loginThunk(username, password));
  };

  if (isLoggedIn) return <Navigate to="/" />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-red-100 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
          Login
        </h2>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            noValidate
            className="space-y-6"
          >
            <InputFields
              name="username"
              label="Username"
              placeholder="Insert your username"
              rules={{ required: "Username is required" }}
            />
            <InputFields
              name="password"
              label="Password"
              type="password"
              placeholder="Insert your password"
              rules={{ required: "Password is required" }}
            />

            <button
              type="submit"
              className={`w-full py-2 rounded text-white font-semibold transition duration-200 cursor-pointer ${
                authStatus === "loading"
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700"
              }`}
              disabled={authStatus === "loading"}
            >
              {authStatus === "loading" ? "Logging in..." : "Login"}
            </button>

            {authStatus === "failed" && (
              <p className="text-red-500 text-center text-sm mt-2 transition">
                {error}
              </p>
            )}
          </form>
        </FormProvider>
      </div>
    </div>
  );
};
