import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

import hamburger from "../assets/images/categories/Hamburger.jpg";
import burger from "../assets/images/categories/burger.jpg";
import coffee from "../assets/images/categories/coffee.jpg";
import coffee2 from "../assets/images/categories/coffee2.jpg";
import desert from "../assets/images/categories/desert.jpg";
import drinks from "../assets/images/categories/drinks.jpg";
import icecream from "../assets/images/categories/icecream.jpg";
import momos from "../assets/images/categories/momos.jpg";
import pizza from "../assets/images/categories/pizza.jpg";
import sushi from "../assets/images/categories/sushi.jpg";

export default function Categories() {
  const categories = [
    {
      name: "Hamburger",
      image: hamburger,
    },
    {
      name: "Burger",
      image: burger,
    },
    {
      name: "Pizza",
      image: pizza,
    },
    {
      name: "Sushi",
      image: sushi,
    },
    {
      name: "Momos",
      image: momos,
    },
    {
      name: "Ice Cream",
      image: icecream,
    },
    {
      name: "Coffee",
      image: coffee,
    },
    {
      name: "Drinks",
      image: drinks,
    },
    {
      name: "Dessert",
      image: desert,
    },
    {
      name: "Coffee 2",
      image: coffee2,
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      
      {/* Heading */}
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Explore Categories
          </h2>

          <p className="text-gray-500 text-sm sm:text-base mt-1">
            Find your favorite food
          </p>
        </div>

        <Link
          to="/categories"
          className="flex items-center gap-1 text-orange-500 font-medium text-sm sm:text-base hover:text-orange-600 transition"
        >
          View All
          <ChevronRight size={18} />
        </Link>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
        {categories.map((category) => (
          <Link
            to="/categories"
            key={category.name}
            className="group bg-white border border-gray-100 rounded-2xl p-4 sm:p-5 text-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
          >
            {/* Category Image */}
            <div className="flex justify-center">
              <img
                src={category.image}
                alt={category.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Category Name */}
            <h3 className="mt-3 font-semibold text-gray-800 text-sm sm:text-base">
              {category.name}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
}