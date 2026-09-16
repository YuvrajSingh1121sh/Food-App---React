import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  UserPlus,
  Utensils,
} from "lucide-react";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [error, setError] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    setError("");

    /* -----------------------------
       Validation
    ----------------------------- */

    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (name.trim().length < 2) {
      setError("Please enter your full name.");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError(
        "Password must be at least 6 characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    /* -----------------------------
       Check existing account
    ----------------------------- */

    const existingUser = JSON.parse(
      localStorage.getItem("foodiehub-user")
    );

    if (
      existingUser &&
      existingUser.email.toLowerCase() ===
        email.toLowerCase()
    ) {
      setError(
        "An account with this email already exists."
      );
      return;
    }

    /* -----------------------------
       Create user
    ----------------------------- */

    const user = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
    };

    localStorage.setItem(
      "foodiehub-user",
      JSON.stringify(user)
    );

    /* -----------------------------
       Login user automatically
    ----------------------------- */

    localStorage.setItem(
      "foodiehub-logged-in",
      "true"
    );

    localStorage.setItem(
      "foodiehub-current-user",
      JSON.stringify(user)
    );

    /* -----------------------------
       Go to Home
    ----------------------------- */

    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 relative overflow-hidden">

      {/* Decorative Background */}

      <div className="absolute -top-24 -right-24 w-72 h-72 bg-orange-200/40 rounded-full blur-3xl" />

      <div className="absolute top-1/3 -left-32 w-80 h-80 bg-yellow-200/40 rounded-full blur-3xl" />

      <div className="absolute -bottom-32 right-1/3 w-96 h-96 bg-orange-100/60 rounded-full blur-3xl" />

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

      <div className="relative min-h-screen flex items-center justify-center px-4 py-8 sm:py-10">

        <div className="w-full max-w-md">

          {/* Back */}

          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-500 mb-5 transition"
          >
            <ArrowLeft size={18} />
            Back to Login
          </Link>

          {/* Card */}

          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-white p-6 sm:p-8">

            {/* Logo */}

            <div className="flex flex-col items-center text-center">

              <div className="w-16 h-16 rounded-2xl bg-orange-500 text-white flex items-center justify-center shadow-lg shadow-orange-200">
                <Utensils size={30} />
              </div>

              <h1 className="text-3xl sm:text-4xl font-black mt-5">
                Join Foodie
                <span className="text-orange-500">
                  Hub
                </span>
              </h1>

              <p className="text-gray-500 mt-2">
                Create your account and start ordering.
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
              onSubmit={handleRegister}
              className="mt-7 space-y-4"
            >

              {/* Name */}

              <div>

                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>

                <div className="relative">

                  <User
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    value={name}
                    onChange={(e) =>
                      setName(e.target.value)
                    }
                    placeholder="Enter your full name"
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

                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>

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
                    placeholder="Create a password"
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

                <p className="text-xs text-gray-400 mt-1.5">
                  Use at least 6 characters.
                </p>

              </div>

              {/* Confirm Password */}

              <div>

                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Confirm Password
                </label>

                <div className="relative">

                  <Lock
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(
                        e.target.value
                      )
                    }
                    placeholder="Confirm your password"
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
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
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
                    {showConfirmPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>

                </div>

              </div>

              {/* Register */}

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
                  mt-2
                "
              >
                <UserPlus size={19} />
                Create Account
              </button>

            </form>

            {/* Login */}

            <div className="text-center mt-7 pt-6 border-t border-gray-100">

              <p className="text-gray-500 text-sm">
                Already have an account?
              </p>

              <Link
                to="/login"
                className="inline-block mt-1 text-orange-500 font-bold hover:text-orange-600"
              >
                Login to your account
              </Link>

            </div>

          </div>

          <p className="text-center text-xs text-gray-400 mt-5">
            © 2026 FoodieHub. All rights reserved.
          </p>

        </div>

      </div>
    </div>
  );
}