import RestaurantCard from "./RestaurantCard";

import burger from "../assets/images/restaurants/burger.jpg";
import pizza from "../assets/images/restaurants/pizza.jpg";
import sushi from "../assets/images/restaurants/sushi.jpg";
import cake from "../assets/images/restaurants/cake.jpg";

export default function Restaurants() {

  const restaurants = [

    {
      id:1,
      name:"Burger House",
      image:burger,
      rating:"4.6",
      time:"25-30 min",
      price:"₹299 for two",
      offer:"50% OFF"
    },

    {
      id:2,
      name:"Pizza Palace",
      image:pizza,
      rating:"4.5",
      time:"20-25 min",
      price:"₹399 for two",
      offer:"40% OFF"
    },

    {
      id:3,
      name:"Sushi Master",
      image:sushi,
      rating:"4.7",
      time:"30-40 min",
      price:"₹599 for two",
      offer:"30% OFF"
    },

    {
      id:4,
      name:"Sweet Corner",
      image:cake,
      rating:"4.4",
      time:"20-30 min",
      price:"₹249 for two",
      offer:"20% OFF"
    }

  ];

  return (

    <section className="max-w-7xl mx-auto px-6 py-12">

      <div className="flex justify-between items-center mb-8">

        <h2 className="text-3xl font-bold">
          Popular Restaurants
        </h2>

        <button className="text-orange-500 font-semibold">
          View All →
        </button>

      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

        {restaurants.map((restaurant)=>(
          <RestaurantCard
            key={restaurant.id}
            restaurant={restaurant}
          />
        ))}

      </div>

    </section>

  );

}