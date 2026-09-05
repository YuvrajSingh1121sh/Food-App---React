import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Phone,
  Bike,
  Tag,
  ShieldCheck,
  ArrowLeft,
} from "lucide-react";

export default function Login() {
  const navigate = useNavigate();

  const [isLoginView, setIsLoginView] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-orange-100">

      {/* Decorative Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">

        {/* Large orange blobs */}
        <div className="absolute -top-32 -left-32 w-72 h-72 sm:w-96 sm:h-96 bg-orange-300/30 rounded-full blur-3xl" />

        <div className="absolute -bottom-40 -right-32 w-80 h-80 sm:w-[450px] sm:h-[450px] bg-orange-400/30 rounded-full blur-3xl" />

        <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-yellow-200/30 rounded-full blur-3xl" />

        {/* Food-themed decorative circles */}
        <div className="absolute top-20 right-10 sm:right-20 text-5xl sm:text-7xl opacity-10 rotate-12">
          🍕
        </div>

        <div className="absolute bottom-24 left-5 sm:left-20 text-5xl sm:text-7xl opacity-10 -rotate-12">
          🍔
        </div>

        <div className="absolute top-1/2 left-1/4 text-4xl opacity-10">
          🍟
        </div>

        <div className="absolute bottom-10 right-1/3 text-4xl opacity-10">
          🍜
        </div>

        {/* Decorative white circles */}
        <div className="absolute top-16 left-1/2 w-5 h-5 bg-white rounded-full shadow-lg opacity-70" />
        <div className="absolute bottom-32 right-16 w-8 h-8 bg-white rounded-full shadow-lg opacity-70" />
        <div className="absolute top-1/3 right-10 w-4 h-4 bg-orange-300 rounded-full" />

      </div>

      {/* Header */}
      <header className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6">

        <div className="flex items-center justify-between">

          {/* Logo */}
          <button
            type="button"
            onClick={() => navigate("/")}
            className="text-2xl sm:text-3xl font-black tracking-tight"
          >
            🍽️ Foodie
            <span className="text-orange-600">Hub</span>
          </button>

          {/* Back Home */}
          <button
            type="button"
            onClick={() => navigate("/")}
            className="hidden sm:flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-orange-600 transition"
          >
            <ArrowLeft size={17} />
            Back to Home
          </button>

          {/* Login/Register Toggle */}
          <button
            type="button"
            onClick={() => {
              setIsLoginView(!isLoginView);
              setShowPassword(false);
            }}
            className="border-2 border-orange-500 text-orange-600 font-bold px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm hover:bg-orange-50 transition bg-white/70 backdrop-blur"
          >
            {isLoginView
              ? "Create an account"
              : "Login"}
          </button>

        </div>
      </header>

      {/* Main */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Left Side */}
          <div className="hidden lg:block">

            <div className="max-w-lg">

              {/* Small Badge */}
              <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-bold mb-6">
                <span>🔥</span>
                Your food journey starts here
              </div>

              <h1 className="text-5xl xl:text-6xl font-black text-gray-900 leading-tight">

                {isLoginView ? (
                  <>
                    Good food,
                    <br />
                    <span className="text-orange-600">
                      delivered fast.
                    </span>
                  </>
                ) : (
                  <>
                    Good food,
                    <br />
                    <span className="text-orange-600">
                      good mood!
                    </span>
                  </>
                )}

              </h1>

              <p className="text-gray-500 text-lg mt-6 leading-relaxed">
                Discover delicious meals from your favorite
                restaurants and get them delivered straight
                to your doorstep.
              </p>

              {/* Benefits */}
              <div className="mt-8 space-y-4">

                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-orange-100 flex items-center justify-center">
                    <Bike
                      size={22}
                      className="text-orange-600"
                    />
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-900">
                      Fast Delivery
                    </h3>

                    <p className="text-sm text-gray-500">
                      Hot and fresh food at your doorstep
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-orange-100 flex items-center justify-center">
                    <Tag
                      size={22}
                      className="text-orange-600"
                    />
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-900">
                      Amazing Offers
                    </h3>

                    <p className="text-sm text-gray-500">
                      Save more on every order
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-orange-100 flex items-center justify-center">
                    <ShieldCheck
                      size={22}
                      className="text-orange-600"
                    />
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-900">
                      Safe & Secure
                    </h3>

                    <p className="text-sm text-gray-500">
                      Your account and payments are protected
                    </p>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Login Card */}
          <div className="flex justify-center lg:justify-end">

            <div className="w-full max-w-xl">

              {/* Mobile Heading */}
              <div className="lg:hidden text-center mb-7">

                <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-xs sm:text-sm font-bold mb-4">
                  🍴 Welcome to FoodieHub
                </div>

                <h1 className="text-3xl sm:text-4xl font-black text-gray-900">
                  {isLoginView
                    ? "Welcome back 👋"
                    : "Join FoodieHub 🚀"}
                </h1>

                <p className="text-gray-500 text-sm mt-2">
                  {isLoginView
                    ? "Login to continue ordering delicious food"
                    : "Create an account and start ordering"}
                </p>

              </div>

              {/* Card */}
              <div className="bg-white/95 backdrop-blur-xl p-5 sm:p-8 lg:p-10 rounded-3xl border border-white shadow-2xl">

                {/* Card Header */}
                <div className="text-center mb-7 sm:mb-8">

                  <div className="mx-auto w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center text-2xl mb-4">
                    {isLoginView ? "👋" : "🚀"}
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
                    {isLoginView
                      ? "Welcome back"
                      : "Create your account"}
                  </h2>

                  <p className="text-gray-400 text-sm mt-2">
                    {isLoginView
                      ? "Login to your FoodieHub account"
                      : "Sign up and start enjoying great food"}
                  </p>

                </div>

                {/* Form */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    navigate("/");
                  }}
                  className="space-y-4"
                >

                  {/* Name + Phone */}
                  {!isLoginView && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-700">
                          Full Name
                        </label>

                        <div className="flex items-center gap-2 px-3 py-3 rounded-xl border border-gray-200 bg-gray-50 focus-within:border-orange-500 focus-within:bg-white transition">

                          <User
                            className="text-gray-400 flex-shrink-0"
                            size={18}
                          />

                          <input
                            type="text"
                            placeholder="Your name"
                            required
                            className="w-full text-sm bg-transparent focus:outline-none"
                          />

                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-700">
                          Phone
                        </label>

                        <div className="flex items-center gap-2 px-3 py-3 rounded-xl border border-gray-200 bg-gray-50 focus-within:border-orange-500 focus-within:bg-white transition">

                          <Phone
                            className="text-gray-400 flex-shrink-0"
                            size={18}
                          />

                          <input
                            type="tel"
                            placeholder="Phone number"
                            required
                            className="w-full text-sm bg-transparent focus:outline-none"
                          />

                        </div>
                      </div>

                    </div>
                  )}

                  {/* Email */}
                  <div className="space-y-1.5">

                    <label className="text-xs font-bold text-gray-700">
                      Email address
                    </label>

                    <div className="flex items-center gap-2 px-3 py-3 rounded-xl border border-gray-200 bg-gray-50 focus-within:border-orange-500 focus-within:bg-white transition">

                      <Mail
                        className="text-gray-400 flex-shrink-0"
                        size={18}
                      />

                      <input
                        type="email"
                        placeholder="Enter your email"
                        required
                        className="w-full text-sm bg-transparent focus:outline-none"
                      />

                    </div>

                  </div>

                  {/* Password */}
                  <div className="space-y-1.5">

                    <label className="text-xs font-bold text-gray-700">
                      Password
                    </label>

                    <div className="flex items-center gap-2 px-3 py-3 rounded-xl border border-gray-200 bg-gray-50 focus-within:border-orange-500 focus-within:bg-white transition">

                      <Lock
                        className="text-gray-400 flex-shrink-0"
                        size={18}
                      />

                      <input
                        type={
                          showPassword
                            ? "text"
                            : "password"
                        }
                        placeholder="Enter your password"
                        required
                        className="w-full text-sm bg-transparent focus:outline-none"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword(!showPassword)
                        }
                        className="text-gray-400 hover:text-orange-500 transition"
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>

                    </div>

                  </div>

                  {/* Forgot Password */}
                  {isLoginView && (
                    <div className="flex justify-end">

                      <button
                        type="button"
                        className="text-xs sm:text-sm font-semibold text-orange-500 hover:text-orange-600"
                      >
                        Forgot password?
                      </button>

                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    className="w-full bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white font-bold py-3.5 rounded-xl transition-all duration-200 text-sm shadow-lg shadow-orange-600/20 hover:shadow-orange-600/30"
                  >
                    {isLoginView
                      ? "Login"
                      : "Create Account"}
                  </button>

                </form>

                {/* Bottom Toggle */}
                <div className="text-center mt-6 pt-6 border-t border-gray-100">

                  <p className="text-sm text-gray-500">

                    {isLoginView
                      ? "Don't have an account?"
                      : "Already have an account?"}

                    <button
                      type="button"
                      onClick={() => {
                        setIsLoginView(!isLoginView);
                        setShowPassword(false);
                      }}
                      className="ml-1 font-bold text-orange-500 hover:text-orange-600"
                    >
                      {isLoginView
                        ? "Create one"
                        : "Login"}
                    </button>

                  </p>

                </div>

              </div>

            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-5 sm:py-6 text-xs text-gray-400 font-semibold">
        © 2026 FoodieHub. All rights reserved.
      </footer>

    </div>
  );
}