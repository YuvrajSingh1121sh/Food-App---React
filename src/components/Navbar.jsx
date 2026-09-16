import React, { useEffect, useState } from "react";
import {
  Search,
  ShoppingCart,
  User,
  MapPin,
  ChevronDown,
  Menu,
  X,
  Navigation,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const [location, setLocation] = useState(
    localStorage.getItem("foodiehub-location") || "Select Location"
  );

  const [locationOpen, setLocationOpen] = useState(false);
  const [gettingLocation, setGettingLocation] = useState(false);

  const [cartCount, setCartCount] = useState(
    Number(localStorage.getItem("foodiehub-cart-count") || 0)
  );

  /* --------------------------------
     Update cart count
  -------------------------------- */
  useEffect(() => {
    const updateCartCount = () => {
      setCartCount(
        Number(localStorage.getItem("foodiehub-cart-count") || 0)
      );
    };

    window.addEventListener("storage", updateCartCount);

    return () => {
      window.removeEventListener("storage", updateCartCount);
    };
  }, []);

  /* --------------------------------
     Search
  -------------------------------- */
  const handleSearch = (e) => {
    e.preventDefault();

    if (!searchText.trim()) return;

    navigate(`/search?q=${encodeURIComponent(searchText.trim())}`);

    setSearchOpen(false);
    setSearchText("");
  };

  /* --------------------------------
     Current Location
  -------------------------------- */
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setGettingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        /*
          Try to get a readable address using
          OpenStreetMap's reverse geocoding service.
        */
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
          );

          const data = await response.json();

          const address =
            data.address?.city ||
            data.address?.town ||
            data.address?.village ||
            data.display_name ||
            "Current Location";

          setLocation(address);

          localStorage.setItem(
            "foodiehub-location",
            address
          );

          localStorage.setItem(
            "foodiehub-latitude",
            latitude
          );

          localStorage.setItem(
            "foodiehub-longitude",
            longitude
          );

          setLocationOpen(false);

          /*
            Open Google Maps at the user's
            current coordinates.
          */
          window.open(
            `https://www.google.com/maps?q=${latitude},${longitude}`,
            "_blank"
          );
        } catch (error) {
          console.error("Address lookup failed:", error);

          const locationText = `${latitude.toFixed(
            5
          )}, ${longitude.toFixed(5)}`;

          setLocation(locationText);

          localStorage.setItem(
            "foodiehub-location",
            locationText
          );

          localStorage.setItem(
            "foodiehub-latitude",
            latitude
          );

          localStorage.setItem(
            "foodiehub-longitude",
            longitude
          );

          setLocationOpen(false);

          window.open(
            `https://www.google.com/maps?q=${latitude},${longitude}`,
            "_blank"
          );
        }

        setGettingLocation(false);
      },

      (error) => {
        setGettingLocation(false);

        if (error.code === 1) {
          alert(
            "Location permission was denied. Please allow location access in your browser."
          );
        } else if (error.code === 2) {
          alert(
            "Your location could not be detected. Please try again."
          );
        } else {
          alert(
            "Unable to get your location. Please try again."
          );
        }
      },

      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  /* --------------------------------
     Manual location
  -------------------------------- */
  const enterLocationManually = () => {
    const address = window.prompt(
      "Enter your delivery location:"
    );

    if (!address || !address.trim()) return;

    const cleanAddress = address.trim();

    setLocation(cleanAddress);

    localStorage.setItem(
      "foodiehub-location",
      cleanAddress
    );

    setLocationOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="h-20 flex items-center justify-between">

          {/* --------------------------------
              Logo
          -------------------------------- */}
          <Link
            to="/"
            className="text-2xl sm:text-3xl font-black shrink-0"
          >
            Foodie<span className="text-orange-500">Hub</span>
          </Link>

          {/* --------------------------------
              Desktop Navigation
          -------------------------------- */}
          <div className="hidden lg:flex items-center gap-8">
            <Link
              to="/"
              className="text-orange-500 font-medium"
            >
              Home
            </Link>

            <Link
              to="/restaurants"
              className="text-gray-600 hover:text-orange-500 transition"
            >
              Restaurants
            </Link>

            <Link
              to="/offers"
              className="text-gray-600 hover:text-orange-500 transition"
            >
              Offers
            </Link>

            <Link
              to="/categories"
              className="text-gray-600 hover:text-orange-500 transition"
            >
              Categories
            </Link>

            <Link
              to="/orders"
              className="text-gray-600 hover:text-orange-500 transition"
            >
              Orders
            </Link>

            <Link
              to="/contact"
              className="text-gray-600 hover:text-orange-500 transition"
            >
              Contact
            </Link>
          </div>

          {/* --------------------------------
              Right Side
          -------------------------------- */}
          <div className="flex items-center gap-3">

            {/* Location */}
            <div className="relative hidden sm:block">

              <button
                onClick={() =>
                  setLocationOpen(!locationOpen)
                }
                className="
                  flex items-center gap-2
                  border border-gray-300
                  rounded-xl
                  px-3 sm:px-4
                  py-2
                  hover:border-orange-400
                  transition
                  min-w-[170px]
                "
              >
                <MapPin
                  size={20}
                  className="text-orange-500 shrink-0"
                />

                <div className="text-left flex-1 min-w-0">
                  <p className="text-xs text-gray-400">
                    Delivery to
                  </p>

                  <p className="font-semibold text-gray-800 truncate">
                    {location}
                  </p>
                </div>

                <ChevronDown
                  size={17}
                  className={`transition ${
                    locationOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Location Dropdown */}
              {locationOpen && (
                <div
                  className="
                    absolute
                    right-0
                    top-14
                    w-72
                    bg-white
                    rounded-2xl
                    shadow-xl
                    border
                    border-gray-100
                    p-3
                    z-50
                  "
                >

                  <button
                    onClick={getCurrentLocation}
                    disabled={gettingLocation}
                    className="
                      w-full
                      flex
                      items-center
                      gap-3
                      p-3
                      rounded-xl
                      hover:bg-orange-50
                      text-left
                      transition
                    "
                  >
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                      <Navigation
                        size={19}
                        className="text-orange-500"
                      />
                    </div>

                    <div>
                      <p className="font-semibold text-gray-900">
                        {gettingLocation
                          ? "Detecting location..."
                          : "Use Current Location"}
                      </p>

                      <p className="text-xs text-gray-500">
                        Use your device's GPS
                      </p>
                    </div>
                  </button>

                  <div className="border-t my-2" />

                  <button
                    onClick={enterLocationManually}
                    className="
                      w-full
                      flex
                      items-center
                      gap-3
                      p-3
                      rounded-xl
                      hover:bg-gray-50
                      text-left
                      transition
                    "
                  >
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                      <MapPin
                        size={19}
                        className="text-gray-600"
                      />
                    </div>

                    <div>
                      <p className="font-semibold text-gray-900">
                        Enter Location
                      </p>

                      <p className="text-xs text-gray-500">
                        Enter your delivery address
                      </p>
                    </div>
                  </button>

                  {/* Open saved location */}
                  {localStorage.getItem(
                    "foodiehub-latitude"
                  ) && (
                    <>
                      <div className="border-t my-2" />

                      <button
                        onClick={() => {
                          const lat =
                            localStorage.getItem(
                              "foodiehub-latitude"
                            );

                          const lng =
                            localStorage.getItem(
                              "foodiehub-longitude"
                            );

                          window.open(
                            `https://www.google.com/maps?q=${lat},${lng}`,
                            "_blank"
                          );
                        }}
                        className="
                          w-full
                          text-center
                          text-sm
                          text-orange-500
                          font-semibold
                          py-2
                          hover:text-orange-600
                        "
                      >
                        🗺️ View on Google Maps
                      </button>
                    </>
                  )}

                </div>
              )}
            </div>

            {/* Search */}
            <button
              onClick={() =>
                setSearchOpen(!searchOpen)
              }
              className="
                w-10 h-10
                flex items-center justify-center
                rounded-full
                hover:bg-gray-100
              "
            >
              <Search size={24} />
            </button>

            {/* Cart */}
            <button
              onClick={() => navigate("/cart")}
              className="
                relative
                w-10 h-10
                flex items-center justify-center
                rounded-full
                hover:bg-gray-100
              "
            >
              <ShoppingCart size={25} />

              {cartCount > 0 && (
                <span
                  className="
                    absolute
                    -top-1
                    -right-1
                    bg-orange-500
                    text-white
                    text-xs
                    w-5
                    h-5
                    rounded-full
                    flex
                    items-center
                    justify-center
                    font-bold
                  "
                >
                  {cartCount}
                </span>
              )}
            </button>

            {/* Login */}
            <button
              onClick={() => navigate("/login")}
              className="
                hidden sm:flex
                w-10 h-10
                items-center justify-center
                rounded-full
                hover:bg-gray-100
              "
            >
              <User size={24} />
            </button>

            {/* Mobile menu */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center"
            >
              {menuOpen ? (
                <X size={25} />
              ) : (
                <Menu size={25} />
              )}
            </button>

          </div>
        </div>

        {/* --------------------------------
            Search Bar
        -------------------------------- */}
        {searchOpen && (
          <form
            onSubmit={handleSearch}
            className="pb-4"
          >
            <div className="flex items-center gap-2 border rounded-xl px-4 py-2">
              <Search
                size={20}
                className="text-gray-400"
              />

              <input
                autoFocus
                value={searchText}
                onChange={(e) =>
                  setSearchText(e.target.value)
                }
                placeholder="Search for food or restaurants..."
                className="
                  flex-1
                  outline-none
                  bg-transparent
                  text-gray-800
                "
              />

              <button
                type="submit"
                className="
                  bg-orange-500
                  text-white
                  px-4
                  py-2
                  rounded-lg
                  font-medium
                "
              >
                Search
              </button>
            </div>
          </form>
        )}

        {/* --------------------------------
            Mobile Menu
        -------------------------------- */}
        {menuOpen && (
          <div className="lg:hidden border-t py-4">

            <div className="flex flex-col gap-1">

              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="px-4 py-3 rounded-lg hover:bg-orange-50"
              >
                Home
              </Link>

              <Link
                to="/restaurants"
                onClick={() => setMenuOpen(false)}
                className="px-4 py-3 rounded-lg hover:bg-orange-50"
              >
                Restaurants
              </Link>

              <Link
                to="/offers"
                onClick={() => setMenuOpen(false)}
                className="px-4 py-3 rounded-lg hover:bg-orange-50"
              >
                Offers
              </Link>

              <Link
                to="/categories"
                onClick={() => setMenuOpen(false)}
                className="px-4 py-3 rounded-lg hover:bg-orange-50"
              >
                Categories
              </Link>

              <Link
                to="/orders"
                onClick={() => setMenuOpen(false)}
                className="px-4 py-3 rounded-lg hover:bg-orange-50"
              >
                Orders
              </Link>

              <Link
                to="/contact"
                onClick={() => setMenuOpen(false)}
                className="px-4 py-3 rounded-lg hover:bg-orange-50"
              >
                Contact
              </Link>

              {/* Mobile Location */}
              <button
                onClick={getCurrentLocation}
                className="
                  flex
                  items-center
                  gap-3
                  px-4
                  py-3
                  rounded-lg
                  hover:bg-orange-50
                  text-left
                "
              >
                <Navigation
                  size={20}
                  className="text-orange-500"
                />

                <span>
                  {gettingLocation
                    ? "Getting location..."
                    : "Use Current Location"}
                </span>
              </button>

              {/* Mobile Login */}
              <button
                onClick={() => navigate("/login")}
                className="
                  flex
                  items-center
                  gap-3
                  px-4
                  py-3
                  rounded-lg
                  hover:bg-orange-50
                  text-left
                "
              >
                <User size={20} />
                Login
              </button>

            </div>
          </div>
        )}

      </div>
    </nav>
  );
}