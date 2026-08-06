import burger from "../assets/images/offers/burger.jpg";
import { ArrowRight } from "lucide-react";

export default function OfferBanner() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-500 to-orange-400">

        {/* Background Decoration */}
        <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-white/10"></div>
        <div className="absolute -bottom-24 right-0 w-72 h-72 rounded-full bg-white/10"></div>

        <div className="grid lg:grid-cols-2 items-center p-10">

          {/* Left */}
          <div className="text-white">

            <span className="bg-white text-orange-500 px-4 py-2 rounded-full font-semibold">
              Limited Time Offer
            </span>

            <h2 className="text-5xl font-bold mt-6 leading-tight">
              Get <span className="text-yellow-300">50% OFF</span>
              <br />
              on your first order
            </h2>

            <p className="mt-5 text-orange-100 text-lg">
              Order your favourite meals today and enjoy exclusive discounts.
            </p>

            <button className="mt-8 bg-white text-orange-500 px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-orange-100 transition">
              Order Now
              <ArrowRight size={18} />
            </button>

          </div>

          {/* Right */}
          <div className="relative flex justify-center mt-10 lg:mt-0">

            <img
              src={burger}
              alt="Burger"
              className="w-[380px] drop-shadow-2xl hover:scale-105 transition duration-500"
            />

            <div className="absolute top-6 right-6 bg-yellow-400 text-black w-28 h-28 rounded-full flex flex-col items-center justify-center shadow-2xl">
              <p className="text-sm font-semibold">UP TO</p>
              <h3 className="text-3xl font-bold">50%</h3>
              <p className="font-semibold">OFF</p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}