// import heroImage from "../assets/images/hero-burger.png";

export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto p-8">

      <div className="grid md:grid-cols-2 gap-10 items-center bg-orange-50 rounded-3xl p-10">

        <div>

          <span className="bg-orange-100 px-4 py-2 rounded-full text-orange-500">
            FAST DELIVERY
          </span>

          <h1 className="text-6xl font-bold mt-6">
            Delicious food,
            <span className="text-orange-500 block">
              delivered to you
            </span>
          </h1>

          <p className="mt-5 text-gray-500">
            Order food from your favorite restaurants.
          </p>

          <div className="flex mt-8">

            <input
              type="text"
              placeholder="Enter address"
              className="border p-4 flex-1 rounded-l-xl"
            />

            <button className="bg-orange-500 text-white px-8 rounded-r-xl">
              Find Food
            </button>

          </div>

        </div>

        {/* <img
          src={heroImage}
          alt=""
          className="w-full"
        /> */}

      </div>

    </section>
  );
}