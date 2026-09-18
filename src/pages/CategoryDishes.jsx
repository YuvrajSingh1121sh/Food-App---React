import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  Clock3,
  Plus,
  Star,
  Tag,
  Utensils,
} from "lucide-react";

import { foodData } from "../data/foodData";

export default function CategoryDishes() {
  const { category } = useParams();
  const navigate = useNavigate();

  const [sortBy, setSortBy] = useState("recommended");

  const decodedCategory = decodeURIComponent(category || "");

  const dishes = foodData[decodedCategory] || [];

  /*
    Group restaurants by dish name.

    Example:

    Margherita Pizza
      - Pizza Palace
      - Burger House
      - Italian Kitchen

    Cheese Burst Pizza
      - Food Junction
      - Urban Bites
  */
  const groupedDishes = useMemo(() => {
    const groups = {};

    dishes.forEach((item) => {
      if (!groups[item.dish]) {
        groups[item.dish] = [];
      }

      groups[item.dish].push(item);
    });

    return Object.entries(groups).map(
      ([dishName, restaurants]) => ({
        dishName,
        restaurants,
      })
    );
  }, [dishes]);

  const sortedGroups = useMemo(() => {
    const groups = [...groupedDishes];

    groups.forEach((group) => {
      group.restaurants = [...group.restaurants];

      if (sortBy === "price-low") {
        group.restaurants.sort(
          (a, b) => a.price - b.price
        );
      }

      if (sortBy === "price-high") {
        group.restaurants.sort(
          (a, b) => b.price - a.price
        );
      }

      if (sortBy === "rating") {
        group.restaurants.sort(
          (a, b) => b.rating - a.rating
        );
      }

      if (sortBy === "delivery") {
        group.restaurants.sort((a, b) => {
          const aTime = parseInt(a.deliveryTime);
          const bTime = parseInt(b.deliveryTime);

          return aTime - bTime;
        });
      }

      if (sortBy === "offer") {
        group.restaurants.sort((a, b) => {
          const aOffer = parseInt(a.offer);
          const bOffer = parseInt(b.offer);

          return bOffer - aOffer;
        });
      }
    });

    if (
      sortBy === "price-low" ||
      sortBy === "price-high"
    ) {
      groups.sort(
        (a, b) =>
          a.restaurants[0].price -
          b.restaurants[0].price
      );
    }

    return groups;
  }, [groupedDishes, sortBy]);

  const addToCart = (item) => {
    const existingCart = JSON.parse(
      localStorage.getItem("foodiehub-cart") || "[]"
    );

    const existingItem = existingCart.find(
      (cartItem) => cartItem.id === item.id
    );

    let updatedCart;

    if (existingItem) {
      updatedCart = existingCart.map((cartItem) =>
        cartItem.id === item.id
          ? {
              ...cartItem,
              quantity:
                (cartItem.quantity || 1) + 1,
            }
          : cartItem
      );
    } else {
      updatedCart = [
        ...existingCart,
        {
          id: item.id,
          name: item.dish,
          restaurant: item.restaurant,
          price: item.price,
          image: item.image,
          quantity: 1,
        },
      ];
    }

    localStorage.setItem(
      "foodiehub-cart",
      JSON.stringify(updatedCart)
    );

    const totalQuantity = updatedCart.reduce(
      (total, cartItem) =>
        total + (cartItem.quantity || 1),
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

  if (!dishes.length) {
    return (
      <main className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center">
          <Utensils
            size={50}
            className="mx-auto text-gray-300"
          />

          <h1 className="text-2xl font-bold text-gray-800 mt-4">
            No dishes found
          </h1>

          <p className="text-gray-500 mt-2">
            We couldn't find dishes in this category.
          </p>

          <button
            onClick={() => navigate("/")}
            className="mt-5 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold"
          >
            Back to Home
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Header */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 sm:py-8">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-gray-600 hover:text-orange-500 font-medium mb-5"
          >
            <ArrowLeft size={18} />
            Back to Categories
          </button>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
            <div>
              <p className="text-orange-500 font-semibold text-sm">
                EXPLORE {decodedCategory.toUpperCase()}
              </p>

              <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mt-1">
                {decodedCategory} from different restaurants
              </h1>

              <p className="text-gray-500 mt-2 max-w-2xl">
                Compare the same dishes across restaurants,
                check prices, offers, ratings and delivery
                time before ordering.
              </p>
            </div>

            <div className="bg-orange-50 text-orange-600 rounded-xl px-4 py-3 text-sm">
              <span className="font-bold">
                {dishes.length}
              </span>{" "}
              restaurant options
              <span className="mx-1">•</span>
              <span className="font-bold">
                {groupedDishes.length}
              </span>{" "}
              dishes
            </div>
          </div>
        </div>
      </section>

      {/* Sorting */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-5">
        <div className="bg-white rounded-2xl border border-gray-100 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="font-semibold text-gray-900">
              Compare your options
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Dish first • Restaurant offers below
            </p>
          </div>

          <div className="flex items-center gap-2">
            <label
              htmlFor="sort"
              className="text-sm text-gray-500"
            >
              Sort:
            </label>

            <select
              id="sort"
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value)
              }
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-200"
            >
              <option value="recommended">
                Recommended
              </option>

              <option value="price-low">
                Price: Low to High
              </option>

              <option value="price-high">
                Price: High to Low
              </option>

              <option value="rating">
                Rating
              </option>

              <option value="delivery">
                Delivery Time
              </option>

              <option value="offer">
                Best Offer
              </option>
            </select>
          </div>
        </div>
      </section>

      {/* Dish Groups */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-12">
        <div className="space-y-7">
          {sortedGroups.map((group) => (
            <div
              key={group.dishName}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
            >
              {/* Dish heading */}
              <div className="p-4 sm:p-6 border-b border-gray-100">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <p className="text-orange-500 text-xs font-bold uppercase tracking-wide">
                      {decodedCategory}
                    </p>

                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">
                      {group.dishName}
                    </h2>
                  </div>

                  <div className="text-sm text-gray-500">
                    {group.restaurants.length}{" "}
                    restaurant
                    {group.restaurants.length !== 1
                      ? "s"
                      : ""}{" "}
                    serving this dish
                  </div>
                </div>
              </div>

              {/* Restaurant comparison */}
              <div className="divide-y divide-gray-100">
                {group.restaurants.map(
                  (item, index) => (
                    <div
                      key={item.id}
                      className="p-4 sm:p-6 hover:bg-gray-50 transition"
                    >
                      <div className="flex flex-col lg:flex-row gap-4 lg:items-center">
                        {/* Dish image */}
                        <div className="w-full sm:w-28 lg:w-32 h-44 sm:h-28 lg:h-32 rounded-xl overflow-hidden shrink-0">
                          <img
                            src={item.image}
                            alt={item.dish}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Main details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            {index === 0 && (
                              <span className="bg-orange-100 text-orange-600 text-xs font-bold px-2 py-1 rounded-full">
                                Popular Choice
                              </span>
                            )}

                            <span className="bg-green-50 text-green-600 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                              <Tag size={12} />
                              {item.offer}
                            </span>
                          </div>

                          <h3 className="text-lg font-bold text-gray-900 mt-2">
                            {item.restaurant}
                          </h3>

                          <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Star
                                size={15}
                                className="fill-current text-yellow-500"
                              />
                              <span className="text-gray-700 font-medium">
                                {item.rating}
                              </span>
                            </span>

                            <span className="flex items-center gap-1">
                              <Clock3 size={15} />
                              {item.deliveryTime}
                            </span>
                          </div>

                          <p className="text-xs text-gray-400 mt-2">
                            Available for delivery
                          </p>
                        </div>

                        {/* Price */}
                        <div className="lg:text-right">
                          <div className="flex lg:flex-col items-center lg:items-end gap-2">
                            <span className="text-gray-400 line-through text-sm">
                              ₹{item.originalPrice}
                            </span>

                            <span className="text-xl sm:text-2xl font-bold text-gray-900">
                              ₹{item.price}
                            </span>
                          </div>

                          <p className="text-green-600 font-semibold text-sm mt-1">
                            Save ₹
                            {item.originalPrice -
                              item.price}
                          </p>
                        </div>

                        {/* Add button */}
                        <button
                          type="button"
                          onClick={() =>
                            addToCart(item)
                          }
                          className="w-full lg:w-auto bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition"
                        >
                          <Plus size={18} />
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}