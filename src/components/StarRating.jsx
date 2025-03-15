import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating); // Count of full stars
  const hasHalfStar = rating % 1 !== 0; // Check if there's a half star
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0); // Remaining empty stars

  return (
    <div className="flex text-yellow-400">
      {/* Full Stars */}
      {[...Array(fullStars)].map((_, index) => (
        <FaStar key={index} />
      ))}

      {/* Half Star (if applicable) */}
      {hasHalfStar && <FaStarHalfAlt />}

      {/* Empty Stars */}
      {[...Array(emptyStars)].map((_, index) => (
        <FaRegStar key={index} />
      ))}
    </div>
  );
};

export default StarRating;