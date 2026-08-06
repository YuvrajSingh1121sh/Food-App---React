import {
  Star,
  Clock,
  Heart
} from "lucide-react";

export default function RestaurantCard({ restaurant }) {
  return (
    <div className="bg-white rounded-2xl border hover:shadow-xl transition duration-300 overflow-hidden cursor-pointer">

      {/* Image */}

      <div className="relative">

        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-52 object-cover"
        />

        <span className="absolute top-3 left-3 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
          {restaurant.offer}
        </span>

        <button className="absolute top-3 right-3 bg-white rounded-full p-2 shadow">
          <Heart size={18}/>
        </button>

      </div>

      {/* Details */}

      <div className="p-5">

        <h3 className="text-xl font-semibold">
          {restaurant.name}
        </h3>

        <div className="flex items-center gap-4 mt-3 text-gray-600">

          <span className="flex items-center gap-1">

            <Star
              size={16}
              fill="orange"
              color="orange"
            />

            {restaurant.rating}

          </span>

          <span className="flex items-center gap-1">

            <Clock size={16}/>

            {restaurant.time}

          </span>

        </div>

        <p className="mt-3 text-xl font-bold">
          {restaurant.price}
        </p>

      </div>

    </div>
  );
}