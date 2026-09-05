import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SearchPage from "./pages/Search";
import Cart from "./pages/Cart";
import Layout from "./Layout/Layout";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Main Website */}
        <Route element={<Layout />}>

          <Route
            path="/"
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

        {/* Authentication */}
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

      </Routes>
    </BrowserRouter>
  );
}