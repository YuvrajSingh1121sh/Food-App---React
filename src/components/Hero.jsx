import {
  MapPin,
  Bike,
  BadgePercent,
  ShieldCheck,
  Zap
} from "lucide-react";

import heroImage from "../assets/images/plate.jpg";

export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-8">

      <div className="grid lg:grid-cols-2 gap-10 items-center bg-orange-50 rounded-3xl p-10 shadow-sm">

        {/* LEFT */}

        <div>

          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full font-semibold">

            <Zap size={16} />

            FAST DELIVERY

          </div>

          <h1 className="text-6xl font-bold mt-8 leading-tight">

            Delicious food,

            <span className="block text-orange-500">
              delivered to you
            </span>

          </h1>

          <p className="text-gray-600 text-lg mt-6">
            Order from your favorite restaurants
            and get it delivered fast to your doorstep.
          </p>

          {/* Search */}

          <div className="flex mt-8 shadow rounded-xl overflow-hidden">

            <div className="flex items-center px-4 bg-white">

              <MapPin className="text-gray-400" />

            </div>

            <input
              type="text"
              placeholder="Enter your delivery address"
              className="flex-1 p-4 outline-none"
            />

            <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 font-semibold">
              Find Food
            </button>

          </div>

          {/* Features */}

          <div className="grid grid-cols-3 gap-6 mt-10">

            <div className="flex gap-3">

              <Bike
                className="text-orange-500 bg-orange-100 rounded-full p-2"
                size={44}
              />

              <div>

                <h3 className="font-semibold">
                  Fast Delivery
                </h3>

                <p className="text-sm text-gray-500">
                  On time
                </p>

              </div>

            </div>

            <div className="flex gap-3">

              <BadgePercent
                className="text-orange-500 bg-orange-100 rounded-full p-2"
                size={44}
              />

              <div>

                <h3 className="font-semibold">
                  Best Offers
                </h3>

                <p className="text-sm text-gray-500">
                  Great discounts
                </p>

              </div>

            </div>

            <div className="flex gap-3">

              <ShieldCheck
                className="text-orange-500 bg-orange-100 rounded-full p-2"
                size={44}
              />

              <div>

                <h3 className="font-semibold">
                  Secure Payment
                </h3>

                <p className="text-sm text-gray-500">
                  100% Safe
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div className="relative flex justify-center">

          {/* Discount Badge */}

          <div className="absolute top-0 left-6 bg-orange-500 text-white rounded-full w-28 h-28 flex flex-col justify-center items-center shadow-xl z-10">

            <p className="text-sm">
              UP TO
            </p>

            <h2 className="text-3xl font-bold">
              50%
            </h2>

            <p>
              OFF
            </p>

          </div>

          <img
            src={heroImage}
            alt="Food"
            className="w-full max-w-xl object-contain drop-shadow-2xl"
          />

        </div>

      </div>

    </section>
  );
}