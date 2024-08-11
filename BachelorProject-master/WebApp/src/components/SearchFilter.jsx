import React from "react";

function SearchFilter({ setInputSearch }) {
  const handleSearch = (event) => {
    setInputSearch(event.target.value);
  };
  return (
    <div className="relative flex items-center space-x-2 pt-2 text-stone-700">
      <label htmlFor="search">Search</label>
      <input
        className="flex w-full rounded border px-3 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C4A6E] "
        type="search"
        name="search"
        id="search"
        placeholder="Find deck"
        onChange={handleSearch}
      />
    </div>
  );
}

export default SearchFilter;
