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
      price: "₹299",
    },
    {
      id: 2,
      name: "Classic Beef Burger",
      image: burger,
      price: "₹199",
    },
    {
      id: 3,
      name: "Chicken Alfredo Pasta",
      image: pasta,
      price: "₹349",
    },
    {
      id: 4,
      name: "Sushi Platter",
      image: sushi,
      price: "₹599",
    },
    {
      id: 5,
      name: "Chocolate Lava Cake",
      image: cake,
      price: "₹149",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Popular Dishes</h2>

        <button className="text-orange-500 font-semibold">
          View All →
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-5">
        {dishes.map((dish) => (
          <div
            key={dish.id}
            className="bg-white rounded-2xl border p-4 flex items-center gap-4 hover:shadow-lg transition"
          >
            <img
              src={dish.image}
              alt={dish.name}
              className="w-20 h-20 rounded-full object-cover"
            />

            <div className="flex-1">
              <h3 className="font-semibold text-sm">{dish.name}</h3>

              <p className="text-orange-500 font-bold mt-2">
                {dish.price}
              </p>
            </div>

            <button className="w-10 h-10 rounded-full border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition">
              <Plus size={20} />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}