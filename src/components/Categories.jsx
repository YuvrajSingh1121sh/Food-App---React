import {
  Pizza,
  Beef,
  Coffee,
  IceCream
} from "lucide-react";

export default function Categories() {
  
  const categories = [
    {
      id: 1,
      name: "Pizza",
      icon: Pizza,
    },
    {
      id: 2,
      name: "Burger",
      icon: Beef,
    },
    {
      id: 3,
      name: "Coffee",
      icon: Coffee,
    },
    {
      id: 4,
      name: "Desserts",
      icon: IceCream,
    },
  ];

  return (
    <section className="max-w-7xl mx-auto p-8">
      <h2 className="text-3xl font-bold mb-8">
        Categories
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {categories.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              className="border rounded-xl p-8 text-center hover:shadow-lg"
            >
              <Icon size={40} className="mx-auto mb-3" />
              <h3>{item.name}</h3>
            </div>
          );
        })}
      </div>
    </section>
  );
}