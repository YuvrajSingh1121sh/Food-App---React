import {
  Search,
  ShoppingCart,
  User,
  MapPin,
  ChevronDown,
} from "lucide-react";

import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}

        <Link to="/">
          <h1 className="text-3xl font-bold">
            <span className="text-black">Foodie</span>
            <span className="text-orange-500">Hub</span>
          </h1>
        </Link>

        {/* Navigation Links */}

        <ul className="hidden lg:flex items-center gap-8 text-gray-700 font-medium">

          <li>
            <Link
              to="/"
              className="text-orange-500 border-b-2 border-orange-500 pb-1"
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

        {/* Right Section */}

        <div className="flex items-center gap-5">

          {/* Delivery Location */}

          <div className="hidden md:flex items-center border rounded-xl px-4 py-2 shadow-sm cursor-pointer hover:shadow-md transition">

            <MapPin
              className="text-orange-500"
              size={20}
            />

            <div className="ml-2 leading-4">

              <p className="text-xs text-gray-500">
                Delivery to
              </p>

              <p className="font-semibold text-sm">
                New Delhi
              </p>

            </div>

            <ChevronDown
              className="ml-2 text-gray-500"
              size={18}
            />

          </div>

          {/* Search */}

          <button className="hover:text-orange-500 transition">
            <Search size={24} />
          </button>

          {/* Cart */}

          <button className="relative hover:text-orange-500 transition">

            <ShoppingCart size={28} />

            <span
              className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] px-1.5 py-0.5 rounded-full"
            >
              3
            </span>

          </button>

          {/* User */}

          <button className="hover:text-orange-500 transition">
            <User size={30} />
          </button>

        </div>

      </div>
    </nav>
  );
}