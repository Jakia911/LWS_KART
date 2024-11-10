import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import Image from "next/image";
import UpdateUserModalButton from "./UpdateUserModalButton";

const AccountWrapper = async () => {
  const session = await getServerSession(authOptions);

  const userName = session?.user?.name;
  const userEmail = session?.user?.email;
  const userImage = session?.user?.image;
  return (
    <div className="container  items-start gap-6 pt-4 pb-16">
      <div className=" grid grid-cols-3 gap-4 mx-auto max-w-5xl">
        <div className="shadow rounded bg-white px-4 pt-6 pb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-gray-800 text-lg">
              Personal Profile
            </h3>
            <UpdateUserModalButton />
          </div>
          <div className="space-y-1">
            <h4 className="text-gray-700 font-medium">{userName}</h4>
            <p className="text-gray-800">{userEmail}</p>
            <Image
              src={userImage}
              width={60}
              height={60}
              alt="User Image"
              className="rounded-lg"
            />
            <p>{userImage}</p>
          </div>
        </div>

        <div className="shadow rounded bg-white px-4 pt-6 pb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-gray-800 text-lg">
              Shipping address
            </h3>
            <a href="#" className="text-primary">
              Edit
            </a>
          </div>
          <div className="space-y-1">
            <h4 className="text-gray-700 font-medium">John Doe</h4>
            <p className="text-gray-800">Medan, North Sumatera</p>
            <p className="text-gray-800">20371</p>
            <p className="text-gray-800">0811 8877 988</p>
          </div>
        </div>

        <div className="shadow rounded bg-white px-4 pt-6 pb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-gray-800 text-lg">
              Billing address
            </h3>
            <a href="#" className="text-primary">
              Edit
            </a>
          </div>
          <div className="space-y-1">
            <h4 className="text-gray-700 font-medium">John Doe</h4>
            <p className="text-gray-800">Medan, North Sumatera</p>
            <p className="text-gray-800">20317</p>
            <p className="text-gray-800">0811 8877 988</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountWrapper;
