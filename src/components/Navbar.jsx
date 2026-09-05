import { useState } from "react";
import {
  Search,
  ShoppingCart,
  User,
  MapPin,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const [location, setLocation] = useState(
    localStorage.getItem("foodiehub-location") || "New Delhi"
  );

  const [cartCount] = useState(
    Number(localStorage.getItem("foodiehub-cart-count")) || 0
  );

  // Search
  const handleSearch = (e) => {
    e.preventDefault();

    const query = searchText.trim();

    if (!query) return;

    navigate(`/search?q=${encodeURIComponent(query)}`);
    setSearchOpen(false);
    setMobileMenuOpen(false);
  };

  // Location
  const handleLocation = () => {
    const newLocation = window.prompt(
      "Enter your delivery location:",
      location
    );

    if (newLocation && newLocation.trim()) {
      const updatedLocation = newLocation.trim();

      setLocation(updatedLocation);
      localStorage.setItem(
        "foodiehub-location",
        updatedLocation
      );
    }
  };

  // Login
  const handleLogin = () => {
    navigate("/login");
    setMobileMenuOpen(false);
  };

  // Cart
  const handleCart = () => {
    navigate("/cart");
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">

        {/* Main Navbar */}
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex-shrink-0"
          >
            <h1 className="text-2xl sm:text-3xl font-bold">
              <span className="text-black">Foodie</span>
              <span className="text-orange-500">Hub</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center gap-6 xl:gap-8 text-gray-700 font-medium">

            <li>
              <Link
                to="/"
                className="text-orange-500 hover:text-orange-600 transition"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/restaurants"
                className="hover:text-orange-500 transition"
              >
                Restaurants
              </Link>
            </li>

            <li>
              <Link
                to="/offers"
                className="hover:text-orange-500 transition"
              >
                Offers
              </Link>
            </li>

            <li>
              <Link
                to="/categories"
                className="hover:text-orange-500 transition"
              >
                Categories
              </Link>
            </li>

            <li>
              <Link
                to="/orders"
                className="hover:text-orange-500 transition"
              >
                Orders
              </Link>
            </li>

            <li>
              <Link
                to="/contact"
                className="hover:text-orange-500 transition"
              >
                Contact
              </Link>
            </li>

          </ul>

          {/* Right Side */}
          <div className="flex items-center gap-3 sm:gap-4">

            {/* Location */}
            <button
              type="button"
              onClick={handleLocation}
              className="hidden md:flex items-center border rounded-xl px-3 lg:px-4 py-2 shadow-sm hover:shadow-md transition"
            >
              <MapPin
                className="text-orange-500"
                size={20}
              />

              <div className="ml-2 text-left leading-4">
                <p className="text-xs text-gray-500">
                  Delivery to
                </p>

                <p className="font-semibold text-sm max-w-[100px] truncate">
                  {location}
                </p>
              </div>

              <ChevronDown
                className="ml-2 text-gray-500"
                size={18}
              />
            </button>

            {/* Search */}
            <button
              type="button"
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search"
              className="p-1 hover:text-orange-500 transition"
            >
              {searchOpen ? (
                <X size={23} />
              ) : (
                <Search size={23} />
              )}
            </button>

            {/* Cart */}
            <button
              type="button"
              onClick={handleCart}
              aria-label="Shopping basket"
              className="relative p-1 hover:text-orange-500 transition"
            >
              <ShoppingCart size={26} />

              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] min-w-5 h-5 px-1 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Login */}
            <button
              type="button"
              onClick={handleLogin}
              aria-label="Login"
              className="p-1 hover:text-orange-500 transition"
            >
              <User size={27} />
            </button>

            {/* Mobile Menu */}
            <button
              type="button"
              onClick={() =>
                setMobileMenuOpen(!mobileMenuOpen)
              }
              aria-label="Menu"
              className="lg:hidden p-1 hover:text-orange-500 transition"
            >
              {mobileMenuOpen ? (
                <X size={26} />
              ) : (
                <Menu size={26} />
              )}
            </button>

          </div>
        </div>

        {/* Search Box */}
        {searchOpen && (
          <form
            onSubmit={handleSearch}
            className="mt-4 flex gap-2"
          >
            <div className="flex items-center gap-2 flex-1 border border-gray-200 rounded-xl px-3 py-2.5 bg-gray-50 focus-within:border-orange-500">
              <Search
                size={20}
                className="text-gray-400"
              />

              <input
                type="text"
                value={searchText}
                onChange={(e) =>
                  setSearchText(e.target.value)
                }
                placeholder="Search for food, restaurants..."
                autoFocus
                className="w-full bg-transparent outline-none text-sm"
              />
            </div>

            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 sm:px-6 rounded-xl font-semibold"
            >
              Search
            </button>
          </form>
        )}

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 border-t pt-4">

            <div className="flex flex-col gap-1">

              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-3 rounded-lg hover:bg-orange-50 hover:text-orange-500"
              >
                Home
              </Link>

              <Link
                to="/restaurants"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-3 rounded-lg hover:bg-orange-50 hover:text-orange-500"
              >
                Restaurants
              </Link>

              <Link
                to="/offers"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-3 rounded-lg hover:bg-orange-50 hover:text-orange-500"
              >
                Offers
              </Link>

              <Link
                to="/categories"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-3 rounded-lg hover:bg-orange-50 hover:text-orange-500"
              >
                Categories
              </Link>

              <Link
                to="/orders"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-3 rounded-lg hover:bg-orange-50 hover:text-orange-500"
              >
                Orders
              </Link>

              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-3 rounded-lg hover:bg-orange-50 hover:text-orange-500"
              >
                Contact
              </Link>

              {/* Mobile Location */}
              <button
                type="button"
                onClick={handleLocation}
                className="flex items-center gap-3 px-3 py-3 text-left rounded-lg hover:bg-orange-50"
              >
                <MapPin
                  size={20}
                  className="text-orange-500"
                />

                <div>
                  <p className="text-xs text-gray-500">
                    Delivery to
                  </p>

                  <p className="font-semibold">
                    {location}
                  </p>
                </div>
              </button>

              {/* Mobile Login */}
              <button
                type="button"
                onClick={handleLogin}
                className="flex items-center gap-3 px-3 py-3 text-left rounded-lg hover:bg-orange-50"
              >
                <User
                  size={20}
                  className="text-orange-500"
                />
                <span>Login / Account</span>
              </button>

              {/* Mobile Cart */}
              <button
                type="button"
                onClick={handleCart}
                className="flex items-center gap-3 px-3 py-3 text-left rounded-lg hover:bg-orange-50"
              >
                <ShoppingCart
                  size={20}
                  className="text-orange-500"
                />
                <span>
                  Basket
                  {cartCount > 0 &&
                    ` (${cartCount})`}
                </span>
              </button>

            </div>
          </div>
        )}

      </div>
    </nav>
  );
}