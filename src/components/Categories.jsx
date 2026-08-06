import pizza from "../assets/images/categories/pizza.jpg";
import burger from "../assets/images/categories/burger.jpg";
import sushi from "../assets/images/categories/sushi.jpg";
import dessert from "../assets/images/categories/desert.jpg";
import drinks from "../assets/images/categories/drinks.jpg";
import coffee from "../assets/images/categories/coffee.jpg";
import momos from "../assets/images/categories/momos.jpg";
import hamburger from "../assets/images/categories/Hamburger.jpg";

export default function Categories() {
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
      name: "Sushi",
      image: sushi,
    },
    {
      id: 4,
      name: "Desserts",
      image: dessert,
    },
    {
      id: 5,
      name: "Drinks",
      image: drinks,
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
      name: "More",
      image: hamburger,
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      {/* Heading */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">
          Categories
        </h2>

        <button className="text-orange-500 font-semibold hover:underline">
          View All →
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-5">
        {categories.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border hover:shadow-xl transition duration-300 cursor-pointer p-5 flex flex-col items-center"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 rounded-full object-cover"
            />

            <h3 className="mt-4 font-semibold">
              {item.name}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}