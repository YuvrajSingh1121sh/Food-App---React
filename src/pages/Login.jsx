import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  LogIn,
  Utensils,
} from "lucide-react";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    setError("");

    /* -----------------------------
       Basic validation
    ----------------------------- */

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    /* -----------------------------
       Get registered user
    ----------------------------- */

    const registeredUser = JSON.parse(
      localStorage.getItem("foodiehub-user")
    );

    if (!registeredUser) {
      setError(
        "No account found. Please register first."
      );
      return;
    }

    /* -----------------------------
       Check credentials
    ----------------------------- */

    if (
      registeredUser.email !== email ||
      registeredUser.password !== password
    ) {
      setError("Invalid email or password.");
      return;
    }

    /* -----------------------------
       Save login session
    ----------------------------- */

    localStorage.setItem(
      "foodiehub-logged-in",
      "true"
    );

    localStorage.setItem(
      "foodiehub-current-user",
      JSON.stringify(registeredUser)
    );

    /* -----------------------------
       Go to Home
    ----------------------------- */

    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 relative overflow-hidden">

      {/* Decorative Background */}

      <div className="absolute -top-24 -left-24 w-72 h-72 bg-orange-200/40 rounded-full blur-3xl" />

      <div className="absolute top-1/3 -right-32 w-80 h-80 bg-yellow-200/40 rounded-full blur-3xl" />

      <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-orange-100/60 rounded-full blur-3xl" />

      {/* Food Icons */}

      <div className="absolute top-20 left-8 sm:left-16 text-4xl sm:text-6xl opacity-20 rotate-12">
        🍕
      </div>

      <div className="absolute top-40 right-8 sm:right-20 text-4xl sm:text-6xl opacity-20 -rotate-12">
        🍔
      </div>

      <div className="absolute bottom-20 left-10 sm:left-24 text-4xl sm:text-6xl opacity-20 rotate-12">
        🍟
      </div>

      <div className="absolute bottom-24 right-10 sm:right-24 text-4xl sm:text-6xl opacity-20 -rotate-12">
        🍜
      </div>

      {/* Main */}

      <div className="relative min-h-screen flex items-center justify-center px-4 py-10">

        <div className="w-full max-w-md">

          {/* Back to Home */}

          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-500 mb-6 transition"
          >
            <ArrowLeft size={18} />
            Back
          </Link>

          {/* Card */}

          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-white p-6 sm:p-8">

            {/* Logo */}

            <div className="flex flex-col items-center text-center">

              <div className="w-16 h-16 rounded-2xl bg-orange-500 text-white flex items-center justify-center shadow-lg shadow-orange-200">
                <Utensils size={30} />
              </div>

              <h1 className="text-3xl sm:text-4xl font-black mt-5">
                Foodie
                <span className="text-orange-500">
                  Hub
                </span>
              </h1>

              <p className="text-gray-500 mt-2">
                Welcome back! Login to continue.
              </p>

            </div>

            {/* Error */}

            {error && (
              <div className="mt-6 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">
                {error}
              </div>
            )}

            {/* Form */}

            <form
              onSubmit={handleLogin}
              className="mt-7 space-y-5"
            >

              {/* Email */}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>

                <div className="relative">

                  <Mail
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    placeholder="Enter your email"
                    className="
                      w-full
                      border border-gray-200
                      rounded-xl
                      pl-11 pr-4
                      py-3.5
                      outline-none
                      focus:border-orange-500
                      focus:ring-2
                      focus:ring-orange-100
                      transition
                    "
                  />

                </div>
              </div>

              {/* Password */}

              <div>

                <div className="flex justify-between items-center mb-2">

                  <label className="text-sm font-semibold text-gray-700">
                    Password
                  </label>

                  <button
                    type="button"
                    className="text-xs sm:text-sm text-orange-500 hover:text-orange-600 font-medium"
                    onClick={() =>
                      alert(
                        "Password reset will be available soon."
                      )
                    }
                  >
                    Forgot Password?
                  </button>

                </div>

                <div className="relative">

                  <Lock
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    placeholder="Enter your password"
                    className="
                      w-full
                      border border-gray-200
                      rounded-xl
                      pl-11 pr-12
                      py-3.5
                      outline-none
                      focus:border-orange-500
                      focus:ring-2
                      focus:ring-orange-100
                      transition
                    "
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="
                      absolute
                      right-4
                      top-1/2
                      -translate-y-1/2
                      text-gray-400
                      hover:text-gray-700
                    "
                  >
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>

                </div>
              </div>

              {/* Login */}

              <button
                type="submit"
                className="
                  w-full
                  bg-orange-500
                  hover:bg-orange-600
                  text-white
                  font-bold
                  py-3.5
                  rounded-xl
                  flex
                  items-center
                  justify-center
                  gap-2
                  shadow-lg
                  shadow-orange-200
                  transition
                  active:scale-[0.98]
                "
              >
                <LogIn size={19} />
                Login
              </button>

            </form>

            {/* Register */}

            <div className="text-center mt-7 pt-6 border-t border-gray-100">

              <p className="text-gray-500 text-sm">
                Don't have an account?
              </p>

              <Link
                to="/register"
                className="inline-block mt-1 text-orange-500 font-bold hover:text-orange-600"
              >
                Create an account
              </Link>

            </div>

          </div>

          <p className="text-center text-xs text-gray-400 mt-6">
            © 2026 FoodieHub. All rights reserved.
          </p>

        </div>

      </div>
    </div>
  );
}