import { Plus } from "lucide-react";

import pizza from "../assets/images/dishes/pizza.jpg";
import burger from "../assets/images/dishes/burger.jpg";
import pasta from "../assets/images/dishes/pasta.jpg";
import sushi from "../assets/images/dishes/sushi.jpg";
import cake from "../assets/images/dishes/cake.jpg";

export default function PopularDishes() {
  const dishes = [
    {
      id: 1,
      name: "Cheesy Margherita Pizza",
      image: pizza,
      price: 299,
    },
    {
      id: 2,
      name: "Classic Beef Burger",
      image: burger,
      price: 199,
    },
    {
      id: 3,
      name: "Chicken Alfredo Pasta",
      image: pasta,
      price: 349,
    },
    {
      id: 4,
      name: "Sushi Platter",
      image: sushi,
      price: 599,
    },
    {
      id: 5,
      name: "Chocolate Lava Cake",
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
              quantity: (item.quantity || 1) + 1,
            }
          : item
      );
    } else {
      updatedCart = [
        ...existingCart,
        {
          ...dish,
          quantity: 1,
        },
      ];
    }

    localStorage.setItem(
      "foodiehub-cart",
      JSON.stringify(updatedCart)
    );

    const count = updatedCart.reduce(
      (sum, item) => sum + (item.quantity || 1),
      0
    );

    localStorage.setItem(
      "foodiehub-cart-count",
      count
    );

    alert(`${dish.name} added to basket!`);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">

      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Popular Dishes
          </h2>

          <p className="text-sm sm:text-base text-gray-500 mt-1">
            Try our most loved dishes
          </p>
        </div>

        <button
          type="button"
          className="text-orange-500 font-semibold text-sm sm:text-base"
        >
          View All →
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">

        {dishes.map((dish) => (
          <div
            key={dish.id}
            className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-3 sm:gap-4 hover:shadow-lg transition-all duration-300"
          >

            <img
              src={dish.image}
              alt={dish.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover flex-shrink-0"
            />

            <div className="flex-1 min-w-0">

              <h3 className="font-semibold text-sm sm:text-base text-gray-900 line-clamp-2">
                {dish.name}
              </h3>

              <p className="text-orange-500 font-bold mt-2 text-sm sm:text-base">
                ₹{dish.price}
              </p>

            </div>

            <button
              type="button"
              onClick={() => addToCart(dish)}
              aria-label={`Add ${dish.name} to cart`}
              className="w-9 h-9 sm:w-10 sm:h-10 flex-shrink-0 rounded-full border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-all duration-200 flex items-center justify-center"
            >
              <Plus size={18} />
            </button>

          </div>
        ))}

      </div>
    </section>
  );
}