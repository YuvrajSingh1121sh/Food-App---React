import React from "react";

import hamburger from "../assets/images/categories/Hamburger.jpg";
import burger from "../assets/images/categories/burger.jpg";
import pizza from "../assets/images/categories/pizza.jpg";
import sushi from "../assets/images/categories/sushi.jpg";
import momos from "../assets/images/categories/momos.jpg";
import icecream from "../assets/images/categories/icecream.jpg";
import coffee from "../assets/images/categories/coffee.jpg";
import drinks from "../assets/images/categories/drinks.jpg";
import desert from "../assets/images/categories/desert.jpg";
import coffee2 from "../assets/images/categories/coffee2.jpg";

const categories = [
  { name: "Hamburger", image: hamburger },
  { name: "Burger", image: burger },
  { name: "Pizza", image: pizza },
  { name: "Sushi", image: sushi },
  { name: "Momos", image: momos },
  { name: "Ice Cream", image: icecream },
  { name: "Coffee", image: coffee },
  { name: "Drinks", image: drinks },
  { name: "Dessert", image: desert },
  { name: "Coffee 2", image: coffee2 },
];

export default function Categories() {
  return (
    <section className="w-full py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="flex items-end justify-between mb-6 sm:mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
              Explore Categories
            </h2>

            <p className="text-gray-500 mt-1 text-sm sm:text-base">
              Find your favorite food
            </p>
          </div>

          <button className="hidden sm:flex items-center gap-1 text-orange-500 font-medium hover:text-orange-600 transition">
            View All
            <span className="text-lg">›</span>
          </button>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">

          {categories.map((category) => (
            <button
              key={category.name}
              className="
                group
                w-full
                h-48 sm:h-52
                bg-white
                border border-gray-100
                rounded-2xl
                shadow-sm
                hover:shadow-md
                hover:-translate-y-1
                transition-all duration-300
                flex flex-col
                items-center
                justify-center
                p-4
              "
            >

              {/* Fixed circular image */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden shrink-0">
                <img
                  src={category.image}
                  alt={category.name}
                  className="
                    !w-full
                    !h-full
                    object-cover
                    block
                    transition-transform
                    duration-300
                    group-hover:scale-110
                  "
                />
              </div>

              {/* Category name */}
              <h3 className="mt-5 text-base sm:text-lg font-bold text-gray-900 text-center">
                {category.name}
              </h3>
            </button>
          ))}

        </div>

        {/* Mobile View All */}
        <button className="sm:hidden flex items-center gap-1 text-orange-500 font-medium mt-5 mx-auto">
          View All
          <span className="text-lg">›</span>
        </button>

      </div>
    </section>
  );
}