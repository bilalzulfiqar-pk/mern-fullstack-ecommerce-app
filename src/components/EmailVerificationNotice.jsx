import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import AuthContext from "../context/AuthContext";

const EmailVerificationNotice = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const excludedPaths = ["/login", "/register", "/settings"];

  // Don’t render anything if user is missing, already verified, or on an excluded path
  const shouldShow =
    user && !user.isEmailVerified && !excludedPaths.includes(location.pathname);

  const handleVerifyClick = () => {
    navigate("/settings");
  };

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          layout // smooth layout changes if parent reflows
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 25,
            delay: 1.3,
          }}
          // transition={{ duration: 0.3, delay: 1.3 }}
          className="overflow-hidden w-full bg-gray-100 border-b border-[#E0E0E0]"
        >
          <div className="max-w-[1404px] m-auto h-fit flex justify-between px-0 min-[420px]:px-5 min-[1000px]:px-10 items-center">
            <div className="bg-gray-100 text-gray-800 w-full px-4 py-2.5 text-xs min-[420px]:text-sm flex justify-between items-center">
              <span>
                Your email is not verified. Please verify your email to access
                all features.
              </span>
              <button
                onClick={handleVerifyClick}
                className="ml-4 px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition cursor-pointer whitespace-nowrap"
              >
                Verify Now
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EmailVerificationNotice;
