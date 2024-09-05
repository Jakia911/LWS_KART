import LoginForm from "@/components/login/LoginForm";
import SocialLogin from "@/components/login/SocialLogin";

const page = () => {
  return (
    <div className="contain py-16">
      <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
        <h2 className="text-2xl uppercase font-medium mb-1">Login</h2>
        <p className="text-gray-600 mb-6 text-sm">welcome back customer</p>
        <LoginForm />
        <SocialLogin />
        <p className="mt-4 text-center text-gray-600">
          Don't have account?
          <a href="register.html" className="text-primary">
            Register now
          </a>
        </p>
      </div>
    </div>
  );
};

export default page;
