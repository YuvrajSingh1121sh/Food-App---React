import { Link } from "react-router-dom";
import {
  ShoppingCart,
  ArrowLeft,
  Trash2,
} from "lucide-react";

export default function Cart() {
  const cartItems = JSON.parse(
    localStorage.getItem("foodiehub-cart") || "[]"
  );

  const total = cartItems.reduce(
    (sum, item) =>
      sum + Number(item.price || 0) * Number(item.quantity || 1),
    0
  );

  const removeItem = (id) => {
    const updatedCart = cartItems.filter(
      (item) => item.id !== id
    );

    localStorage.setItem(
      "foodiehub-cart",
      JSON.stringify(updatedCart)
    );

    localStorage.setItem(
      "foodiehub-cart-count",
      updatedCart.reduce(
        (sum, item) => sum + (item.quantity || 1),
        0
      )
    );

    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12 px-4">

      <div className="max-w-5xl mx-auto">

        <Link
          to="/"
          className="inline-flex items-center gap-2 text-orange-500 font-semibold mb-6 hover:text-orange-600"
        >
          <ArrowLeft size={18} />
          Continue Shopping
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <ShoppingCart
            size={30}
            className="text-orange-500"
          />

          <h1 className="text-2xl sm:text-3xl font-bold">
            Your Basket
          </h1>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 sm:p-12 text-center shadow-sm">

            <ShoppingCart
              size={60}
              className="mx-auto text-gray-300"
            />

            <h2 className="text-xl sm:text-2xl font-bold mt-5">
              Your basket is empty
            </h2>

            <p className="text-gray-500 mt-2">
              Add some delicious food to get started.
            </p>

            <Link
              to="/"
              className="inline-block mt-6 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl transition"
            >
              Browse Food
            </Link>

          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">

            {/* Items */}
            <div className="lg:col-span-2 space-y-4">

              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded-xl object-cover"
                  />

                  <div className="flex-1">
                    <h3 className="font-bold">
                      {item.name}
                    </h3>

                    <p className="text-orange-500 font-semibold mt-1">
                      ₹{item.price}
                    </p>

                    <p className="text-sm text-gray-500">
                      Quantity: {item.quantity || 1}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                    aria-label="Remove item"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}

            </div>

            {/* Summary */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm h-fit">

              <h2 className="text-xl font-bold">
                Order Summary
              </h2>

              <div className="flex justify-between mt-6 text-gray-600">
                <span>Subtotal</span>
                <span>₹{total}</span>
              </div>

              <div className="flex justify-between mt-3 text-gray-600">
                <span>Delivery Fee</span>
                <span>₹40</span>
              </div>

              <div className="border-t mt-5 pt-5 flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-orange-500">
                  ₹{total + 40}
                </span>
              </div>

              <button
                type="button"
                className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition"
              >
                Proceed to Checkout
              </button>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}