import React, { useState, useEffect } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const ReviewModal = ({ isOpen, onClose, product, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleRating = (value) => setRating(value);

  const handleSubmit = () => {
    if (!rating || !comment.trim()) {
      alert("Please add both rating and comment");
      return;
    }

    onSubmit({ rating, comment, product });
    onClose();
  };

  // Reset state when modal is closed
  useEffect(() => {
    if (!isOpen) {
      setRating(0);
      setHoverRating(0);
      setComment("");
    }
  }, [isOpen]);

  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const renderStars = () => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      const current = hoverRating || rating;

      let icon;
      if (current >= i) {
        icon = <FaStar className="text-yellow-500" />;
      } else if (current >= i - 0.5) {
        icon = <FaStarHalfAlt className="text-yellow-500" />;
      } else {
        icon = <FaRegStar className="text-gray-300" />;
      }

      stars.push(
        <div
          key={i}
          className="relative cursor-pointer text-2xl w-6 h-6"
          onMouseLeave={() => setHoverRating(0)}
        >
          <div
            className="absolute left-0 top-0 w-1/2 h-full z-10"
            onMouseEnter={() => setHoverRating(i === 1 ? i : i - 0.5)}
            onClick={() => handleRating(i === 1 ? i : i - 0.5)}
          />
          <div
            className="absolute right-0 top-0 w-1/2 h-full z-10"
            onMouseEnter={() => setHoverRating(i)}
            onClick={() => handleRating(i)}
          />
          <div className="relative z-0">{icon}</div>
        </div>
      );
    }

    return stars;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
          onClick={handleOutsideClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white p-6 rounded-xl w-[90%] max-w-md shadow-2xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Leave a Review for{" "}
              <span className="text-blue-600">{product?.name}</span>
            </h2>

            {/* Stars */}
            <div className="flex gap-1 mb-4">{renderStars()}</div>

            {/* Selected rating */}
            <p className="text-gray-700 mb-4">
              {rating > 0
                ? `Rating: ${rating} ${rating === 1 ? "star" : "stars"}`
                : "Please select a rating"}
            </p>

            {/* Comment */}
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={4}
              placeholder="Write your review..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 cursor-pointer hover:bg-gray-300 text-gray-700 rounded-lg transition duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 cursor-pointer hover:bg-blue-700 text-white rounded-lg transition duration-300"
              >
                Submit
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ReviewModal;
