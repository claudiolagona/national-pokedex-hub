import { useForm, FormProvider } from "react-hook-form";
import { InputFields } from "../components/form/InputFields";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "../redux/user/userThunks";
import { Navigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 via-white to-red-200 px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white/70 dark:bg-white/10 backdrop-blur-lg border border-white/30 shadow-xl rounded-xl p-8"
      >
        <h2 className="text-3xl font-bold text-center text-red-500 mb-6 drop-shadow">
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

            <motion.button
              type="submit"
              whileTap={{ scale: 0.95 }}
              className={`w-full py-3 rounded-lg font-semibold transition duration-300 text-white cursor-pointer ${
                authStatus === "loading"
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700"
              }`}
              disabled={authStatus === "loading"}
            >
              {authStatus === "loading" ? "Logging in..." : "Login"}
            </motion.button>

            {authStatus === "failed" && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-500 text-center text-sm mt-2"
              >
                {error}
              </motion.p>
            )}
          </form>
        </FormProvider>
      </motion.div>
    </div>
  );
};
