import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaGooglePlay,
  FaApple,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-24">

      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Features */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-b pb-10">
          <div>
            <h3 className="font-bold">🚚 Fast Delivery</h3>
            <p className="text-gray-500 text-sm">
              On time, every time
            </p>
          </div>

          <div>
            <h3 className="font-bold">🏷️ Best Offers</h3>
            <p className="text-gray-500 text-sm">
              Great deals & discounts
            </p>
          </div>

          <div>
            <h3 className="font-bold">🛡️ Secure Payment</h3>
            <p className="text-gray-500 text-sm">
              100% secure payments
            </p>
          </div>

          <div>
            <h3 className="font-bold">🎧 24/7 Support</h3>
            <p className="text-gray-500 text-sm">
              We're here to help
            </p>
          </div>
        </div>

        {/* Main Footer */}
        <div className="grid md:grid-cols-5 gap-10 py-12">
          <div className="md:col-span-2">
            <h2 className="text-4xl font-black">
              Foodie<span className="text-orange-500">Hub</span>
            </h2>

            <p className="text-gray-500 mt-4 max-w-sm">
              Delicious food delivered to your doorstep.
              Your favorite restaurants, fast and fresh.
            </p>

            <div className="flex gap-3 mt-5">
              <button className="w-10 h-10 rounded-full border flex items-center justify-center">
                <FaFacebookF />
              </button>

              <button className="w-10 h-10 rounded-full border flex items-center justify-center">
                <FaInstagram />
              </button>

              <button className="w-10 h-10 rounded-full border flex items-center justify-center">
                <FaTwitter />
              </button>

              <button className="w-10 h-10 rounded-full border flex items-center justify-center">
                <FaYoutube />
              </button>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4">Company</h4>

            <div className="space-y-3 text-gray-500">
              <p>About Us</p>
              <p>Careers</p>
              <p>Blog</p>
              <p>Press</p>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4">Help</h4>

            <div className="space-y-3 text-gray-500">
              <p>FAQs</p>
              <p>Delivery Info</p>
              <p>Payments</p>
              <p>Refund Policy</p>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4">
              Download App
            </h4>

            <div className="space-y-3">
              <button className="flex items-center gap-2 bg-black text-white px-4 py-3 rounded-lg w-full">
                <FaApple />
                App Store
              </button>

              <button className="flex items-center gap-2 bg-black text-white px-4 py-3 rounded-lg w-full">
                <FaGooglePlay />
                Google Play
              </button>
            </div>
          </div>
        </div>

        <div className="border-t pt-6 flex flex-col md:flex-row justify-between">
          <p className="text-gray-500">
            © 2026 FoodieHub. All rights reserved.
          </p>

          <div className="flex gap-5 text-gray-500">
            <p>Privacy Policy</p>
            <p>Terms of Service</p>
            <p>Cookies Policy</p>
          </div>
        </div>
      </div>
    </footer>
  );
}