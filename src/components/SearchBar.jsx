import { useEffect, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // window.scrollTo(0, 0);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scrolls to top smoothly
  }, [location]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const newQuery = params.get("query") || "";
    const newCategory = params.get("category") || "all";

    // To prevents unnecessary re-renders
    if (newQuery !== query) setQuery(newQuery);
    if (newCategory !== category) setCategory(newCategory);
  }, [location.search]); // Removed query and category from dependency array

  const handleSearch = () => {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      if (category !== "all") {
        navigate(`/search?category=${category}`);
      } else {
        navigate("/search");
      }
      return;
    }
    // onSearch(query, category);
    navigate(
      `/search?query=${encodeURIComponent(trimmedQuery)}&category=${category}`
    );
  };

  return (
    <div className="flex items-center border-2 border-blue-500 rounded-lg overflow-hidden w-full min-w-[250px] max-w-[50%] max-[840px]:min-w-fit max-[680px]:min-w-full max-[680px]:my-3">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search..."
        className="p-2 flex-grow outline-none text-gray-700 placeholder-gray-400"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()} // Enter key to search
      />

      {/* Select Dropdown Wrapper */}
      <div className="relative border-l border-blue-500 max-[680px]:hidden">
        <select
          className="p-2 bg-white outline-none appearance-none pr-8 text-gray-700 cursor-pointer"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">All</option>
          <option value="Tech">Tech</option>
          <option value="Clothing">Clothing</option>
          <option value="Interiors">Interiors</option>
        </select>
        {/* Custom Dropdown Arrow */}
        <div className="absolute top-1/2 right-1 transform -translate-y-1/2 pointer-events-none text-2xl text-gray-400">
          <MdKeyboardArrowDown />
        </div>
      </div>

      {/* Search Button */}
      <button
        className="bg-blue-500 text-white px-5 py-2 hover:bg-blue-600 min-w-20 max-[840px]:min-w-fit transition duration-200 cursor-pointer max-[680px]:min-w-[87px]"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
