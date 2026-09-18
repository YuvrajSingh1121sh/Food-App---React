import { useState } from "react";
import {
  Eye,
  EyeOff,
  ArrowLeft,
  Lock,
  Mail,
  User,
} from "lucide-react";

import {
  Link,
  useNavigate,
} from "react-router-dom";


export default function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [error, setError] = useState("");


  // =====================================
  // REGISTER
  // =====================================

  const handleRegister = (e) => {
    e.preventDefault();

    setError("");


    // Validation

    if (
      !name.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      setError(
        "Please fill in all the fields."
      );

      return;
    }


    // Password length

    if (password.length < 6) {
      setError(
        "Password must be at least 6 characters."
      );

      return;
    }


    // Password match

    if (password !== confirmPassword) {
      setError(
        "Passwords do not match."
      );

      return;
    }


    // Check existing account

    const existingUser =
      localStorage.getItem("foodiehub-user");


    if (existingUser) {

      const savedUser =
        JSON.parse(existingUser);

      if (
        savedUser.email.toLowerCase() ===
        email.trim().toLowerCase()
      ) {
        setError(
          "An account with this email already exists. Please login."
        );

        return;
      }
    }


    // =================================
    // SAVE USER
    // =================================

    const user = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: password,
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

    localStorage.setItem(
      "foodiehub-current-user",
      user.name
    );


    // Tell Navbar

    window.dispatchEvent(
      new Event("loginUpdated")
    );


    // =================================
    // RETURN TO ORIGINAL PAGE
    // =================================

    const redirectPath =
      sessionStorage.getItem(
        "foodiehub-redirect-after-login"
      );


    sessionStorage.removeItem(
      "foodiehub-redirect-after-login"
    );


    if (redirectPath) {
      navigate(redirectPath);
    } else {
      navigate("/");
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex items-center justify-center p-4 relative overflow-hidden">


      {/* =================================
          BACKGROUND DECORATIONS
      ================================= */}

      <div className="absolute -top-20 -right-20 w-64 h-64 bg-orange-200 rounded-full blur-3xl opacity-50" />

      <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-yellow-200 rounded-full blur-3xl opacity-50" />

      <div className="absolute top-16 left-16 text-5xl opacity-20">
        🍟
      </div>

      <div className="absolute bottom-16 right-16 text-5xl opacity-20">
        🍜
      </div>


      {/* =================================
          REGISTER CARD
      ================================= */}

      <div className="relative w-full max-w-md">


        {/* LOGO */}

        <div className="text-center mb-6">

          <Link
            to="/"
            className="inline-flex items-center gap-2"
          >

            <div className="w-12 h-12 rounded-2xl bg-orange-500 flex items-center justify-center text-2xl shadow-lg">
              🍴
            </div>

            <h1 className="text-2xl font-bold text-gray-900">
              Foodie<span className="text-orange-500">
                Hub
              </span>
            </h1>

          </Link>

        </div>


        <div className="bg-white/95 backdrop-blur rounded-3xl shadow-xl border border-white p-6 sm:p-8">


          {/* HEADING */}

          <div className="text-center mb-6">

            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Create Account
            </h2>

            <p className="text-gray-500 mt-2 text-sm">
              Join FoodieHub and start ordering.
            </p>

          </div>


          {/* ERROR */}

          {error && (
            <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm">
              {error}
            </div>
          )}


          {/* FORM */}

          <form
            onSubmit={handleRegister}
            className="space-y-4"
          >


            {/* NAME */}

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>

              <div className="relative">

                <User
                  size={19}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  placeholder="Enter your full name"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition"
                />

              </div>

            </div>


            {/* EMAIL */}

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>

              <div className="relative">

                <Mail
                  size={19}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition"
                />

              </div>

            </div>


            {/* PASSWORD */}

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
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
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  placeholder="Create a password"
                  className="w-full pl-10 pr-12 py-3 rounded-xl border border-gray-200 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
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

              <label className="block text-sm font-medium text-gray-700 mb-2">
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
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(
                      e.target.value
                    )
                  }
                  placeholder="Confirm your password"
                  className="w-full pl-10 pr-12 py-3 rounded-xl border border-gray-200 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
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
              className="w-full py-3.5 mt-2 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600 active:scale-[0.99] transition shadow-lg shadow-orange-200"
            >
              Create Account
            </button>

          </form>


          {/* LOGIN */}

          <div className="text-center mt-6">

            <p className="text-sm text-gray-500">

              Already have an account?{" "}

              <Link
                to="/login"
                className="text-orange-500 font-semibold hover:text-orange-600"
              >
                Login
              </Link>

            </p>

          </div>


          {/* BACK HOME */}

          <Link
            to="/"
            className="mt-5 flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-orange-500 transition"
          >

            <ArrowLeft size={16} />

            Back to Home

          </Link>

        </div>

      </div>

    </div>
  );
}import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  User,
  Phone,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
} from "lucide-react";

