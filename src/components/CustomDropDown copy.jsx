import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdKeyboardArrowDown } from "react-icons/md";

export default function CustomDropdown({
  label,
  options,
  value,
  onChange,
  className = "",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const handleSelect = (opt) => {
    onChange(opt);
    setIsOpen(false);
  };

  // Handle outside click to close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [containerRef]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {label && (
        <label className="block text-sm font-semibold mb-1">{label}</label>
      )}

      {/* Trigger Button */}
      <motion.button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full p-2 bg-white border border-gray-300 rounded flex justify-between items-center cursor-pointer"
        whileTap={{ scale: 0.97 }}
      >
        <span className="capitalize">{value}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <MdKeyboardArrowDown className="text-2xl text-gray-700" />
        </motion.span>
      </motion.button>

      {/* Animated Options List */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 w-full bg-white border border-gray-300 rounded shadow mt-1 z-10"
          >
            {options.map((opt) => (
              <li
                key={opt}
                onClick={() => handleSelect(opt)}
                className="p-2 hover:bg-[#E6F0FF] cursor-pointer capitalize transition-colors"
              >
                {opt}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
