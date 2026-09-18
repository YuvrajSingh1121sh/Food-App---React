import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Phone,
  Mail,
  Lock,
  Eye,
  EyeOff,
  UserPlus,
  ArrowLeft,
} from "lucide-react";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleRegister = (e) => {
    e.preventDefault();

    const name = form.name.trim();
    const phone = form.phone.trim();
    const email = form.email.trim().toLowerCase();
    const password = form.password;
    const confirmPassword = form.confirmPassword;

    // -----------------------------
    // VALIDATION
    // -----------------------------

    if (!name || !phone || !email || !password) {
      setError("Please fill in all required fields.");
      return;
    }

    if (phone.length !== 10 || !/^\d{10}$/.test(phone)) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError(
        "Password must contain at least 6 characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // -----------------------------
    // CHECK EXISTING USER
    // -----------------------------

    const existingUser = JSON.parse(
      localStorage.getItem("foodiehub-user") || "null"
    );

    if (existingUser) {
      if (existingUser.email === email) {
        setError(
          "An account with this email already exists."
        );
        return;
      }

      if (existingUser.phone === phone) {
        setError(
          "An account with this phone number already exists."
        );
        return;
      }
    }

    // -----------------------------
    // CREATE USER
    // -----------------------------

    const user = {
      name,
      phone,
      email,
      password,
    };

    localStorage.setItem(
      "foodiehub-user",
      JSON.stringify(user)
    );

    // Login user automatically
    localStorage.setItem(
      "foodiehub-logged-in",
      "true"
    );

    // Store name for Navbar/Profile avatar
    localStorage.setItem(
      "foodiehub-current-user",
      name
    );

    // Tell Navbar that login state changed
    window.dispatchEvent(
      new Event("loginUpdated")
    );

    // -----------------------------
    // REDIRECT
    // -----------------------------

    const redirectPath =
      sessionStorage.getItem(
        "foodiehub-redirect-after-login"
      ) || "/";

    sessionStorage.removeItem(
      "foodiehub-redirect-after-login"
    );

    navigate(redirectPath);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex items-center justify-center px-4 py-8">

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 bg-white rounded-3xl shadow-xl overflow-hidden">

        {/* -------------------------------- */}
        {/* LEFT SIDE */}
        {/* -------------------------------- */}

        <div className="hidden lg:flex bg-orange-500 text-white p-10 flex-col justify-center">

          <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mb-6">
            <UserPlus size={34} />
          </div>

          <h1 className="text-4xl font-extrabold">
            Join FoodieHub
          </h1>

          <p className="mt-4 text-orange-100 leading-relaxed">
            Create your FoodieHub account and enjoy
            delicious food delivered right to your door.
          </p>

          <div className="mt-8 space-y-4 text-sm">

            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                ✓
              </span>
              Discover nearby restaurants
            </div>

            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                ✓
              </span>
              Order your favourite food
            </div>

            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                ✓
              </span>
              Track your orders
            </div>

            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                ✓
              </span>
              Save addresses and payment methods
            </div>

          </div>
        </div>

        {/* -------------------------------- */}
        {/* RIGHT SIDE */}
        {/* -------------------------------- */}

        <div className="p-6 sm:p-8 lg:p-10">

          {/* BACK */}
          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-gray-500 hover:text-orange-500 transition mb-5"
          >
            <ArrowLeft size={18} />
            Back to Home
          </button>

          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Create Account
            </h2>

            <p className="text-gray-500 text-sm mt-1">
              Register to start ordering delicious food.
            </p>
          </div>

          {/* ERROR */}
          {error && (
            <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm">
              {error}
            </div>
          )}

          <form
            onSubmit={handleRegister}
            className="space-y-4"
          >

            {/* NAME */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Full Name
              </label>

              <div className="relative">
                <User
                  size={19}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  required
                />
              </div>
            </div>

            {/* PHONE */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Phone Number
              </label>

              <div className="relative">
                <Phone
                  size={19}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="10-digit phone number"
                  maxLength="10"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  required
                />
              </div>
            </div>

            {/* EMAIL */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={19}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  required
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Password
              </label>

              <div className="relative">
                <Lock
                  size={19}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Minimum 6 characters"
                  className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-500"
                >
                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>
              </div>
            </div>

            {/* CONFIRM PASSWORD */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Confirm Password
              </label>

              <div className="relative">
                <Lock
                  size={19}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter your password"
                  className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-500"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>
              </div>
            </div>

            {/* REGISTER BUTTON */}
            <button
              type="submit"
              className="w-full mt-2 py-3.5 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 active:scale-[0.99] transition"
            >
              Create Account
            </button>
          </form>

          {/* LOGIN */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-orange-500 hover:text-orange-600"
            >
              Login
            </Link>
          </p>

        </div>
      </div>
    </main>
  );
}