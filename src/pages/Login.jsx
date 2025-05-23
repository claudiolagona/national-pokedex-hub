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
    console.log("Dati inseriti:", data);
  };

  if (isLoggedIn) return <Navigate to="/" />;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
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
            className="w-full bg-red-600 text-white py-2 rounded hover:bg-blue-700 cursor-pointer transition"
            disabled={authStatus === "loading"}
          >
            {authStatus === "loading" ? "Logging in..." : "Login"}
          </button>

          {authStatus === "failed" && (
            <p className="text-red-500 text-center mt-3">{error}</p>
          )}
        </form>
      </FormProvider>
    </div>
  );
};
