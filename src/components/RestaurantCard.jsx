import {
  Star,
  Clock,
  Heart,
} from "lucide-react";

export default function RestaurantCard({ restaurant }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group">

      {/* Image */}
      <div className="relative overflow-hidden">

        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-48 sm:h-52 object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Offer */}
        <span className="absolute top-3 left-3 bg-green-100 text-green-700 px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
          {restaurant.offer}
        </span>

        {/* Heart */}
        <button
          type="button"
          aria-label={`Add ${restaurant.name} to favorites`}
          className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:bg-orange-50 hover:text-orange-500 transition"
        >
          <Heart size={18} />
        </button>

      </div>

      {/* Details */}
      <div className="p-4 sm:p-5">

        {/* Restaurant Name */}
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 truncate">
          {restaurant.name}
        </h3>

        {/* Rating + Time */}
        <div className="flex items-center gap-3 sm:gap-4 mt-3 text-gray-600 text-sm">

          <span className="flex items-center gap-1">
            <Star
              size={16}
              fill="orange"
              color="orange"
            />

            <span>{restaurant.rating}</span>
          </span>

          <span className="flex items-center gap-1">
            <Clock size={16} />

            <span>{restaurant.time}</span>
          </span>

        </div>

        {/* Price */}
        <p className="mt-3 text-lg sm:text-xl font-bold text-gray-900">
          {restaurant.price}
        </p>

      </div>

    </div>
  );
}