export default function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
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
      !form.name ||
      !form.phone ||
      !form.email ||
      !form.password ||
      !form.confirmPassword
    ) {
      setError(
        "Please fill all the fields."
      );
      return;
    }

    if (form.phone.length < 10) {
      setError(
        "Please enter a valid phone number."
      );
      return;
    }

    if (form.password.length < 6) {
      setError(
        "Password must be at least 6 characters."
      );
      return;
    }

    if (
      form.password !==
      form.confirmPassword
    ) {
      setError(
        "Passwords do not match."
      );
      return;
    }

    const existingUser = JSON.parse(
      localStorage.getItem(
        "foodiehub-user"
      ) || "null"
    );

    if (
      existingUser &&
      existingUser.email ===
        form.email
    ) {
      setError(
        "An account with this email already exists."
      );
      return;
    }

    const user = {
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      password: form.password,
    };

    localStorage.setItem(
      "foodiehub-user",
      JSON.stringify(user)
    );

    localStorage.setItem(
      "foodiehub-logged-in",
      "true"
    );

    localStorage.setItem(
      "foodiehub-current-user",
      user.name
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
      <div className="w-full max-w-xl">
        <div className="mb-5">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-gray-600 hover:text-orange-500 font-medium"
          >
            <ArrowLeft size={18} />
            Back to Home
          </button>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 sm:p-9">
          <div className="text-center mb-7">
            <div className="text-4xl">
              🍽️
            </div>

            <h1 className="text-3xl font-black text-gray-900 mt-3">
              Create Account
            </h1>

            <p className="text-gray-500 text-sm mt-2">
              Join FoodieHub and start
              ordering delicious food.
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
            {/* Name */}

            <Input
              icon={<User size={18} />}
              name="name"
              type="text"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
            />

            {/* Phone */}

            <Input
              icon={<Phone size={18} />}
              name="phone"
              type="tel"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
            />

            {/* Email */}

            <Input
              icon={<Mail size={18} />}
              name="email"
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
            />

            {/* Password */}

            <PasswordInput
              icon={<Lock size={18} />}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              show={showPassword}
              setShow={setShowPassword}
            />

            {/* Confirm Password */}

            <PasswordInput
              icon={<Lock size={18} />}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              show={showConfirmPassword}
              setShow={
                setShowConfirmPassword
              }
            />

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl transition shadow-lg shadow-orange-500/20"
            >
              Create Account
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <button
              onClick={() =>
                navigate("/login")
              }
              className="text-orange-600 font-bold hover:underline"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

function Input({
  icon,
  name,
  type,
  placeholder,
  value,
  onChange,
}) {
  return (
    <div className="flex items-center gap-3 border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-100">
      <span className="text-gray-400">
        {icon}
      </span>

      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full bg-transparent outline-none text-sm"
      />
    </div>
  );
}

function PasswordInput({
  icon,
  name,
  placeholder,
  value,
  onChange,
  show,
  setShow,
}) {
  return (
    <div className="flex items-center gap-3 border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-100">
      <span className="text-gray-400">
        {icon}
      </span>

      <input
        name={name}
        type={show ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full bg-transparent outline-none text-sm"
      />

      <button
        type="button"
        onClick={() =>
          setShow(!show)
        }
        className="text-gray-400 hover:text-gray-600"
      >
        {show ? (
          <EyeOff size={18} />
        ) : (
          <Eye size={18} />
        )}
      </button>
    </div>
  );
}