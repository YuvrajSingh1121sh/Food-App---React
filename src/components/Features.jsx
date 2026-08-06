export default function Features() {
  const features = [
    "Fast Delivery",
    "Fresh Food",
    "Best Offers",
    "24/7 Support",
  ];

  return (
    <section className="max-w-full mx-auto p-8">
      <h2 className="text-3xl font-bold mb-6">
        Why Choose Us
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature) => (
          <div
            key={feature}
            className="shadow rounded-xl p-6 text-center"
          >
            <h3 className="font-semibold">
              {feature}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}