import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
} from "lucide-react";

export default function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] =
    useState(false);

  const [form, setForm] = useState({
    emailOrPhone: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.emailOrPhone ||
      !form.password
    ) {
      setError(
        "Please enter your email/phone and password."
      );
      return;
    }

    const savedUser = JSON.parse(
      localStorage.getItem(
        "foodiehub-user"
      ) || "null"
    );

    if (!savedUser) {
      setError(
        "No account found. Please register first."
      );
      return;
    }

    const identifierMatches =
      savedUser.email ===
        form.emailOrPhone.trim() ||
      savedUser.phone ===
        form.emailOrPhone.trim();

    const passwordMatches =
      savedUser.password ===
      form.password;

    if (
      !identifierMatches ||
      !passwordMatches
    ) {
      setError(
        "Invalid email/phone or password."
      );
      return;
    }

    localStorage.setItem(
      "foodiehub-logged-in",
      "true"
    );

    localStorage.setItem(
      "foodiehub-current-user",
      savedUser.name
    );

    window.dispatchEvent(
      new Event("loginUpdated")
    );

    const redirect =
      sessionStorage.getItem(
        "foodiehub-redirect-after-login"
      );

    sessionStorage.removeItem(
      "foodiehub-redirect-after-login"
    );

    navigate(
      redirect || "/",
      { replace: true }
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-lg">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-gray-600 hover:text-orange-500 font-medium mb-5"
        >
          <ArrowLeft size={18} />
          Back to Home
        </button>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 sm:p-9">
          <div className="text-center mb-7">
            <div className="text-4xl">
              🍽️
            </div>

            <h1 className="text-3xl font-black text-gray-900 mt-3">
              Welcome Back 👋
            </h1>

            <p className="text-gray-500 text-sm mt-2">
              Login to your FoodieHub account.
            </p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 border border-red-100 rounded-xl px-4 py-3 text-sm mb-5">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            {/* Email / Phone */}

            <div className="flex items-center gap-3 border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-100">
              <Mail
                size={18}
                className="text-gray-400"
              />

              <input
                name="emailOrPhone"
                type="text"
                placeholder="Email or Phone Number"
                value={
                  form.emailOrPhone
                }
                onChange={handleChange}
                className="w-full bg-transparent outline-none text-sm"
              />
            </div>

            {/* Password */}

            <div className="flex items-center gap-3 border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-100">
              <Lock
                size={18}
                className="text-gray-400"
              />

              <input
                name="password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="w-full bg-transparent outline-none text-sm"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="text-gray-400"
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl transition shadow-lg shadow-orange-500/20"
            >
              Login
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don't have an account?{" "}
            <button
              onClick={() =>
                navigate("/register")
              }
              className="text-orange-600 font-bold hover:underline"
            >
              Create Account
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}