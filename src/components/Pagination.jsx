import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";

const Pagination = ({
  totalPages,
  currentPage,
  setCurrentPage,
  itemsPerPage,
  setItemsPerPage,
}) => {
  // Function to change pages
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="flex items-center space-x-2 p-2 rounded-md">
      {/* Items Per Page Dropdown */}
      <div className="relative">
        <select
          className="border pl-3 pr-9 cursor-pointer appearance-none py-1 text-start border-[#E0E0E0] rounded-md"
          value={itemsPerPage}
          onChange={(e) => {
            setItemsPerPage(Number(e.target.value));
            setCurrentPage(1); // Reset to first page when changing items per page
          }}
        >
          <option value="6">Show 6</option>
          <option value="9">Show 9</option>
          <option value="12">Show 12</option>
        </select>
        <div className="absolute top-1/2 right-2 transform -translate-y-1/2 pointer-events-none text-2xl text-gray-400">
          <MdKeyboardArrowDown />
        </div>
      </div>

      {/* Pagination Controls */}
      <button
        className="p-2 cursor-pointer border rounded-md border-[#E0E0E0] disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous Page"
      >
        <AiOutlineLeft size={16} />
      </button>

      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          className={`px-3 corsor-pointer py-1 rounded-md border border-[#E0E0E0] 
            ${currentPage === index + 1 ? "bg-blue-500 text-white font-semibold" : "hover:bg-gray-100"}`}
          onClick={() => handlePageChange(index + 1)}
          aria-label={`Go to page ${index + 1}`}
        >
          {index + 1}
        </button>
      ))}

      <button
        className="p-2 border cursor-pointer rounded-md border-[#E0E0E0] disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next Page"
      >
        <AiOutlineRight size={16} />
      </button>
    </div>
  );
};

export default Pagination;
