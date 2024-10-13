"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

const SearchForm = () => {
  const [searchQuery, setSearchQuery] = useState<string>(""); // Specify that searchQuery is of type string
  const [isClient, setIsClient] = useState<boolean>(false); // Ensure we are on the client
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true); // Only set to true once we are on the client
    }
  }, []);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (searchQuery.trim() && isClient) {
      // Redirect to the shop page with the search query as a URL parameter
      router.push(`/shop?search=${encodeURIComponent(searchQuery)}`);
    }
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <form
      action=""
      onSubmit={handleSearchSubmit}
      className="w-full max-w-xl relative flex"
    >
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
      <button className="bg-primary border border-primary text-white px-8 rounded-r-md hover:bg-transparent hover:text-primary transition hidden md:flex leading-[45px]">
        Search
      </button>
    </form>
  );
};

export default SearchForm;
