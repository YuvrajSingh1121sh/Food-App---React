import { useNavigate } from "react-router-dom";

import pizza from "../assets/images/categories/pizza.jpg";
import burger from "../assets/images/categories/burger.jpg";
import pasta from "../assets/images/dishes/pasta.jpg";
import sushi from "../assets/images/categories/sushi.jpg";
import dessert from "../assets/images/categories/desert.jpg";
import drinks from "../assets/images/categories/drinks.jpg";
import coffee from "../assets/images/categories/coffee.jpg";
import momos from "../assets/images/categories/momos.jpg";
import icecream from "../assets/images/categories/icecream.jpg";

export default function Categories() {
  const navigate = useNavigate();

  const categories = [
    {
      id: 1,
      name: "Pizza",
      image: pizza,
    },
    {
      id: 2,
      name: "Burger",
      image: burger,
    },
    {
      id: 3,
      name: "Pasta",
      image: pasta,
    },
    {
      id: 4,
      name: "Sushi",
      image: sushi,
    },
    {
      id: 5,
      name: "Desserts",
      image: dessert,
    },
    {
      id: 6,
      name: "Coffee",
      image: coffee,
    },
    {
      id: 7,
      name: "Momos",
      image: momos,
    },
    {
      id: 8,
      name: "Drinks",
      image: drinks,
    },
    {
      id: 9,
      name: "Icecream",
      image: icecream,
    },
  ];

  const handleCategoryClick = (category) => {
    const isLoggedIn =
      localStorage.getItem("foodiehub-logged-in") === "true";

    if (!isLoggedIn) {
      sessionStorage.setItem(
        "foodiehub-redirect-after-login",
        `/category/${category}`
      );

      navigate("/login");
      return;
    }

    navigate(`/category/${category}`);
  };

  return (
    <section
      id="categories"
      className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14"
    >
      {/* Heading */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-7">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Categories
          </h2>

          <p className="text-gray-500 mt-1 text-sm sm:text-base">
            Find your favourite dish from different restaurants
          </p>
        </div>
      </div>

      {/* Category Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
        {categories.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => handleCategoryClick(item.name)}
            className="w-full h-48 sm:h-52 bg-white rounded-2xl border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-4 flex flex-col items-center justify-center group"
          >
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>

            <h3 className="mt-4 font-semibold text-gray-800 text-base sm:text-lg">
              {item.name}
            </h3>

            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              View dishes
            </p>
          </button>
        ))}
      </div>
    </section>
  );
}