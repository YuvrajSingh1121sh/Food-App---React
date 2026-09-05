import { ArrowRight, Percent } from "lucide-react";

import offerImage from "../assets/images/offers/burger.jpg";

export default function OfferBanner() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-6 sm:gap-8 bg-orange-50 rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 overflow-hidden">

        {/* Content */}
        <div className="order-2 lg:order-1">
          <div className="inline-flex items-center gap-2 bg-orange-500 text-white px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-4">
            <Percent size={16} />
            Limited Time Offer
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            Get Up To
            <span className="block text-orange-500">
              50% OFF
            </span>
            On Your First Order
          </h2>

          <p className="text-gray-600 text-sm sm:text-base lg:text-lg mt-4 max-w-lg">
            Enjoy delicious food from your favorite restaurants with amazing
            discounts delivered straight to your doorstep.
          </p>

          <button
            type="button"
            className="mt-6 inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 sm:px-6 py-3 rounded-xl transition-all duration-200"
          >
            Order Now
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Image */}
        <div className="order-1 lg:order-2 flex justify-center">
          <img
            src={offerImage}
            alt="Special food offer"
            className="w-full max-w-xs sm:max-w-sm lg:max-w-[380px] object-contain"
          />
        </div>
      </div>
    </section>
  );
}