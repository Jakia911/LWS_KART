import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";

const SearchForm = () => {
  const [searchQuery, setSearchQuery] = useState<string>(""); // Specify that searchQuery is of type string
  const router = useRouter();

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  return (
    <div className="w-full max-w-xl relative flex">
      <form action="" onSubmit={handleSearchSubmit}>
        <span className="absolute left-4 top-3 text-lg text-gray-400">
          <i className="fa-solid fa-magnifying-glass"></i>
        </span>
        <input
          type="text"
          name="search"
          id="search"
          onChange={handleChange}
          className="w-full border border-primary border-r-0 pl-12 py-3 pr-3 rounded-l-md focus:outline-none hidden md:flex"
          placeholder="search"
        />
        <button className="bg-primary border border-primary text-white px-8 rounded-r-md hover:bg-transparent hover:text-primary transition hidden md:flex">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
