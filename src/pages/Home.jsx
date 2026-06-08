import Hero from "../components/Hero";
import Categories from "../components/Categories";
import Restaurants from "../components/Restaurants";
import PopularDishes from "../components/PopularDishes";
import OfferBanner from "../components/OfferBanner";
import Testimonials from "../components/Testimonials";
import Features from "../components/Features";

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <Restaurants />
      <PopularDishes />
      <OfferBanner />
      <Testimonials />
      <Features />
    </>
  );
}