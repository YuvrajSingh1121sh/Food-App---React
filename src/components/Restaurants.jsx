import React from "react";

import RestaurantCard from "./RestaurantCard";

import burger from "../assets/images/restaurants/burger.jpg";
import pizza from "../assets/images/restaurants/pizza.jpg";
import sushi from "../assets/images/restaurants/sushi.jpg";
import cake from "../assets/images/restaurants/cake.jpg";

const restaurants = [
  {
    name: "Burger House",
    image: burger,
    rating: "4.6",
    time: "25-30 min",
    price: "299",
    offer: "50% OFF",
  },
  {
    name: "Pizza Palace",
    image: pizza,
    rating: "4.5",
    time: "20-25 min",
    price: "399",
    offer: "40% OFF",
  },
  {
    name: "Sushi Master",
    image: sushi,
    rating: "4.7",
    time: "30-40 min",
    price: "599",
    offer: "30% OFF",
  },
  {
    name: "Sweet Corner",
    image: cake,
    rating: "4.4",
    time: "20-30 min",
    price: "249",
    offer: "20% OFF",
  },
];

export default function Restaurants() {
  return (
    <section className="w-full py-8 sm:py-10">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="flex items-end justify-between mb-6 sm:mb-8">

          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
              Popular Restaurants
            </h2>

            <p className="text-gray-500 mt-1">
              Discover the best food around you
            </p>
          </div>

          <button className="hidden sm:flex items-center gap-1 text-orange-500 font-medium">
            View All
            <span className="text-lg">›</span>
          </button>

        </div>

        {/* Restaurant Grid */}
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
            gap-5
            lg:gap-6
            items-stretch
          "
        >
          {restaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.name}
              {...restaurant}
            />
          ))}
        </div>

      </div>

    </section>
  );
}