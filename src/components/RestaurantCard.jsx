export default function RestaurantCard({ name }) {
  return (
    <div className="shadow rounded-xl p-4">
      <h3 className="font-semibold text-lg">
        {name}
      </h3>
    </div>
  );
}