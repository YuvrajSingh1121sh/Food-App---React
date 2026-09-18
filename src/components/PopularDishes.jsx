import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

import pizza from "../assets/images/dishes/pizza.jpg";
import burger from "../assets/images/dishes/burger.jpg";
import pasta from "../assets/images/dishes/pasta.jpg";
import sushi from "../assets/images/dishes/sushi.jpg";
import cake from "../assets/images/dishes/cake.jpg";

export default function PopularDishes() {
  const navigate = useNavigate();

  const dishes = [
    {
      id: "popular-margherita-pizza",
      name: "Cheesy Margherita Pizza",
      restaurant: "Pizza Palace",
      image: pizza,
      price: 249,
    },
    {
      id: "popular-classic-burger",
      name: "Classic Burger",
      restaurant: "Burger House",
      image: burger,
      price: 149,
    },
    {
      id: "popular-creamy-pasta",
      name: "Creamy Pasta",
      restaurant: "Italian Kitchen",
      image: pasta,
      price: 229,
    },
    {
      id: "popular-sushi",
      name: "Sushi Platter",
      restaurant: "Sushi Master",
      image: sushi,
      price: 299,
    },
    {
      id: "popular-chocolate-cake",
      name: "Chocolate Lava Cake",
      restaurant: "Sweet Corner",
      image: cake,
      price: 149,
    },
  ];

  const addToCart = (dish) => {
    const existingCart = JSON.parse(
      localStorage.getItem("foodiehub-cart") || "[]"
    );

    const existingItem = existingCart.find(
      (item) => item.id === dish.id
    );

    let updatedCart;

    if (existingItem) {
      updatedCart = existingCart.map((item) =>
        item.id === dish.id
          ? {
              ...item,
              quantity:
                (item.quantity || 1) + 1,
            }
          : item
      );
    } else {
      updatedCart = [
        ...existingCart,
        {
          id: dish.id,
          name: dish.name,
          restaurant: dish.restaurant,
          price: dish.price,
          image: dish.image,
          quantity: 1,
        },
      ];
    }

    localStorage.setItem(
      "foodiehub-cart",
      JSON.stringify(updatedCart)
    );

    const totalQuantity = updatedCart.reduce(
      (total, item) =>
        total + (item.quantity || 1),
      0
    );

    localStorage.setItem(
      "foodiehub-cart-count",
      totalQuantity.toString()
    );

    window.dispatchEvent(
      new Event("cartUpdated")
    );

    navigate("/cart");
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-7">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Popular Dishes
          </h2>

          <p className="text-gray-500 mt-1 text-sm">
            Order popular dishes from our restaurants
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        {dishes.map((dish) => (
          <div
            key={dish.id}
            className="bg-white rounded-2xl border border-gray-100 p-4 hover:shadow-lg transition"
          >
            <img
              src={dish.image}
              alt={dish.name}
              className="w-full h-40 rounded-xl object-cover"
            />

            <div className="mt-4">
              <h3 className="font-semibold text-gray-900">
                {dish.name}
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                {dish.restaurant}
              </p>

              <div className="flex items-center justify-between mt-4">
                <span className="text-orange-500 font-bold text-lg">
                  ₹{dish.price}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    addToCart(dish)
                  }
                  className="w-10 h-10 rounded-full border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white flex items-center justify-center transition"
                  aria-label={`Add ${dish.name} to cart`}
                >
                  <Plus size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}