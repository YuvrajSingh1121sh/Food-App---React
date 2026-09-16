import React from "react";
import { Star, Clock, Heart } from "lucide-react";

export default function RestaurantCard({
  name,
  image,
  rating,
  time,
  price,
  offer,
}) {
  return (
    <div
      className="
        group
        bg-white
        rounded-2xl
        overflow-hidden
        border border-gray-100
        shadow-sm
        hover:shadow-lg
        transition-all duration-300
        h-full
        flex
        flex-col
      "
    >

      {/* Image */}
      <div className="relative w-full aspect-[4/3] overflow-hidden">

        <img
          src={image}
          alt={name}
          className="
            absolute
            inset-0
            w-full
            h-full
            object-cover
            transition-transform
            duration-500
            group-hover:scale-105
          "
        />

        {/* Offer */}
        {offer && (
          <span
            className="
              absolute
              top-3
              left-3
              bg-green-100
              text-green-700
              px-3
              py-1
              rounded-full
              text-xs
              sm:text-sm
              font-bold
            "
          >
            {offer}
          </span>
        )}

        {/* Favorite */}
        <button
          className="
            absolute
            top-3
            right-3
            w-10
            h-10
            rounded-full
            bg-white
            flex
            items-center
            justify-center
            shadow-md
            hover:bg-orange-50
            transition
          "
        >
          <Heart
            size={20}
            className="text-gray-700 hover:text-orange-500"
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-1">

        {/* Restaurant Name */}
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 truncate">
          {name}
        </h3>

        {/* Rating + Time */}
        <div className="flex items-center gap-4 mt-3 text-sm">

          <div className="flex items-center gap-1">
            <Star
              size={16}
              className="fill-yellow-400 text-yellow-400"
            />
            <span className="text-gray-700">
              {rating}
            </span>
          </div>

          <div className="flex items-center gap-1 text-gray-600">
            <Clock size={16} />
            <span>{time}</span>
          </div>

        </div>

        {/* Price */}
        <p className="text-lg font-bold text-gray-900 mt-4">
          ₹{price} for two
        </p>

      </div>
    </div>
  );
}