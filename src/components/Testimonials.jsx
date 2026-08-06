export default function Testimonials() {
  const reviews = [
    {
      name: "Rahul",
      review: "Amazing food and quick delivery.",
    },
    {
      name: "Priya",
      review: "Best food app I have used.",
    },
    {
      name: "Amit",
      review: "Great offers and tasty meals.",
    },
  ];

  return (
    <section className="max-w-full mx-auto p-8">
      <h2 className="text-3xl font-bold mb-6">
        Testimonials
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {reviews.map((item) => (
          <div
            key={item.name}
            className="shadow rounded-xl p-6"
          >
            <p>"{item.review}"</p>

            <h4 className="mt-4 font-bold">
              {item.name}
            </h4>
          </div>
        ))}
      </div>
    </section>
  );
}