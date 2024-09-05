import Banner from "@/components/banner/Banner";
import Categories from "@/components/categories/Categories";
import Features from "@/components/features/Features";
import Footer from "@/components/footer/Footer";
import NewArrival from "@/components/newArrival/NewArrival";
import TrendingProducts from "@/components/trendingProducts/TrendingProducts";
import Image from "next/image";

export default function Home() {
  return (
   <>
   <main>
  
   

   
   <Banner/>
   

   
   <Features/>
   

  
              <Categories />
              <NewArrival/>
   
    <div className="container pb-16">
        <a href="#">
            <Image src="assets/images/offer.jpg" alt="ads" className="w-full"/>
        </a>
    </div>
    
    
    <TrendingProducts/>

  
  <Footer/>
   

    <div className="bg-gray-800 py-4">
        <div className="container flex items-center justify-between">
            <p className="text-white">&copy; TailCommerce - All Right Reserved</p>
            <div>
                <Image src="assets/images/methods.png" alt="methods" className="h-5"/>
            </div>
        </div>
    </div>
   

   </main>
   </>
}
