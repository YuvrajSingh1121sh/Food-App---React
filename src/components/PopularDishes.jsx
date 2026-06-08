export default function PopularDishes() {
  const dishes = [
    "Cheese Burger",
    "Pepperoni Pizza",
    "Chicken Biryani",
    "Pasta Alfredo",
  ];

  return (
    <section className="max-w-7xl mx-auto p-8">
      <h2 className="text-3xl font-bold mb-6">
        Popular Dishes
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dishes.map((dish) => (
          <div
            key={dish}
            className="shadow rounded-xl p-4 text-center"
          >
            <h3 className="font-semibold">{dish}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}