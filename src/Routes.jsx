import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SearchPage from "./pages/Search";
import Cart from "./pages/Cart";
import Layout from "./Layout/Layout";

/* --------------------------------
   Protected Route
--------------------------------- */

function ProtectedRoute({ children }) {
  const isLoggedIn =
    localStorage.getItem("foodiehub-logged-in") === "true";

  return isLoggedIn ? (
    children
  ) : (
    <Navigate to="/login" replace />
  );
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* =============================
            Authentication
        ============================= */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />


        {/* =============================
            Protected Application
        ============================= */}

        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route
            path="/home"
            element={<Home />}
          />

          <Route
            path="/search"
            element={<SearchPage />}
          />

          <Route
            path="/cart"
            element={<Cart />}
          />
        </Route>


        {/* =============================
            Start App
        ============================= */}

        <Route
          path="/"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />


        {/* =============================
            Unknown URL
        ============================= */}

        <Route
          path="*"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}