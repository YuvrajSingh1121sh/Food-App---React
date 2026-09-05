import {
  Bike,
  ShieldCheck,
  Clock,
  Headphones,
} from "lucide-react";

export default function Features() {
  const features = [
    {
      id: 1,
      icon: Bike,
      title: "Fast Delivery",
      description: "Get your favorite food delivered quickly to your doorstep.",
    },
    {
      id: 2,
      icon: ShieldCheck,
      title: "Safe & Secure",
      description: "Your orders and payments are completely safe and secure.",
    },
    {
      id: 3,
      icon: Clock,
      title: "On-Time Delivery",
      description: "We make sure your food reaches you right on time.",
    },
    {
      id: 4,
      icon: Headphones,
      title: "24/7 Support",
      description: "Our support team is always here whenever you need help.",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Heading */}
      <div className="text-center mb-8 sm:mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Why Choose FoodieHub?
        </h2>

        <p className="text-sm sm:text-base text-gray-500 mt-2">
          Everything you need for a great food delivery experience
        </p>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <div
              key={feature.id}
              className="bg-white border border-gray-100 rounded-2xl p-5 sm:p-6 text-center hover:shadow-lg transition-all duration-300 group"
            >
              {/* Icon */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto rounded-full bg-orange-100 flex items-center justify-center group-hover:bg-orange-500 transition-colors duration-300">
                <Icon
                  size={26}
                  className="text-orange-500 group-hover:text-white transition-colors duration-300"
                />
              </div>

              {/* Title */}
              <h3 className="mt-4 text-lg sm:text-xl font-semibold text-gray-900">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="mt-2 text-sm sm:text-base text-gray-500 leading-relaxed">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}