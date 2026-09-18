import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SearchPage from "./pages/Search";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import CategoryDishes from "./pages/CategoryDishes";

import Layout from "./Layout/Layout";

// ---------------------------------------------
// PROTECTED ROUTE
// ---------------------------------------------

function ProtectedRoute() {
  const isLoggedIn =
    localStorage.getItem(
      "foodiehub-logged-in"
    ) === "true";

  const location = useLocation();

  if (!isLoggedIn) {
    const currentPath =
      location.pathname +
      location.search;

    sessionStorage.setItem(
      "foodiehub-redirect-after-login",
      currentPath
    );

    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return <Outlet />;
}

// ---------------------------------------------
// APPLICATION ROUTES
// ---------------------------------------------

export default function AppRoutes() {
  return (
    <BrowserRouter>

      <Routes>

        {/* ===================================== */}
        {/* PUBLIC ROUTES */}
        {/* ===================================== */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* ===================================== */}
        {/* HOME */}
        {/* ===================================== */}

        <Route element={<Layout />}>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/home"
            element={<Home />}
          />

        </Route>

        {/* ===================================== */}
        {/* PROTECTED ROUTES */}
        {/* ===================================== */}

        <Route element={<ProtectedRoute />}>

          <Route element={<Layout />}>

            {/* SEARCH */}
            <Route
              path="/search"
              element={<SearchPage />}
            />

            {/* CART */}
            <Route
              path="/cart"
              element={<Cart />}
            />

            {/* PROFILE */}
            <Route
              path="/profile"
              element={<Profile />}
            />

            {/* CATEGORY */}
            <Route
              path="/category/:category"
              element={<CategoryDishes />}
            />

          </Route>

        </Route>

        {/* ===================================== */}
        {/* UNKNOWN ROUTES */}
        {/* ===================================== */}

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />

      </Routes>

    </BrowserRouter>
  );
}