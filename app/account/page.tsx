import AccountWrapper from "@/components/accounts/AccountWrapper";

const AccountPage = () => {
  return (
    <div>
      <div className="container py-4 flex items-center gap-3">
        <a href="../index.html" className="text-primary text-base">
          <i className="fa-solid fa-house"></i>
        </a>
        <span className="text-sm text-gray-400">
          <i className="fa-solid fa-chevron-right"></i>
        </span>
        <p className="text-gray-600 font-medium">Account</p>
      </div>
      <AccountWrapper />
    </div>
  );
};

export default AccountPage;
