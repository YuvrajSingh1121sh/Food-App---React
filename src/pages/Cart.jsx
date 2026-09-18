import { useEffect, useState } from "react";
import {
  Minus,
  Plus,
  ShoppingBag,
  ArrowLeft,
  MapPin,
  CreditCard,
  CheckCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);

  // -----------------------------------------
  // LOAD CART
  // -----------------------------------------

  useEffect(() => {
    loadCart();

    const updateCart = () => {
      loadCart();
    };

    window.addEventListener("cartUpdated", updateCart);
    window.addEventListener("storage", updateCart);

    return () => {
      window.removeEventListener(
        "cartUpdated",
        updateCart
      );

      window.removeEventListener(
        "storage",
        updateCart
      );
    };
  }, []);

  const loadCart = () => {
    try {
      const savedCart = JSON.parse(
        localStorage.getItem("foodiehub-cart") || "[]"
      );

      setCart(Array.isArray(savedCart) ? savedCart : []);
    } catch (error) {
      console.error("Unable to load cart:", error);
      setCart([]);
    }
  };

  // -----------------------------------------
  // SAVE CART
  // -----------------------------------------

  const saveCart = (updatedCart) => {
    setCart(updatedCart);

    localStorage.setItem(
      "foodiehub-cart",
      JSON.stringify(updatedCart)
    );

    const totalQuantity = updatedCart.reduce(
      (total, item) =>
        total + Number(item.quantity || 1),
      0
    );

    localStorage.setItem(
      "foodiehub-cart-count",
      String(totalQuantity)
    );

    window.dispatchEvent(
      new Event("cartUpdated")
    );
  };

  // -----------------------------------------
  // INCREASE QUANTITY
  // -----------------------------------------

  const increaseQuantity = (index) => {
    const updatedCart = cart.map((item, itemIndex) =>
      itemIndex === index
        ? {
            ...item,
            quantity:
              Number(item.quantity || 1) + 1,
          }
        : item
    );

    saveCart(updatedCart);
  };

  // -----------------------------------------
  // DECREASE QUANTITY
  // -----------------------------------------

  const decreaseQuantity = (index) => {
    const updatedCart = [...cart];

    const currentQuantity = Number(
      updatedCart[index].quantity || 1
    );

    if (currentQuantity <= 1) {
      updatedCart.splice(index, 1);
    } else {
      updatedCart[index] = {
        ...updatedCart[index],
        quantity: currentQuantity - 1,
      };
    }

    saveCart(updatedCart);
  };

  // -----------------------------------------
  // PRICE CALCULATIONS
  // -----------------------------------------

  const subtotal = cart.reduce(
    (total, item) =>
      total +
      Number(item.price || 0) *
        Number(item.quantity || 1),
    0
  );

  const deliveryFee =
    cart.length > 0 ? 40 : 0;

  const total = subtotal + deliveryFee;

  const totalItems = cart.reduce(
    (total, item) =>
      total + Number(item.quantity || 1),
    0
  );

  // -----------------------------------------
  // PLACE ORDER
  // -----------------------------------------

  const handleCheckout = () => {
    if (cart.length === 0) {
      return;
    }

    const existingOrders = JSON.parse(
      localStorage.getItem(
        "foodiehub-orders"
      ) || "[]"
    );

    const newOrder = {
      id: Date.now(),

      orderNumber:
        "FH" +
        Date.now()
          .toString()
          .slice(-6),

      date: new Date().toLocaleString(),

      items: cart.map((item) => ({
        id: item.id,
        name: item.name,
        restaurant: item.restaurant || "",
        price: Number(item.price || 0),
        image: item.image || "",
        quantity: Number(item.quantity || 1),
      })),

      subtotal,

      deliveryFee,

      total,

      status: "Order Placed",

      paymentMethod: "Cash on Delivery",
    };

    const updatedOrders = [
      newOrder,
      ...existingOrders,
    ];

    localStorage.setItem(
      "foodiehub-orders",
      JSON.stringify(updatedOrders)
    );

    // Clear cart
    localStorage.removeItem("foodiehub-cart");

    localStorage.setItem(
      "foodiehub-cart-count",
      "0"
    );

    setCart([]);

    window.dispatchEvent(
      new Event("cartUpdated")
    );

    setOrderPlaced(true);

    // Open profile after success message
    setTimeout(() => {
      navigate("/profile");
    }, 1200);
  };

  // -----------------------------------------
  // EMPTY CART
  // -----------------------------------------

  if (cart.length === 0 && !orderPlaced) {
    return (
      <main className="min-h-[70vh] bg-gray-50 px-4 py-10 sm:py-14">
        <div className="max-w-3xl mx-auto">

          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-gray-600 hover:text-orange-500 transition mb-6"
          >
            <ArrowLeft size={18} />
            Back to Home
          </button>

          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 sm:p-14 text-center">

            <div className="w-24 h-24 mx-auto rounded-full bg-orange-50 flex items-center justify-center">
              <ShoppingBag
                size={42}
                className="text-orange-500"
              />
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-6">
              Your cart is empty
            </h1>

            <p className="text-gray-500 mt-2">
              Add some delicious food to your cart.
            </p>

            <button
              onClick={() => navigate("/")}
              className="mt-7 px-6 py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition"
            >
              Browse Food
            </button>
          </div>
        </div>
      </main>
    );
  }

  // -----------------------------------------
  // ORDER SUCCESS
  // -----------------------------------------

  if (orderPlaced) {
    return (
      <main className="min-h-[70vh] bg-gray-50 flex items-center justify-center px-4 py-12">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 sm:p-12 text-center max-w-lg w-full">

          <div className="w-20 h-20 mx-auto rounded-full bg-green-50 flex items-center justify-center">
            <CheckCircle
              size={45}
              className="text-green-500"
            />
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-6">
            Order Placed!
          </h1>

          <p className="text-gray-500 mt-2">
            Your order has been added to your order history.
          </p>

          <p className="text-sm text-gray-400 mt-4">
            Taking you to your profile...
          </p>
        </div>
      </main>
    );
  }

  // -----------------------------------------
  // CART PAGE
  // -----------------------------------------

  return (
    <main className="bg-gray-50 min-h-screen px-4 py-6 sm:py-10">
      <div className="max-w-7xl mx-auto">

        {/* PAGE HEADER */}
        <div className="flex items-center justify-between gap-4 mb-6 sm:mb-8">

          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Your Cart
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              {totalItems} item
              {totalItems !== 1 ? "s" : ""}
            </p>
          </div>

          <button
            onClick={() => navigate("/")}
            className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-700 hover:border-orange-300 hover:text-orange-500 transition"
          >
            <ArrowLeft size={18} />
            Add More Food
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 lg:gap-8">

          {/* -------------------------------- */}
          {/* CART ITEMS */}
          {/* -------------------------------- */}

          <section className="space-y-4">

            {cart.map((item, index) => {
              const quantity = Number(
                item.quantity || 1
              );

              const itemTotal =
                Number(item.price || 0) *
                quantity;

              return (
                <div
                  key={`${item.id || item.name}-${index}`}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5"
                >
                  <div className="flex gap-4">

                    {/* IMAGE */}
                    <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden bg-gray-100 shrink-0">

                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ShoppingBag
                            size={30}
                            className="text-gray-300"
                          />
                        </div>
                      )}

                    </div>

                    {/* DETAILS */}
                    <div className="flex-1 min-w-0">

                      <div className="flex justify-between gap-3">

                        <div className="min-w-0">
                          <h2 className="font-bold text-gray-900 text-base sm:text-lg truncate">
                            {item.name}
                          </h2>

                          {item.restaurant && (
                            <p className="text-sm text-gray-500 mt-1 truncate">
                              {item.restaurant}
                            </p>
                          )}
                        </div>

                        <p className="font-bold text-orange-500 whitespace-nowrap">
                          ₹{itemTotal}
                        </p>
                      </div>

                      {item.rating && (
                        <p className="text-xs text-gray-500 mt-2">
                          ⭐ {item.rating}
                        </p>
                      )}

                      {/* QUANTITY */}
                      <div className="flex items-center justify-between mt-4">

                        <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">

                          <button
                            onClick={() =>
                              decreaseQuantity(index)
                            }
                            className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center hover:bg-orange-50 text-gray-600 hover:text-orange-500 transition"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={16} />
                          </button>

                          <span className="w-9 sm:w-10 text-center font-semibold text-gray-800">
                            {quantity}
                          </span>

                          <button
                            onClick={() =>
                              increaseQuantity(index)
                            }
                            className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center hover:bg-orange-50 text-gray-600 hover:text-orange-500 transition"
                            aria-label="Increase quantity"
                          >
                            <Plus size={16} />
                          </button>

                        </div>

                        <p className="text-sm text-gray-500">
                          ₹{item.price} each
                        </p>
                      </div>

                    </div>
                  </div>
                </div>
              );
            })}

            {/* MOBILE ADD MORE */}
            <button
              onClick={() => navigate("/")}
              className="sm:hidden w-full flex items-center justify-center gap-2 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 font-semibold"
            >
              <ArrowLeft size={18} />
              Add More Food
            </button>

          </section>

          {/* -------------------------------- */}
          {/* ORDER SUMMARY */}
          {/* -------------------------------- */}

          <aside className="lg:sticky lg:top-24 h-fit">

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6">

              <h2 className="text-xl font-bold text-gray-900">
                Order Summary
              </h2>

              {/* LOCATION */}
              <div className="flex gap-3 mt-5 p-3 rounded-xl bg-gray-50">

                <MapPin
                  size={19}
                  className="text-orange-500 shrink-0 mt-0.5"
                />

                <div className="min-w-0">

                  <p className="text-xs text-gray-400">
                    Deliver to
                  </p>

                  <p className="text-sm font-semibold text-gray-700 truncate">
                    {localStorage.getItem(
                      "foodiehub-short-location"
                    ) ||
                      localStorage.getItem(
                        "foodiehub-location"
                      ) ||
                      "Location not selected"}
                  </p>

                  {!localStorage.getItem(
                    "foodiehub-location"
                  ) && (
                    <button
                      onClick={() => navigate("/")}
                      className="text-xs text-orange-500 font-semibold mt-1"
                    >
                      Select location
                    </button>
                  )}

                </div>
              </div>

              {/* PRICE */}
              <div className="border-t border-gray-100 mt-5 pt-5 space-y-3">

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">
                    Subtotal
                  </span>

                  <span className="font-medium">
                    ₹{subtotal}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">
                    Delivery Fee
                  </span>

                  <span className="font-medium">
                    ₹{deliveryFee}
                  </span>
                </div>

              </div>

              {/* TOTAL */}
              <div className="border-t border-gray-100 mt-5 pt-5 flex justify-between items-center">

                <span className="text-lg font-bold text-gray-900">
                  Total
                </span>

                <span className="text-2xl font-extrabold text-orange-500">
                  ₹{total}
                </span>

              </div>

              {/* PAYMENT */}
              <div className="flex items-center gap-2 mt-5 text-xs text-gray-500">
                <CreditCard size={15} />
                Payment: Cash on Delivery
              </div>

              {/* CHECKOUT */}
              <button
                onClick={handleCheckout}
                className="w-full mt-5 py-3.5 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 active:scale-[0.99] transition"
              >
                Place Order • ₹{total}
              </button>

              <p className="text-[11px] text-gray-400 text-center mt-3">
                Your order will appear in your FoodieHub order history.
              </p>

            </div>
          </aside>

        </div>
      </div>
    </main>
  );
}