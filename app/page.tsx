import Banner from "@/components/banner/Banner";
import Categories from "@/components/categories/Categories";
import Features from "@/components/features/Features";
import Footer from "@/components/footer/Footer";
import NewArrival from "@/components/newArrival/NewArrival";
import TrendingProducts from "@/components/trendingProducts/TrendingProducts";
import { dbConnect } from "@/services/mongo";
import Image from "next/image";
import method from "../public/images/methods.png";
import offer from "../public/images/offer.jpg";

export default async function Home() {
  await dbConnect();
  return (
    <>
      <main>
        <Banner />

        <Features />

        <Categories />
        <NewArrival />

        <div className="container pb-16">
          <a href="#">
            <Image
              src={offer}
              alt="ads"
              className="w-full"
              style={{ width: "100%" }}
            />
          </a>
        </div>

        <TrendingProducts />

        <Footer />

        <div className="bg-gray-800 py-4">
          <div className="container flex items-center justify-between">
            <p className="text-white">
              &copy; TailCommerce - All Right Reserved
            </p>
            <div>
              <Image src={method} alt="methods" width={200} className="h-5" />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
