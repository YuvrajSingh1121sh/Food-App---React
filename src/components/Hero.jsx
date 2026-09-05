import {
  MapPin,
  Bike,
  BadgePercent,
  ShieldCheck,
  Zap,
} from "lucide-react";

import heroImage from "../assets/images/plate.jpg";

export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* Hero Container */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 items-center bg-orange-50 rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 shadow-sm">

        {/* Left Content */}
        <div className="text-center lg:text-left">

          {/* Small Badge */}
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm text-sm text-gray-700">
            <Zap size={16} className="text-orange-500" />
            <span>Fast & Fresh Delivery</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mt-5 sm:mt-8 leading-tight text-gray-900">
            Delicious Food,
            <br />
            <span className="text-orange-500">Delivered Fast.</span>
          </h1>

          {/* Description */}
          <p className="text-gray-600 text-base sm:text-lg mt-4 sm:mt-6 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Order your favorite meals from the best restaurants around you
            and get them delivered straight to your doorstep.
          </p>

          {/* Search Box */}
          <div className="flex flex-col sm:flex-row mt-6 sm:mt-8 bg-white rounded-xl shadow overflow-hidden w-full max-w-xl mx-auto lg:mx-0">

            <div className="flex items-center gap-2 px-4 py-3 flex-1 min-w-0">
              <MapPin
                size={22}
                className="text-orange-500 flex-shrink-0"
              />

              <input
                type="text"
                placeholder="Enter your delivery location"
                className="w-full min-w-0 outline-none text-gray-700 text-sm sm:text-base"
              />
            </div>

            <button className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white px-6 sm:px-8 py-3 font-semibold transition">
              Find Food
            </button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-10">

            {/* Feature 1 */}
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <div className="bg-white p-3 rounded-full shadow-sm">
                <Bike className="text-orange-500" size={22} />
              </div>

              <div className="text-left">
                <p className="font-semibold text-gray-800 text-sm">
                  Fast Delivery
                </p>
                <p className="text-xs text-gray-500">
                  At your doorstep
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <div className="bg-white p-3 rounded-full shadow-sm">
                <BadgePercent
                  className="text-orange-500"
                  size={22}
                />
              </div>

              <div className="text-left">
                <p className="font-semibold text-gray-800 text-sm">
                  Best Offers
                </p>
                <p className="text-xs text-gray-500">
                  Save more
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <div className="bg-white p-3 rounded-full shadow-sm">
                <ShieldCheck
                  className="text-orange-500"
                  size={22}
                />
              </div>

              <div className="text-left">
                <p className="font-semibold text-gray-800 text-sm">
                  Safe & Secure
                </p>
                <p className="text-xs text-gray-500">
                  Trusted service
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Right Image */}
        <div className="flex justify-center items-center order-first lg:order-last">
          <img
            src={heroImage}
            alt="Delicious food"
            className="w-full max-w-xs sm:max-w-md lg:max-w-lg mx-auto object-contain"
          />
        </div>

      </div>
    </section>
  );
}