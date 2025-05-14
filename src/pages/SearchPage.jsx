import React, { useContext, useEffect, useMemo, useRef } from "react";
import { useState } from "react";
import { FaTh, FaBars } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import SidebarFilter from "../components/SidebarFilter";
import ProductCardGrid from "../components/ProductCardGrid";
import Pagination from "../components/Pagination";
import ProductCard from "../components/ProductCard";
import { ProductContext } from "../context/ProductContext";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import CustomDropdown from "../components/CustomDropDown";

const SearchPage = () => {
  const [gridView, setGridView] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(9);
  const [sortOption, setSortOption] = useState("Featured");
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const buttonRef = useRef(null);

  const { products, loading } = useContext(ProductContext);
  const [sidebarFilteredProducts, setSidebarFilteredProducts] = useState([]); // Holds products after sidebar filters
  const [finalProducts, setFinalProducts] = useState([]); // Holds sorted & filtered products

  const location = useLocation();

  // Extract query and category from URL

  // const params = new URLSearchParams(location.search);
  // const searchQuery = params.get("query")?.toLowerCase() || "";
  // const searchCategory = params.get("category") || "all";

  const { searchQuery, searchCategory } = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return {
      searchQuery: params.get("query")?.toLowerCase() || "",
      searchCategory: params.get("category") || "all",
    };
  }, [location.search]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scrolls to top smoothly
  }, [currentPage]); // Runs when currentPage changes

  const [searchParams] = useSearchParams();
  const urlSortOption = searchParams.get("sort");

  useEffect(() => {
    if (urlSortOption === "discount_high") {
      setSortOption("Discount: High to Low");
    } else if (urlSortOption === "rating_high") {
      setSortOption("Rating: High to Low");
    } else {
      setSortOption("Featured"); // Reset to default if no sorting parameter is in the URL
    }
  }, [urlSortOption]);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: null, max: null });
  const [selectedRating, setSelectedRating] = useState(0);

  // Filter products based on search
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesQuery = product.name.toLowerCase().includes(searchQuery);
      // const matchesCategory =
      //   searchCategory === "all" ||
      //   (product.categories && product.categories.includes(searchCategory));

      const matchesCategory =
        searchCategory === "all" ||
        (product.categories &&
          product.categories.some(
            (cat) => cat.toLowerCase() === searchCategory.toLowerCase()
          ));

      // Check if the product's supplier is verified (if checkbox is checked)
      const matchesVerified =
        !verifiedOnly || (product.supplier && product.supplier.verified);

      return matchesQuery && matchesCategory && matchesVerified;
    });
  }, [products, searchQuery, searchCategory, verifiedOnly]);

  // useEffect(() => {
  //   console.log("1. filteredProducts :",filteredProducts) //Testing
  //   console.log("priceRange :",priceRange) //Testing

  // }, [filteredProducts, priceRange])

  // Sidebar related code

  // const handleFiltersChange = (filters) => {
  //   setSelectedCategories(filters.selectedCategories);
  //   setPriceRange(filters.priceRange);
  //   setSelectedRating(filters.selectedRating);
  // };
  // console.log("Filters changed:", filters);   //Testing

  useEffect(() => {
    let sideBarFiltered = [...filteredProducts]; // Start with searchpage filtered products

    // console.log("2. SideBarFiltered :",sideBarFiltered); //testing

    // Apply Category Filtering
    if (selectedCategories.length > 0) {
      sideBarFiltered = sideBarFiltered.filter((product) =>
        product.categories.some((cat) => selectedCategories.includes(cat))
      );
    }

    // Apply Price Range Filtering
    if (priceRange.min !== null && priceRange.max !== null) {
      sideBarFiltered = sideBarFiltered.filter(
        (product) =>
          product.currentPrice >= priceRange.min &&
          product.currentPrice <= priceRange.max
      );
    }

    // Apply Rating Filtering
    if (selectedRating > 0) {
      sideBarFiltered = sideBarFiltered.filter(
        (product) => product.rating >= selectedRating
      );
    }

    setSidebarFilteredProducts(sideBarFiltered); // Update sidebar filtered products

    // console.log("2. SideBarFiltered :",sideBarFiltered); //testing
  }, [filteredProducts, selectedCategories, priceRange, selectedRating]); // Run effect when filters change

  // Sort products based on selected price option
  const sortedProducts = useMemo(() => {
    if (sortOption === "Featured") return sidebarFilteredProducts;
    return [...sidebarFilteredProducts].sort((a, b) => {
      if (sortOption === "Price: Low to High") {
        return a.currentPrice - b.currentPrice;
      }
      if (sortOption === "Price: High to Low") {
        return b.currentPrice - a.currentPrice;
      }
      if (sortOption === "Discount: Low to High") {
        const discountA =
          ((a.previousPrice - a.currentPrice) / a.previousPrice) * 100 || 0;
        const discountB =
          ((b.previousPrice - b.currentPrice) / b.previousPrice) * 100 || 0;
        return discountA - discountB;
      }
      if (sortOption === "Discount: High to Low") {
        const discountA =
          ((a.previousPrice - a.currentPrice) / a.previousPrice) * 100 || 0;
        const discountB =
          ((b.previousPrice - b.currentPrice) / b.previousPrice) * 100 || 0;
        return discountB - discountA;
      }
      if (sortOption === "Rating: Low to High") {
        return a.rating - b.rating;
      }
      if (sortOption === "Rating: High to Low") {
        return b.rating - a.rating;
      }

      return 0; // No sorting for "Featured"
    });
  }, [sidebarFilteredProducts, sortOption]); // Recalculate when sortOption or filteredProducts change

  // const toggleSidebar = () => {
  //   setIsSidebarOpen(!isSidebarOpen);
  // };

  // Pagination Logic
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // console.log(searchCategory);

  if (loading)
    return (
      <div className="w-full bg-[#F7FAFC] h-screen">
        <div className="pt-6 max-w-[1580px]  m-auto h-full">
          <div className="mx-5 min-[1080px]:mx-32">
            <div className="flex justify-center items-center h-[85vh] -translate-y-22">
              <div
                className="w-16 h-16 border-4 border-blue-500 border-y-transparent rounded-full animate-spin"
                style={{ animationDuration: "0.5s" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <div>
      <div className="w-full pb-6 bg-[#F7FAFC] h-full">
        <div className="max-w-[1580px] px-5 min-[1080px]:px-32 m-auto h-full">
          {/* Breadcrumb */}
          <nav className="text-[#8B96A5] text-base py-6">
            <ul className="flex space-x-2">
              <li>
                <Link to={"/"} className="hover:underline">
                  Home
                </Link>
              </li>
              <li>{" > "}</li>
              <li>
                <Link
                  to={`/search?category=${searchCategory}`}
                  className="hover:underline"
                >
                  {searchCategory === "all"
                    ? "All Products"
                    : searchCategory.charAt(0).toUpperCase() +
                      searchCategory.slice(1)}
                </Link>
              </li>
              {/* <li>{" > "}</li>
              <li>
                <a href="#" className="hover:underline">
                  Men’s wear
                </a>
              </li>
              <li>{" > "}</li>
              <li>
                <span className="text-gray-400">Summer clothing</span>
              </li> */}
            </ul>
          </nav>

          {/* Search Section */}

          <div className="flex h-full">
            {/* Search Filters */}
            <div className="w-[20%] max-[840px]:w-[0%]">
              <SidebarFilter
                isOpen={isSidebarOpen}
                setIsOpen={setIsSidebarOpen}
                buttonRef={buttonRef}
                // onFiltersChange={handleFiltersChange}
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                selectedRating={selectedRating}
                setSelectedRating={setSelectedRating}
              />
            </div>

            {/* Search Results */}

            <div className="w-[80%] max-[840px]:w-[100%] px-2">
              <button
                ref={buttonRef}
                className="w-full cursor-pointer mb-2 hidden active:bg-gray-100 transition duration-300 max-[840px]:flex justify-center items-center p-3 border rounded-lg border-[#E0E0E0]"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                Show Filter
              </button>
              {/* Search Result Info */}
              <div className="flex w-full items-center justify-between max-[700px]:flex-col max-[700px]:gap-2 p-3 border rounded-lg border-[#E0E0E0] bg-white">
                {/* Left Side: Item Count */}
                <p className="text-gray-700 font-medium">
                  {sortedProducts.length}{" "}
                  {sortedProducts.length < 2 ? "item" : "items"}
                  <span>
                    {" "}
                    in <span className="font-bold">{searchCategory}</span>
                  </span>
                </p>

                {/* Right Side: Controls */}
                <div className="flex items-center gap-4 max-[500px]:flex-col">
                  {/* Checkbox */}
                  <label className="flex cursor-pointer items-center gap-2 text-gray-700">
                    <input
                      type="checkbox"
                      className="w-4 h-4 border-gray-300 cursor-pointer rounded"
                      checked={verifiedOnly}
                      onChange={() => setVerifiedOnly(!verifiedOnly)}
                    />
                    Verified only
                  </label>

                  {/* Sorting & View Toggle */}
                  <div className="flex justify-center items-center gap-2 max-[360px]:flex-col">
                    {/* Dropdown */}
                    <div className="relative">
                      {/* <select
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                        className="border cursor-pointer hover:bg-[#f5f5f5] focus:bg-[#f5f5f5] transition-all duration-300 appearance-none border-[#E0E0E0] px-3 w-51 py-1.5 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                      >
                        <option value="Featured">Featured</option>
                        <option value="Price: Low to High">
                          Price: Low to High
                        </option>
                        <option value="Price: High to Low">
                          Price: High to Low
                        </option>
                        <option value="Discount: High to Low">
                          Discount: High to Low
                        </option>
                        <option value="Discount: Low to High">
                          Discount: Low to High
                        </option>
                        <option value="Rating: High to Low">
                          Rating: High to Low
                        </option>
                        <option value="Rating: Low to High">
                          Rating: Low to High
                        </option>
                      </select>
                      <div className="absolute top-1/2 right-2 transform -translate-y-1/2 pointer-events-none text-2xl text-gray-400">
                        <MdKeyboardArrowDown />
                      </div> */}
                      <CustomDropdown
                        // No label when not needed
                        options={[
                          "Featured",
                          "Price: Low to High",
                          "Price: High to Low",
                          "Discount: High to Low",
                          "Discount: Low to High",
                          "Rating: High to Low",
                          "Rating: Low to High",
                        ]}
                        value={sortOption}
                        onChange={setSortOption}
                        // Customize width only
                        containerClassName="w-51"
                        // Tweak button: more rounded or different padding
                        buttonClassName="w-full bg-white border border-gray-300 rounded-md cursor-pointer flex justify-between items-center pl-3 py-1.5 pr-1.5"
                        // List styling if needed
                        listClassName="absolute left-0 w-full bg-white border border-gray-300 rounded-lg shadow mt-1 z-10"
                        // Option hover color or typography tweak
                        optionClassName="p-2 hover:bg-[#E6F0FF] cursor-pointer capitalize transition-colors"
                        // Icon styling
                        iconClassName="text-2xl text-gray-400"
                      />
                    </div>

                    {/* View Toggle Buttons */}
                    <div className="flex border border-[#E0E0E0] rounded-md overflow-hidden">
                      <button
                        onClick={() => setGridView(true)}
                        className={`p-2 cursor-pointer transition-all duration-300 ${
                          gridView ? "bg-gray-200" : "bg-white"
                        } hover:bg-gray-300`}
                      >
                        <FaTh className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => setGridView(false)}
                        className={`p-2 cursor-pointer transition-all duration-300 ${
                          !gridView ? "bg-gray-200" : "bg-white"
                        } hover:bg-gray-300`}
                      >
                        <FaBars className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Search Results */}

              <div className="filtered">
                {gridView ? (
                  <div className="grid grid-cols-3 max-[840px]:grid-cols-2 max-[440px]:grid-cols-1 gap-6 py-5 max-[500px]:gap-3 max-[400px]:gap-2">
                    {currentProducts.map((product, index) => (
                      <ProductCardGrid key={index} product={product} />
                    ))}
                  </div>
                ) : (
                  <div className="py-5 flex flex-col gap-3">
                    {currentProducts.map((product, index) => (
                      <ProductCard key={index} product={product} />
                    ))}
                  </div>
                )}
              </div>

              {/* End  */}
            </div>
          </div>
          {/* Pagination Component */}
          <div className="flex justify-end pr-10 max-[400px]:pr-0">
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(sortedProducts.length / itemsPerPage)}
              setCurrentPage={setCurrentPage}
              itemsPerPage={itemsPerPage}
              setItemsPerPage={setitemsPerPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
