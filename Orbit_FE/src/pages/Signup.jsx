import { Link } from "react-router-dom";
import { Camera } from "lucide-react";
import { useFileHandler, useInputValidation } from "6pp";
import { usernameValidator } from "../utils/validators";
import AuthLayout from "../components/layout/AuthLayout";

const Signup = () => {
  const name = useInputValidation("");
  const bio = useInputValidation("");
  const username = useInputValidation("", usernameValidator);
  const password = useInputValidation("");

  const avatar = useFileHandler("single");

  const handleSignup = (e) => {
    e.preventDefault();
  };

  return (
    <AuthLayout title="Create Account">
      <form onSubmit={handleSignup} className="space-y-4">
        <div className="flex justify-center">
          <div className="relative">
            <img
              src={avatar.preview || "https://placehold.co/120x120?text=Avatar"}
              alt=""
              className="h-28 w-28 rounded-full border object-cover"
            />

            <label className="absolute bottom-0 right-0 cursor-pointer rounded-full bg-blue-600 p-2 text-white hover:bg-blue-700">
              <Camera size={18} />

              <input
                type="file"
                className="hidden"
                onChange={avatar.changeHandler}
              />
            </label>
          </div>
        </div>

        {avatar.error && (
          <p className="text-center text-red-500 text-sm">{avatar.error}</p>
        )}

        <input
          type="text"
          placeholder="Full Name"
          required
          value={name.value}
          onChange={name.changeHandler}
          className="w-full rounded-lg border px-4 py-2 outline-none focus:border-blue-500"
        />

        <textarea
          placeholder="Bio"
          required
          rows={3}
          value={bio.value}
          onChange={bio.changeHandler}
          className="w-full rounded-lg border px-4 py-2 outline-none focus:border-blue-500"
        />

        <input
          type="text"
          placeholder="Username"
          required
          value={username.value}
          onChange={username.changeHandler}
          className="w-full rounded-lg border px-4 py-2 outline-none focus:border-blue-500"
        />

        {username.error && (
          <p className="text-red-500 text-sm">{username.error}</p>
        )}

        <input
          type="password"
          placeholder="Password"
          required
          value={password.value}
          onChange={password.changeHandler}
          className="w-full rounded-lg border px-4 py-2 outline-none focus:border-blue-500"
        />

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 py-2 text-white hover:bg-blue-700"
        >
          Create Account
        </button>
      </form>

      <p className="mt-6 text-center text-gray-500">Already have an account?</p>

      <Link
        to="/login"
        className="mt-2 block text-center text-blue-600 hover:underline"
      >
        Login
      </Link>
    </AuthLayout>
  );
};

export default Signup;
