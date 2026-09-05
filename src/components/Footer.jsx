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
    <footer className="bg-white border-t mt-12 sm:mt-16 lg:mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">

        {/* Features */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-6 border-b pb-8 sm:pb-10">
          <div>
            <h3 className="font-bold text-sm sm:text-base">
              🚚 Fast Delivery
            </h3>
            <p className="text-gray-500 text-xs sm:text-sm mt-1">
              On time, every time
            </p>
          </div>

          <div>
            <h3 className="font-bold text-sm sm:text-base">
              🏷️ Best Offers
            </h3>
            <p className="text-gray-500 text-xs sm:text-sm mt-1">
              Great deals & discounts
            </p>
          </div>

          <div>
            <h3 className="font-bold text-sm sm:text-base">
              🛡️ Secure Payment
            </h3>
            <p className="text-gray-500 text-xs sm:text-sm mt-1">
              100% secure payments
            </p>
          </div>

          <div>
            <h3 className="font-bold text-sm sm:text-base">
              🎧 24/7 Support
            </h3>
            <p className="text-gray-500 text-xs sm:text-sm mt-1">
              We're here to help
            </p>
          </div>
        </div>

        {/* Main Footer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 py-8 sm:py-12">

          {/* Brand */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl sm:text-4xl font-black">
              Foodie<span className="text-orange-500">Hub</span>
            </h2>

            <p className="text-gray-500 mt-3 sm:mt-4 max-w-sm text-sm sm:text-base">
              Delicious food delivered to your doorstep.
              Your favorite restaurants, fast and fresh.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3 mt-5">
              <button
                type="button"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-orange-500 hover:text-white hover:border-orange-500 transition"
              >
                <FaFacebookF />
              </button>

              <button
                type="button"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-orange-500 hover:text-white hover:border-orange-500 transition"
              >
                <FaInstagram />
              </button>

              <button
                type="button"
                aria-label="Twitter"
                className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-orange-500 hover:text-white hover:border-orange-500 transition"
              >
                <FaTwitter />
              </button>

              <button
                type="button"
                aria-label="YouTube"
                className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-orange-500 hover:text-white hover:border-orange-500 transition"
              >
                <FaYoutube />
              </button>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold mb-4 text-base sm:text-lg">
              Company
            </h4>

            <div className="space-y-3 text-gray-500 text-sm sm:text-base">
              <p className="hover:text-orange-500 cursor-pointer transition">
                About Us
              </p>
              <p className="hover:text-orange-500 cursor-pointer transition">
                Careers
              </p>
              <p className="hover:text-orange-500 cursor-pointer transition">
                Blog
              </p>
              <p className="hover:text-orange-500 cursor-pointer transition">
                Press
              </p>
            </div>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-bold mb-4 text-base sm:text-lg">
              Help
            </h4>

            <div className="space-y-3 text-gray-500 text-sm sm:text-base">
              <p className="hover:text-orange-500 cursor-pointer transition">
                FAQs
              </p>
              <p className="hover:text-orange-500 cursor-pointer transition">
                Delivery Info
              </p>
              <p className="hover:text-orange-500 cursor-pointer transition">
                Payments
              </p>
              <p className="hover:text-orange-500 cursor-pointer transition">
                Refund Policy
              </p>
            </div>
          </div>

          {/* Download App */}
          <div>
            <h4 className="font-bold mb-4 text-base sm:text-lg">
              Download App
            </h4>

            <div className="space-y-3">
              <button
                type="button"
                className="flex items-center gap-2 bg-black text-white px-4 py-3 rounded-lg w-full text-sm sm:text-base hover:bg-gray-800 transition"
              >
                <FaApple size={18} />
                App Store
              </button>

              <button
                type="button"
                className="flex items-center gap-2 bg-black text-white px-4 py-3 rounded-lg w-full text-sm sm:text-base hover:bg-gray-800 transition"
              >
                <FaGooglePlay size={17} />
                Google Play
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t pt-6 flex flex-col md:flex-row gap-4 md:gap-0 justify-between">

          <p className="text-gray-500 text-xs sm:text-sm">
            © 2026 FoodieHub. All rights reserved.
          </p>

          <div className="flex flex-wrap gap-4 sm:gap-5 text-gray-500 text-xs sm:text-sm">
            <p className="hover:text-orange-500 cursor-pointer transition">
              Privacy Policy
            </p>

            <p className="hover:text-orange-500 cursor-pointer transition">
              Terms of Service
            </p>

            <p className="hover:text-orange-500 cursor-pointer transition">
              Cookies Policy
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}