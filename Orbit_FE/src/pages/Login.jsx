import { Link } from "react-router-dom";
import { useInputValidation } from "6pp";
import { usernameValidator } from "../utils/validators";
import AuthLayout from "../components/layout/AuthLayout";

const Login = () => {
  const username = useInputValidation("", usernameValidator);
  const password = useInputValidation("");

  const handleLogin = (e) => {
    e.preventDefault();
  };

  return (
    <AuthLayout title="Login">
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium">Username</label>

          <input
            type="text"
            required
            value={username.value}
            onChange={username.changeHandler}
            className="w-full rounded-lg border px-4 py-2 focus:border-blue-500 outline-none"
          />

          {username.error && (
            <p className="mt-1 text-sm text-red-500">{username.error}</p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Password</label>

          <input
            type="password"
            required
            value={password.value}
            onChange={password.changeHandler}
            className="w-full rounded-lg border px-4 py-2 focus:border-blue-500 outline-none"
          />
        </div>

        <button
          className="w-full rounded-lg bg-blue-600 py-2 text-white hover:bg-blue-700"
          type="submit"
        >
          Login
        </button>
      </form>

      <p className="mt-6 text-center text-gray-500">Don't have an account?</p>

      <Link
        to="/signup"
        className="mt-2 block text-center text-blue-600 hover:underline"
      >
        Create Account
      </Link>
    </AuthLayout>
  );
};

export default Login;
