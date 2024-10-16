interface PriceFilterProps {
  minPrice: string;
  maxPrice: string;
  handleMinPriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleMaxPriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PriceFilter: React.FC<PriceFilterProps> = ({
  minPrice,
  maxPrice,
  handleMinPriceChange,
  handleMaxPriceChange,
}) => {
  return (
    <div className="pt-4">
      <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
        Price
      </h3>
      <div className="mt-4 flex items-center">
        <input
          type="text"
          name="min"
          id="min"
          value={minPrice}
          onChange={handleMinPriceChange}
          className="w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-1 text-gray-600 shadow-sm"
          placeholder="Min"
        />
        <span className="mx-3 text-gray-500">-</span>
        <input
          type="text"
          name="max"
          id="max"
          value={maxPrice}
          onChange={handleMaxPriceChange}
          className="w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-1 text-gray-600 shadow-sm"
          placeholder="Max"
        />
      </div>
    </div>
  );
};

export default PriceFilter;
