export default function OfferBanner() {
  return (
    <section className="max-w-7xl mx-auto p-8">
      <div className="bg-orange-500 text-white rounded-3xl p-10 text-center">
        <h2 className="text-4xl font-bold">
          Get 50% OFF
        </h2>

        <p className="mt-4">
          On your first order above ₹499
        </p>

        <button className="mt-6 bg-white text-orange-500 px-6 py-3 rounded-full font-semibold">
          Order Now
        </button>
      </div>
    </section>
  );
}