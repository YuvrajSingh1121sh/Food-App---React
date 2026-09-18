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

import Layout from "./Layout/Layout";

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

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

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

        {/* Protected */}

        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route
              path="/search"
              element={<SearchPage />}
            />

            <Route
              path="/cart"
              element={<Cart />}
            />

            <Route
              path="/profile"
              element={<Profile />}
            />
          </Route>
        </Route>

        {/* Unknown route */}

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