import { SubmitHandler, useForm } from "react-hook-form";

interface CheckoutFormProps {
  userName: string | undefined | null;
}

interface FormValues {
  firstName: string;
  lastName: string;
  company: string;
  region: string;
  address: string;
  city: string;
  phone: string;
  email: string;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ userName }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    // You can also handle form submission here, e.g., posting data to an API
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 lg:mx-20">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="first-name" className="text-gray-600">
            First Name <span className="text-primary">*</span>
          </label>
          <input
            type="text"
            {...register("firstName", { required: "First name is required" })}
            className="input-box"
            id="first-name"
          />
          {errors.firstName && (
            <p className="text-red-500">{errors.firstName.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="last-name" className="text-gray-600">
            Last Name <span className="text-primary">*</span>
          </label>
          <input
            type="text"
            {...register("lastName", { required: "Last name is required" })}
            className="input-box"
            id="last-name"
          />
          {errors.lastName && (
            <p className="text-red-500">{errors.lastName.message}</p>
          )}
        </div>
      </div>
      <div>
        <label htmlFor="company" className="text-gray-600">
          Company
        </label>
        <input
          type="text"
          {...register("company")}
          className="input-box"
          id="company"
        />
      </div>
      <div>
        <label htmlFor="region" className="text-gray-600">
          Country/Region
        </label>
        <input
          type="text"
          {...register("region")}
          className="input-box"
          id="region"
        />
      </div>
      <div>
        <label htmlFor="address" className="text-gray-600">
          Street address
        </label>
        <input
          type="text"
          {...register("address")}
          className="input-box"
          id="address"
        />
      </div>
      <div>
        <label htmlFor="city" className="text-gray-600">
          City
        </label>
        <input
          type="text"
          {...register("city")}
          className="input-box"
          id="city"
        />
      </div>
      <div>
        <label htmlFor="phone" className="text-gray-600">
          Phone number
        </label>
        <input
          type="text"
          {...register("phone")}
          className="input-box"
          id="phone"
        />
      </div>
      <div>
        <label htmlFor="email" className="text-gray-600">
          Email address
        </label>
        <input
          type="email"
          {...register("email")}
          className="input-box"
          id="email"
        />
      </div>
      <button
        type="submit"
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default CheckoutForm;
