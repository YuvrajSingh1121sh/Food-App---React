import { useEffect, useState } from "react";
import {
  Search,
  ShoppingCart,
  User,
  MapPin,
  ChevronDown,
  Menu,
  X,
  Navigation,
  LogOut,
  Check,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("foodiehub-logged-in") === "true"
  );

  const [currentUser, setCurrentUser] = useState(
    localStorage.getItem("foodiehub-current-user") || ""
  );

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const [cartCount, setCartCount] = useState(
    Number(localStorage.getItem("foodiehub-cart-count") || 0)
  );

  const [locationOpen, setLocationOpen] = useState(false);
  const [location, setLocation] = useState(
    localStorage.getItem("foodiehub-location") || ""
  );

  const [shortLocation, setShortLocation] = useState(
    localStorage.getItem("foodiehub-short-location") || ""
  );

  const [loadingLocation, setLoadingLocation] = useState(false);
  const [locationMessage, setLocationMessage] = useState("");

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // --------------------------------------------------
  // LOGIN STATE
  // --------------------------------------------------

  useEffect(() => {
    const updateLogin = () => {
      setIsLoggedIn(
        localStorage.getItem("foodiehub-logged-in") === "true"
      );

      setCurrentUser(
        localStorage.getItem("foodiehub-current-user") || ""
      );
    };

    window.addEventListener("loginUpdated", updateLogin);
    window.addEventListener("storage", updateLogin);

    return () => {
      window.removeEventListener("loginUpdated", updateLogin);
      window.removeEventListener("storage", updateLogin);
    };
  }, []);

  // --------------------------------------------------
  // CART COUNT
  // --------------------------------------------------

  useEffect(() => {
    const updateCartCount = () => {
      setCartCount(
        Number(localStorage.getItem("foodiehub-cart-count") || 0)
      );
    };

    window.addEventListener("cartUpdated", updateCartCount);
    window.addEventListener("storage", updateCartCount);

    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
      window.removeEventListener("storage", updateCartCount);
    };
  }, []);

  // --------------------------------------------------
  // LOCATION STATE
  // --------------------------------------------------

  useEffect(() => {
    const updateLocation = () => {
      setLocation(
        localStorage.getItem("foodiehub-location") || ""
      );

      setShortLocation(
        localStorage.getItem("foodiehub-short-location") || ""
      );
    };

    window.addEventListener("locationUpdated", updateLocation);
    window.addEventListener("storage", updateLocation);

    return () => {
      window.removeEventListener("locationUpdated", updateLocation);
      window.removeEventListener("storage", updateLocation);
    };
  }, []);

  // --------------------------------------------------
  // SEARCH
  // --------------------------------------------------

  const handleSearch = (e) => {
    e.preventDefault();

    const query = searchText.trim();

    if (!query) return;

    if (!isLoggedIn) {
      sessionStorage.setItem(
        "foodiehub-redirect-after-login",
        `/search?q=${encodeURIComponent(query)}`
      );

      navigate("/login");
      return;
    }

    navigate(`/search?q=${encodeURIComponent(query)}`);

    setSearchOpen(false);
    setSearchText("");
    setMobileMenuOpen(false);
  };

  // --------------------------------------------------
  // CART
  // --------------------------------------------------

  const handleCartClick = () => {
    if (!isLoggedIn) {
      sessionStorage.setItem(
        "foodiehub-redirect-after-login",
        "/cart"
      );

      navigate("/login");
      return;
    }

    navigate("/cart");
    setMobileMenuOpen(false);
  };

  // --------------------------------------------------
  // LOGOUT
  // --------------------------------------------------

  const handleLogout = () => {
    localStorage.removeItem("foodiehub-logged-in");
    localStorage.removeItem("foodiehub-current-user");

    setIsLoggedIn(false);
    setCurrentUser("");

    window.dispatchEvent(new Event("loginUpdated"));

    navigate("/");
    setMobileMenuOpen(false);
  };

  // --------------------------------------------------
  // LOCATION
  // --------------------------------------------------

  const saveLocation = (fullAddress, shortAddress, lat, lng) => {
    localStorage.setItem("foodiehub-location", fullAddress);
    localStorage.setItem(
      "foodiehub-short-location",
      shortAddress
    );

    if (lat !== undefined && lng !== undefined) {
      localStorage.setItem("foodiehub-latitude", lat);
      localStorage.setItem("foodiehub-longitude", lng);
    }

    setLocation(fullAddress);
    setShortLocation(shortAddress);

    window.dispatchEvent(new Event("locationUpdated"));
  };

  const getShortAddress = (address) => {
    if (!address) return "Location";

    const parts = address
      .split(",")
      .map((part) => part.trim())
      .filter(Boolean);

    if (parts.length >= 2) {
      return `${parts[0]}, ${parts[1]}`;
    }

    return parts[0];
  };

  const detectLocation = () => {
    setLoadingLocation(true);
    setLocationMessage("");

    if (!navigator.geolocation) {
      setLocationMessage(
        "Location is not supported by your browser."
      );
      setLoadingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
          );

          if (!response.ok) {
            throw new Error("Unable to find address");
          }

          const data = await response.json();

          const address = data.address || {};

          const city =
            address.city ||
            address.town ||
            address.village ||
            address.municipality ||
            address.county ||
            "";

          const state = address.state || "";

          const shortAddress = [city, state]
            .filter(Boolean)
            .join(", ");

          const fullAddress =
            data.display_name ||
            shortAddress ||
            "Current Location";

          saveLocation(
            fullAddress,
            shortAddress || "Current Location",
            latitude,
            longitude
          );

          setLocationMessage("Location updated successfully.");
          setLocationOpen(false);
        } catch (error) {
          console.error(error);

          // Even if reverse geocoding fails,
          // save coordinates.
          saveLocation(
            "Current Location",
            "Current Location",
            latitude,
            longitude
          );

          setLocationMessage(
            "Coordinates saved. Address could not be found."
          );
        } finally {
          setLoadingLocation(false);
        }
      },
      (error) => {
        console.error(error);

        let message =
          "Unable to get your location.";

        if (error.code === 1) {
          message =
            "Location permission was denied. Please allow location access.";
        } else if (error.code === 2) {
          message =
            "Your location could not be determined.";
        } else if (error.code === 3) {
          message =
            "Location request timed out. Try again.";
        }

        setLocationMessage(message);
        setLoadingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      }
    );
  };

  const enterLocationManually = () => {
    const enteredLocation = window.prompt(
      "Enter your delivery location:"
    );

    if (!enteredLocation || !enteredLocation.trim()) {
      return;
    }

    const cleanLocation = enteredLocation.trim();

    saveLocation(
      cleanLocation,
      getShortAddress(cleanLocation)
    );

    setLocationOpen(false);
  };

  const openGoogleMaps = () => {
    const latitude = localStorage.getItem(
      "foodiehub-latitude"
    );

    const longitude = localStorage.getItem(
      "foodiehub-longitude"
    );

    if (latitude && longitude) {
      window.open(
        `https://www.google.com/maps?q=${latitude},${longitude}`,
        "_blank"
      );
    } else {
      window.open(
        "https://www.google.com/maps",
        "_blank"
      );
    }
  };

  const chooseCurrentLocation = () => {
    setLocationOpen(false);
    setMobileMenuOpen(false);
    navigate("/");
  };

  // --------------------------------------------------
  // PROFILE AVATAR
  // --------------------------------------------------

  const profileLetter =
    (currentUser || "U").trim().charAt(0).toUpperCase();

  // --------------------------------------------------
  // UI
  // --------------------------------------------------

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 sm:h-20 flex items-center justify-between gap-3">

          {/* LOGO */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 shrink-0"
          >
            <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
              F
            </div>

            <div className="hidden sm:block">
              <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900">
                Foodie<span className="text-orange-500">Hub</span>
              </h1>

              <p className="text-[10px] text-gray-400 -mt-1">
                Deliciousness delivered
              </p>
            </div>
          </button>

          {/* DESKTOP LOCATION */}
          <div className="hidden lg:block relative">
            <button
              onClick={() =>
                setLocationOpen(!locationOpen)
              }
              className="flex items-center gap-2 max-w-[250px] px-3 py-2 rounded-xl hover:bg-orange-50 transition"
            >
              <MapPin
                size={20}
                className="text-orange-500 shrink-0"
              />

              <div className="text-left min-w-0">
                <p className="text-xs text-gray-400">
                  Deliver to
                </p>

                <p className="text-sm font-semibold text-gray-700 truncate">
                  {shortLocation ||
                    location ||
                    "Choose your location"}
                </p>
              </div>

              <ChevronDown
                size={16}
                className="text-gray-400 shrink-0"
              />
            </button>

            {locationOpen && (
              <LocationDropdown
                location={location}
                shortLocation={shortLocation}
                loadingLocation={loadingLocation}
                locationMessage={locationMessage}
                detectLocation={detectLocation}
                enterLocationManually={
                  enterLocationManually
                }
                openGoogleMaps={openGoogleMaps}
                chooseCurrentLocation={
                  chooseCurrentLocation
                }
              />
            )}
          </div>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
            <button
              onClick={() => navigate("/")}
              className="font-medium text-gray-700 hover:text-orange-500 transition"
            >
              Home
            </button>

            <button
              onClick={() => {
                navigate("/");
                setTimeout(() => {
                  document
                    .getElementById("restaurants")
                    ?.scrollIntoView({
                      behavior: "smooth",
                    });
                }, 100);
              }}
              className="font-medium text-gray-700 hover:text-orange-500 transition"
            >
              Restaurants
            </button>

            <button
              onClick={() => {
                navigate("/");
                setTimeout(() => {
                  document
                    .getElementById("offers")
                    ?.scrollIntoView({
                      behavior: "smooth",
                    });
                }, 100);
              }}
              className="font-medium text-gray-700 hover:text-orange-500 transition"
            >
              Offers
            </button>

            <button
              onClick={() => {
                navigate("/");
                setTimeout(() => {
                  document
                    .getElementById("categories")
                    ?.scrollIntoView({
                      behavior: "smooth",
                    });
                }, 100);
              }}
              className="font-medium text-gray-700 hover:text-orange-500 transition"
            >
              Categories
            </button>
          </nav>

          {/* DESKTOP ACTIONS */}
          <div className="hidden md:flex items-center gap-2">

            {/* SEARCH */}
            {searchOpen ? (
              <form
                onSubmit={handleSearch}
                className="flex items-center border border-gray-200 rounded-xl overflow-hidden"
              >
                <input
                  autoFocus
                  type="text"
                  value={searchText}
                  onChange={(e) =>
                    setSearchText(e.target.value)
                  }
                  placeholder="Search food..."
                  className="w-32 xl:w-44 px-3 py-2 outline-none text-sm"
                />

                <button
                  type="submit"
                  className="p-2 text-orange-500 hover:bg-orange-50"
                >
                  <Search size={19} />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSearchOpen(false);
                    setSearchText("");
                  }}
                  className="p-2 text-gray-500 hover:bg-gray-50"
                >
                  <X size={18} />
                </button>
              </form>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2.5 rounded-xl text-gray-700 hover:text-orange-500 hover:bg-orange-50 transition"
                title="Search"
              >
                <Search size={21} />
              </button>
            )}

            {/* CART */}
            <button
              onClick={handleCartClick}
              className="relative p-2.5 rounded-xl text-gray-700 hover:text-orange-500 hover:bg-orange-50 transition"
              title="Cart"
            >
              <ShoppingCart size={21} />

              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-orange-500 text-white text-[11px] font-bold flex items-center justify-center">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </button>

            {/* PROFILE */}
            {isLoggedIn ? (
              <button
                onClick={() => navigate("/profile")}
                className="flex items-center gap-2 hover:bg-orange-50 rounded-xl px-2 py-1.5 transition"
                title="My Profile"
              >
                <div className="w-9 h-9 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">
                  {profileLetter}
                </div>

                <span className="hidden xl:block max-w-[110px] truncate font-semibold text-gray-700">
                  {currentUser || "User"}
                </span>
              </button>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="flex items-center gap-2 text-gray-700 hover:text-orange-500 transition px-2"
              >
                <User size={20} />

                <span className="hidden xl:block font-medium">
                  Login
                </span>
              </button>
            )}
          </div>

          {/* MOBILE ACTIONS */}
          <div className="flex md:hidden items-center gap-1">

            <button
              onClick={handleCartClick}
              className="relative p-2 text-gray-700"
            >
              <ShoppingCart size={21} />

              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-4 h-4 px-1 rounded-full bg-orange-500 text-white text-[9px] font-bold flex items-center justify-center">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() =>
                setMobileMenuOpen(!mobileMenuOpen)
              }
              className="p-2 text-gray-700"
            >
              {mobileMenuOpen ? (
                <X size={23} />
              ) : (
                <Menu size={23} />
              )}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-100 pt-3">

            {/* LOCATION */}
            <button
              onClick={() =>
                setLocationOpen(!locationOpen)
              }
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-orange-50"
            >
              <MapPin
                size={20}
                className="text-orange-500"
              />

              <div className="text-left flex-1 min-w-0">
                <p className="text-xs text-gray-400">
                  Deliver to
                </p>

                <p className="text-sm font-semibold text-gray-700 truncate">
                  {shortLocation ||
                    location ||
                    "Choose your location"}
                </p>
              </div>

              <ChevronDown size={17} />
            </button>

            {locationOpen && (
              <div className="px-2 mt-2">
                <LocationDropdown
                  location={location}
                  shortLocation={shortLocation}
                  loadingLocation={loadingLocation}
                  locationMessage={locationMessage}
                  detectLocation={detectLocation}
                  enterLocationManually={
                    enterLocationManually
                  }
                  openGoogleMaps={openGoogleMaps}
                  chooseCurrentLocation={
                    chooseCurrentLocation
                  }
                  mobile
                />
              </div>
            )}

            {/* SEARCH */}
            <form
              onSubmit={handleSearch}
              className="flex mt-3 border border-gray-200 rounded-xl overflow-hidden"
            >
              <input
                type="text"
                value={searchText}
                onChange={(e) =>
                  setSearchText(e.target.value)
                }
                placeholder="Search food..."
                className="flex-1 px-4 py-3 outline-none text-sm"
              />

              <button
                type="submit"
                className="px-4 text-orange-500"
              >
                <Search size={20} />
              </button>
            </form>

            {/* LINKS */}
            <div className="mt-3 space-y-1">

              <button
                onClick={() => {
                  navigate("/");
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-4 py-3 rounded-xl hover:bg-orange-50 font-medium"
              >
                Home
              </button>

              <button
                onClick={() => {
                  navigate("/");
                  setMobileMenuOpen(false);

                  setTimeout(() => {
                    document
                      .getElementById("restaurants")
                      ?.scrollIntoView({
                        behavior: "smooth",
                      });
                  }, 100);
                }}
                className="w-full text-left px-4 py-3 rounded-xl hover:bg-orange-50 font-medium"
              >
                Restaurants
              </button>

              <button
                onClick={() => {
                  navigate("/");
                  setMobileMenuOpen(false);

                  setTimeout(() => {
                    document
                      .getElementById("offers")
                      ?.scrollIntoView({
                        behavior: "smooth",
                      });
                  }, 100);
                }}
                className="w-full text-left px-4 py-3 rounded-xl hover:bg-orange-50 font-medium"
              >
                Offers
              </button>

              <button
                onClick={() => {
                  navigate("/");
                  setMobileMenuOpen(false);

                  setTimeout(() => {
                    document
                      .getElementById("categories")
                      ?.scrollIntoView({
                        behavior: "smooth",
                      });
                  }, 100);
                }}
                className="w-full text-left px-4 py-3 rounded-xl hover:bg-orange-50 font-medium"
              >
                Categories
              </button>

              {/* PROFILE */}
              {isLoggedIn ? (
                <button
                  onClick={() => {
                    navigate("/profile");
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-orange-50"
                >
                  <div className="w-9 h-9 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">
                    {profileLetter}
                  </div>

                  <div className="text-left">
                    <p className="font-semibold text-gray-800">
                      {currentUser}
                    </p>

                    <p className="text-xs text-gray-500">
                      My Profile
                    </p>
                  </div>
                </button>
              ) : (
                <button
                  onClick={() => {
                    navigate("/login");
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-orange-50"
                >
                  <User size={20} />

                  <span className="font-medium">
                    Login
                  </span>
                </button>
              )}

              {/* LOGOUT */}
              {isLoggedIn && (
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 text-red-500"
                >
                  <LogOut size={19} />

                  <span className="font-medium">
                    Logout
                  </span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

// --------------------------------------------------
// LOCATION DROPDOWN COMPONENT
// --------------------------------------------------

function LocationDropdown({
  location,
  shortLocation,
  loadingLocation,
  locationMessage,
  detectLocation,
  enterLocationManually,
  openGoogleMaps,
  chooseCurrentLocation,
  mobile = false,
}) {
  return (
    <div
      className={`${
        mobile
          ? "w-full"
          : "absolute left-0 top-full mt-2 w-80"
      } bg-white border border-gray-100 rounded-2xl shadow-xl p-4 z-50`}
    >
      <div className="mb-3">
        <p className="font-bold text-gray-800">
          Choose delivery location
        </p>

        <p className="text-xs text-gray-500 mt-1">
          Set your location to find food near you.
        </p>
      </div>

      {/* CURRENT LOCATION */}
      <button
        onClick={detectLocation}
        disabled={loadingLocation}
        className="w-full flex items-center gap-3 p-3 rounded-xl border border-orange-100 bg-orange-50 hover:bg-orange-100 transition text-left disabled:opacity-60"
      >
        <div className="w-9 h-9 rounded-full bg-orange-500 text-white flex items-center justify-center shrink-0">
          <Navigation size={18} />
        </div>

        <div className="flex-1">
          <p className="font-semibold text-orange-600 text-sm">
            {loadingLocation
              ? "Detecting location..."
              : "Use current location"}
          </p>

          <p className="text-xs text-gray-500">
            Allow browser location access
          </p>
        </div>
      </button>

      {/* MANUAL LOCATION */}
      <button
        onClick={enterLocationManually}
        className="w-full flex items-center gap-3 p-3 mt-2 rounded-xl hover:bg-gray-50 transition text-left"
      >
        <MapPin
          size={19}
          className="text-gray-500"
        />

        <div>
          <p className="font-semibold text-gray-700 text-sm">
            Enter location manually
          </p>

          <p className="text-xs text-gray-400">
            Type your delivery address
          </p>
        </div>
      </button>

      {/* GOOGLE MAPS */}
      <button
        onClick={openGoogleMaps}
        className="w-full flex items-center gap-3 p-3 mt-1 rounded-xl hover:bg-gray-50 transition text-left"
      >
        <MapPin
          size={19}
          className="text-gray-500"
        />

        <div>
          <p className="font-semibold text-gray-700 text-sm">
            Open Google Maps
          </p>

          <p className="text-xs text-gray-400">
            View your location on map
          </p>
        </div>
      </button>

      {/* SAVED LOCATION */}
      {(location || shortLocation) && (
        <div className="mt-3 p-3 bg-gray-50 rounded-xl">
          <div className="flex items-start gap-2">
            <Check
              size={17}
              className="text-green-500 mt-0.5 shrink-0"
            />

            <div className="min-w-0">
              <p className="text-xs font-semibold text-green-600">
                Selected location
              </p>

              <p className="text-sm font-medium text-gray-700 truncate">
                {shortLocation || location}
              </p>

              {location &&
                location !== shortLocation && (
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {location}
                  </p>
                )}
            </div>
          </div>
        </div>
      )}

      {/* MESSAGE */}
      {locationMessage && (
        <p className="text-xs text-gray-500 mt-3">
          {locationMessage}
        </p>
      )}

      {/* DONE */}
      <button
        onClick={chooseCurrentLocation}
        className="w-full mt-3 py-2.5 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition"
      >
        Done
      </button>
    </div>
  );
}