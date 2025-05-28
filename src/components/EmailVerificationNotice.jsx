import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const EmailVerificationNotice = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const excludedPaths = ["/login", "/register", "/settings"];

  if (
    !user ||
    user.isEmailVerified ||
    excludedPaths.includes(location.pathname)
  ) {
    return null;
  }

  const handleVerifyClick = () => {
    navigate("/settings");
  };

  return (
    <div className="w-full bg-gray-100 border-b border-[#E0E0E0]">
      <div className="max-w-[1404px] m-auto h-fit flex justify-between px-0 min-[420px]:px-5 min-[1000px]:px-10 items-center">
        <div className="bg-gray-100 text-gray-800 w-full  px-4 py-2.5 text-xs min-[420px]:text-sm flex justify-between items-center">
          <span>
            Your email is not verified. Please verify your email to access all
            features.
          </span>
          <button
            onClick={handleVerifyClick}
            className="ml-4 px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition cursor-pointer whitespace-nowrap"
          >
            Verify Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationNotice;
