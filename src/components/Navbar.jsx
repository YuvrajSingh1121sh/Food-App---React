import {
  Search,
  ShoppingCart,
  User,
  MapPin
} from "lucide-react";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm">

      <div className="max-w-7xl mx-auto px-5 py-4 flex justify-between items-center">

        <h1 className="text-3xl font-bold text-orange-500">
          FoodieHub
        </h1>

        <ul className="hidden md:flex gap-8">
          <li>Home</li>
          <li>Restaurants</li>
          <li>Offers</li>
          <li>Categories</li>
          <li>Orders</li>
        </ul>

        <div className="flex items-center gap-5">

          <MapPin />

          <Search />

          <ShoppingCart />

          <User />

        </div>

      </div>

    </nav>
  );
}