import RestaurantCard from "./RestaurantCard";

export default function Restaurants() {
  const restaurants = [
    "Burger House",
    "Pizza Palace",
    "Sushi Master",
    "Sweet Corner",
  ];

  return (
    <section className="max-w-7xl mx-auto p-8">
      <h2 className="text-3xl font-bold mb-6">
        Popular Restaurants
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {restaurants.map((restaurant) => (
          <RestaurantCard
            key={restaurant}
            name={restaurant}
          />
        ))}
      </div>
    </section>
  );
}