import { Star } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Yuvraj Singh",
      role: "Food Lover",
      review:
        "Amazing food and very fast delivery. The whole experience was smooth and easy.",
      rating: 5,
    },
    {
      id: 2,
      name: "Sheetal Singh",
      role: "Regular Customer",
      review:
        "I love the variety of restaurants available. The food always arrives fresh and hot.",
      rating: 5,
    },
    {
      id: 3,
      name: "Manisha Singh",
      role: "Happy Customer",
      review:
        "Great offers, easy ordering and quick delivery. Definitely one of my favorite food apps.",
      rating: 4,
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Heading */}
      <div className="text-center mb-8 sm:mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
          What Our Customers Say
        </h2>

        <p className="text-sm sm:text-base text-gray-500 mt-2">
          Thousands of happy customers trust FoodieHub
        </p>
      </div>

      {/* Testimonials */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-white border border-gray-100 rounded-2xl p-5 sm:p-6 hover:shadow-lg transition-all duration-300"
          >
            {/* Stars */}
            <div className="flex items-center gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  size={17}
                  fill={index < testimonial.rating ? "orange" : "none"}
                  color="orange"
                />
              ))}
            </div>

            {/* Review */}
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              "{testimonial.review}"
            </p>

            {/* Customer */}
            <div className="flex items-center gap-3 mt-5">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold">
                {testimonial.name.charAt(0)}
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                  {testimonial.name}
                </h3>

                <p className="text-xs sm:text-sm text-gray-500">
                  {testimonial.role}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}