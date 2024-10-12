import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import Image from "next/image";
import logo from "../../public/images/logo.svg";
import CartTotal from "./CartTotal";
import WishlistTotal from "./WishlistTotal";
import SearchForm from "./SearchForm";

const TopNav = async () => {
  const session = await getServerSession(authOptions);
  console.log("trending product data", session?.user);
  const userName: string | null | undefined = session?.user?.name;
  return (
    <div>
      <header className="py-4 shadow-sm bg-white">
        <div className="container flex items-center justify-between">
          <a href="index.html">
            <Image src={logo} alt="Logo" className="w-32" />
          </a>

          <SearchForm />

          <div className="flex items-center space-x-4">
            <a
              href="#"
              className="text-center text-gray-700 hover:text-primary transition relative"
            >
              <WishlistTotal userName={userName} />
            </a>
            <a
              href="#"
              className="text-center text-gray-700 hover:text-primary transition relative"
            >
              <CartTotal userName={userName} />
            </a>
            <a
              href="#"
              className="text-center text-gray-700 hover:text-primary transition relative"
            >
              <div className="text-2xl">
                <i className="fa-regular fa-user"></i>
              </div>
              <div className="text-xs leading-3">Account</div>
            </a>
          </div>
        </div>
      </header>
    </div>
  );
};

export default TopNav;
