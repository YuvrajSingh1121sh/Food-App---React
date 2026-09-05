import { useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search, ArrowLeft, Star, Plus } from "lucide-react";

import burgerDish from "../assets/images/dishes/burger.jpg";
import cake from "../assets/images/dishes/cake.jpg";
import pasta from "../assets/images/dishes/pasta.jpg";
import pizzaDish from "../assets/images/dishes/pizza.jpg";
import sushiDish from "../assets/images/dishes/sushi.jpg";

const dishes = [
  {
    id: 1,
    name: "Classic Burger",
    category: "Burger",
    price: 149,
    rating: 4.7,
    image: burgerDish,
  },
  {
    id: 2,
    name: "Cheese Burger",
    category: "Burger",
    price: 179,
    rating: 4.8,
    image: burgerDish,
  },
  {
    id: 3,
    name: "Chocolate Cake",
    category: "Dessert",
    price: 199,
    rating: 4.6,
    image: cake,
  },
  {
    id: 4,
    name: "Creamy Pasta",
    category: "Pasta",
    price: 229,
    rating: 4.5,
    image: pasta,
  },
  {
    id: 5,
    name: "Margherita Pizza",
    category: "Pizza",
    price: 249,
    rating: 4.7,
    image: pizzaDish,
  },
  {
    id: 6,
    name: "Chicken Sushi",
    category: "Sushi",
    price: 299,
    rating: 4.8,
    image: sushiDish,
  },
];

function addToCart(item) {
  const cart = JSON.parse(
    localStorage.getItem("foodiehub-cart") || "[]"
  );

  const existingItem = cart.find((cartItem) => cartItem.id === item.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      ...item,
      quantity: 1,
    });
  }

  localStorage.setItem("foodiehub-cart", JSON.stringify(cart));

  const count = cart.reduce(
    (total, cartItem) => total + cartItem.quantity,
    0
  );

  localStorage.setItem("foodiehub-cart-count", count);

  alert(`${item.name} added to basket!`);
}

export default function SearchPage() {
  const [searchParams] = useSearchParams();

  const query = searchParams.get("q") || "";

  const results = useMemo(() => {
    const searchText = query.toLowerCase().trim();

    if (!searchText) {
      return dishes;
    }

    return dishes.filter(
      (dish) =>
        dish.name.toLowerCase().includes(searchText) ||
        dish.category.toLowerCase().includes(searchText)
    );
  }, [query]);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">

        {/* Back */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-500 mb-6"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>

        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900">
            Search Results
          </h1>

          <p className="text-gray-500 mt-2">
            {query
              ? `Showing results for "${query}"`
              : "Explore our delicious dishes"}
          </p>
        </div>

        {/* Results */}
        {results.length > 0 ? (
          <>
            <p className="text-sm text-gray-500 mb-5">
              {results.length} result{results.length !== 1 ? "s" : ""} found
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {results.map((dish) => (
                <div
                  key={dish.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition"
                >
                  {/* Image */}
                  <div className="relative">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-48 object-cover"
                    />

                    <div className="absolute top-3 left-3 bg-white px-2 py-1 rounded-lg text-sm font-semibold flex items-center gap-1">
                      <Star
                        size={15}
                        className="fill-yellow-400 text-yellow-400"
                      />
                      {dish.rating}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-4">
                    <p className="text-sm text-orange-500 font-medium">
                      {dish.category}
                    </p>

                    <h2 className="font-bold text-lg mt-1">
                      {dish.name}
                    </h2>

                    <div className="flex items-center justify-between mt-4">
                      <span className="font-bold text-xl">
                        ₹{dish.price}
                      </span>

                      <button
                        onClick={() => addToCart(dish)}
                        className="bg-orange-500 hover:bg-orange-600 text-white w-10 h-10 rounded-full flex items-center justify-center transition"
                      >
                        <Plus size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          /* No results */
          <div className="bg-white rounded-2xl p-10 sm:p-16 text-center shadow-sm">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <Search className="text-orange-500" size={28} />
            </div>

            <h2 className="text-xl sm:text-2xl font-bold">
              No results found
            </h2>

            <p className="text-gray-500 mt-2">
              We couldn't find anything matching "{query}".
            </p>

            <Link
              to="/"
              className="inline-block mt-6 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold"
            >
              Browse Food
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}