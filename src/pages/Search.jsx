import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import {
  ArrowLeft,
  Clock3,
  Plus,
  Search as SearchIcon,
  Star,
  Tag,
  Utensils,
} from "lucide-react";

import { foodData } from "../data/foodData";

export default function Search() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const initialQuery = searchParams.get("q") || "";

  const [searchText, setSearchText] =
    useState(initialQuery);

  const [sortBy, setSortBy] =
    useState("recommended");

  /*
    Convert all category data into one array.

    Example:

    Pizza → Margherita Pizza → Pizza Palace
    Pizza → Margherita Pizza → Burger House
    Burger → Classic Burger → Burger House
  */

  const allFoods = useMemo(() => {
    return Object.entries(foodData).flatMap(
      ([category, dishes]) =>
        dishes.map((dish) => ({
          ...dish,
          category,
        }))
    );
  }, []);

  /*
    Search by:

    - dish name
    - restaurant name
    - category
  */

  const filteredFoods = useMemo(() => {
    const query = searchText
      .trim()
      .toLowerCase();

    if (!query) {
      return [];
    }

    return allFoods.filter((item) => {
      return (
        item.dish
          .toLowerCase()
          .includes(query) ||
        item.restaurant
          .toLowerCase()
          .includes(query) ||
        item.category
          .toLowerCase()
          .includes(query)
      );
    });
  }, [allFoods, searchText]);

  /*
    Group the search results by dish.

    This is important because the user wants
    to compare the SAME dish across restaurants.
  */

  const groupedResults = useMemo(() => {
    const groups = {};

    filteredFoods.forEach((item) => {
      if (!groups[item.dish]) {
        groups[item.dish] = [];
      }

      groups[item.dish].push(item);
    });

    const result = Object.entries(groups).map(
      ([dishName, restaurants]) => ({
        dishName,
        restaurants: [...restaurants],
      })
    );

    /*
      Sort restaurants inside each dish.
    */

    result.forEach((group) => {
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
          const aTime = parseInt(
            a.deliveryTime
          );

          const bTime = parseInt(
            b.deliveryTime
          );

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

    return result;
  }, [filteredFoods, sortBy]);

  /*
    Add selected restaurant + dish to cart.
  */

  const addToCart = (item) => {
    const existingCart = JSON.parse(
      localStorage.getItem(
        "foodiehub-cart"
      ) || "[]"
    );

    const existingItem = existingCart.find(
      (cartItem) =>
        cartItem.id === item.id
    );

    let updatedCart;

    if (existingItem) {
      updatedCart = existingCart.map(
        (cartItem) =>
          cartItem.id === item.id
            ? {
                ...cartItem,
                quantity:
                  (cartItem.quantity || 1) +
                  1,
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

    const totalQuantity =
      updatedCart.reduce(
        (total, cartItem) =>
          total +
          (cartItem.quantity || 1),
        0
      );

    localStorage.setItem(
      "foodiehub-cart-count",
      totalQuantity.toString()
    );

    window.dispatchEvent(
      new Event("cartUpdated")
    );

    /*
      After adding food,
      directly go to Cart.
    */

    navigate("/cart");
  };

  const handleSearch = (e) => {
    e.preventDefault();

    const query = searchText.trim();

    if (!query) {
      return;
    }

    navigate(
      `/search?q=${encodeURIComponent(
        query
      )}`
    );
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-gray-600 hover:text-orange-500 font-medium mb-5"
          >
            <ArrowLeft size={18} />
            Back to Home
          </button>

          <div>
            <h1 className="text-2xl sm:text-4xl font-bold text-gray-900">
              Search Food
            </h1>

            <p className="text-gray-500 mt-2">
              Find a dish and compare it across
              different restaurants.
            </p>
          </div>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="mt-6 flex flex-col sm:flex-row gap-3 max-w-3xl"
          >
            <div className="relative flex-1">
              <SearchIcon
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={searchText}
                onChange={(e) =>
                  setSearchText(
                    e.target.value
                  )
                }
                placeholder="Search pizza, burger, sushi..."
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 bg-white outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400"
              />
            </div>

            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white px-7 py-3.5 rounded-xl font-semibold transition"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      {/* Search Results */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {searchText.trim() && (
          <div className="bg-white border border-gray-100 rounded-2xl p-4 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="font-semibold text-gray-900">
                Results for "{searchText}"
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                {filteredFoods.length} restaurant
                option
                {filteredFoods.length !== 1
                  ? "s"
                  : ""}{" "}
                found
              </p>
            </div>

            {filteredFoods.length > 0 && (
              <div className="flex items-center gap-2">
                <label
                  htmlFor="search-sort"
                  className="text-sm text-gray-500"
                >
                  Sort:
                </label>

                <select
                  id="search-sort"
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(
                      e.target.value
                    )
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
            )}
          </div>
        )}

        {/* Empty Search */}
        {!searchText.trim() && (
          <div className="min-h-[45vh] flex items-center justify-center">
            <div className="text-center max-w-md">
              <div className="w-20 h-20 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center mx-auto">
                <SearchIcon size={36} />
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mt-5">
                What are you craving?
              </h2>

              <p className="text-gray-500 mt-2">
                Search for pizza, burger, pasta,
                sushi or any other dish.
              </p>
            </div>
          </div>
        )}

        {/* No Results */}
        {searchText.trim() &&
          filteredFoods.length === 0 && (
            <div className="min-h-[40vh] flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto">
                  <Utensils size={36} />
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mt-5">
                  No food found
                </h2>

                <p className="text-gray-500 mt-2">
                  Try searching for Pizza, Burger,
                  Pasta, Sushi or Cake.
                </p>

                <button
                  onClick={() => {
                    setSearchText("");
                    navigate("/search");
                  }}
                  className="mt-5 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold"
                >
                  Clear Search
                </button>
              </div>
            </div>
          )}

        {/* Grouped Results */}
        {groupedResults.length > 0 && (
          <div className="space-y-7">
            {groupedResults.map((group) => (
              <div
                key={group.dishName}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
              >
                {/* Dish Header */}
                <div className="p-4 sm:p-6 border-b border-gray-100">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <p className="text-orange-500 text-xs font-bold uppercase tracking-wide">
                        DISH
                      </p>

                      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">
                        {group.dishName}
                      </h2>
                    </div>

                    <div className="text-sm text-gray-500">
                      {
                        group.restaurants
                          .length
                      }{" "}
                      restaurant
                      {group.restaurants.length !==
                      1
                        ? "s"
                        : ""}{" "}
                      serving this dish
                    </div>
                  </div>
                </div>

                {/* Restaurants */}
                <div className="divide-y divide-gray-100">
                  {group.restaurants.map(
                    (item, index) => (
                      <div
                        key={item.id}
                        className="p-4 sm:p-6 hover:bg-gray-50 transition"
                      >
                        <div className="flex flex-col lg:flex-row gap-4 lg:items-center">
                          {/* Image */}
                          <div className="w-full sm:w-28 lg:w-32 h-44 sm:h-28 lg:h-32 rounded-xl overflow-hidden shrink-0">
                            <img
                              src={item.image}
                              alt={item.dish}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          {/* Restaurant Details */}
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              {index === 0 && (
                                <span className="bg-orange-100 text-orange-600 text-xs font-bold px-2 py-1 rounded-full">
                                  Popular Choice
                                </span>
                              )}

                              <span className="bg-green-50 text-green-600 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                                <Tag
                                  size={12}
                                />
                                {
                                  item.offer
                                }
                              </span>
                            </div>

                            <h3 className="text-lg font-bold text-gray-900 mt-2">
                              {
                                item.restaurant
                              }
                            </h3>

                            <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-500">
                              <span className="flex items-center gap-1">
                                <Star
                                  size={15}
                                  className="fill-current text-yellow-500"
                                />

                                <span className="text-gray-700 font-medium">
                                  {
                                    item.rating
                                  }
                                </span>
                              </span>

                              <span className="flex items-center gap-1">
                                <Clock3
                                  size={15}
                                />
                                {
                                  item.deliveryTime
                                }
                              </span>
                            </div>
                          </div>

                          {/* Price */}
                          <div className="lg:text-right">
                            <div className="flex lg:flex-col items-center lg:items-end gap-2">
                              <span className="text-gray-400 line-through text-sm">
                                ₹
                                {
                                  item.originalPrice
                                }
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

                          {/* Add */}
                          <button
                            type="button"
                            onClick={() =>
                              addToCart(
                                item
                              )
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
        )}
      </section>
    </main>
  );
}