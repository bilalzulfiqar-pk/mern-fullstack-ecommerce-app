import { useState } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { FaStar, FaRegStar } from "react-icons/fa";

const SidebarFilter = () => {
  
  // Define sections dynamically
  const sections = [
    {
      key: "categoryOpen",
      title: "Category",
      items: ["Mobile accessory", "Electronics", "Smartphones", "Modern tech"],
      isCheckbox: true,
      seeAllLink: "#category",
    },
    {
      key: "brandsOpen",
      title: "Brands",
      items: ["Samsung", "Apple", "Huawei", "Pocco", "Lenovo"],
      isCheckbox: true,
      seeAllLink: "#brands",
    },
    {
      key: "featuresOpen",
      title: "Features",
      items: [
        "Metallic",
        "Plastic cover",
        "8GB Ram",
        "Super power",
        "Large Memory",
      ],
      isCheckbox: true,
      seeAllLink: "#features",
    },
    { key: "priceOpen", title: "Price range", isPrice: true },
    {
      key: "conditionOpen",
      title: "Condition",
      items: ["Any", "Refurbished", "Damaged", "Brand new"],
      isRadio: true,
    },
    { key: "ratingsOpen", title: "Ratings", isRating: true },
    {
      key: "manufacturerOpen",
      title: "Manufacturer",
      seeAllLink: "#manufacturer",
    },
  ];

  // Create state dynamically
  const [openSections, setOpenSections] = useState(
    sections.reduce((acc, section) => {
      acc[section.key] =
        section.isCheckbox !== undefined ||
        section.isPrice ||
        section.isRating ||
        section.isRadio;
      return acc;
    }, {})
  );

  const [price, setPrice] = useState({ min: 0, max: 9999 });
  const [selectedCondition, setSelectedCondition] = useState("Any");

  const toggleSection = (key) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="w-full pt-0 p-4">
      {sections.map(
        ({
          key,
          title,
          items,
          isCheckbox,
          isPrice,
          isRating,
          isRadio,
          seeAllLink,
        }) => (
          <div key={key} className="mb-2 pt-2 border-t border-[#E0E0E0] pb-3">
            {/* Section Header */}
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection(key)}
            >
              <h3 className="font-bold text-gray-800">{title}</h3>
              {openSections[key] ? (
                <FaChevronUp className="text-gray-500" />
              ) : (
                <FaChevronDown className="text-gray-500" />
              )}
            </div>

            {/* Price Range Section */}
            {openSections[key] && isPrice && (
              <div className="mt-3">
                <input
                  type="range"
                  min="0"
                  max="9999"
                  value={price.max}
                  onChange={(e) => setPrice({ ...price, max: e.target.value })}
                  className="w-full cursor-pointer"
                />
                <div className="flex justify-between text-gray-600 mt-2">
                  <input
                    type="number"
                    value={price.min}
                    onChange={(e) =>
                      setPrice({ ...price, min: e.target.value })
                    }
                    className="w-20 p-1 border border-[#E0E0E0] rounded"
                    placeholder="$0"
                  />
                  <input
                    type="number"
                    value={price.max}
                    onChange={(e) =>
                      setPrice({ ...price, max: e.target.value })
                    }
                    className="w-20 p-1 border border-[#E0E0E0] rounded"
                    placeholder="$9999"
                  />
                </div>
                <button className="mt-3 w-full p-2 bg-blue-600 text-white rounded">
                  Apply
                </button>
              </div>
            )}

            {/* Condition Filter (Radio Buttons) */}
            {openSections[key] && isRadio && (
              <ul className="mt-2 space-y-2 text-gray-700">
                {items.map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <input
                      type="radio"
                      id={`condition-${index}`}
                      name="condition"
                      checked={selectedCondition === item}
                      onChange={() => setSelectedCondition(item)}
                      className="w-4 h-4 accent-blue-600"
                    />
                    <label
                      htmlFor={`condition-${index}`}
                      className="cursor-pointer"
                    >
                      {item}
                    </label>
                  </li>
                ))}
              </ul>
            )}

            {/* Ratings Section */}
            {openSections[key] && isRating && (
              <ul className="mt-2 space-y-2">
                {[5, 4, 3, 2].map((stars) => (
                  <li key={stars} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={`rating-${stars}`}
                      className="w-4 h-4 accent-blue-600"
                    />
                    <label htmlFor={`rating-${stars}`} className="flex">
                      {[...Array(5)].map((_, i) =>
                        i < stars ? (
                          <FaStar key={i} className="text-orange-400" />
                        ) : (
                          <FaRegStar key={i} className="text-gray-400" />
                        )
                      )}
                    </label>
                  </li>
                ))}
              </ul>
            )}

            {/* Render List if Items Exist (Checkbox & Simple List) */}
            {openSections[key] &&
              items &&
              !isRadio &&
              !isRating &&
              !isPrice && (
                <ul className="mt-2 space-y-2 text-gray-700">
                  {items.map((item, index) => {
                    const id = `${key}-${index}`;
                    return isCheckbox ? (
                      <li key={id} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id={id}
                          className="w-4 h-4 accent-blue-600"
                          // defaultChecked={[
                          //   "Samsung",
                          //   "Apple",
                          //   "Pocco",
                          //   "Metallic",
                          // ].includes(item)}
                        />
                        <label htmlFor={id} className="cursor-pointer">
                          {item}
                        </label>
                      </li>
                    ) : (
                      <li
                        key={id}
                        className="cursor-pointer hover:text-blue-500"
                      >
                        {item}
                      </li>
                    );
                  })}
                </ul>
              )}

            {/* "See all" Link (only shown if the section has items) */}
            {openSections[key] && items && seeAllLink && (
              <a
                href={seeAllLink}
                className="text-blue-600 text-sm mt-2 block hover:underline"
              >
                See all
              </a>
            )}
          </div>
        )
      )}
    </div>
  );
};

export default SidebarFilter;
