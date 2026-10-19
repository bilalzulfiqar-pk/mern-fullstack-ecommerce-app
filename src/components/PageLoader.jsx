import React, { useState, useEffect } from "react";

const PageLoader = () => {
  const [showWakeMessage, setShowWakeMessage] = useState(false);

  useEffect(() => {
    // Show the wake-up notice only if loading takes longer than 2.5 seconds
    const timer = setTimeout(() => {
      setShowWakeMessage(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full bg-[#F7FAFC] min-h-[100vh] h-dvh-100">
      <div className="pt-6 max-w-[1404px] m-auto h-full">
        <div className="mx-5 min-[1000px]:mx-10">
          <div className="flex flex-col justify-center items-center h-[85vh] h-dvh-85 -translate-y-22">
            {/* Spinning Indicator */}
            <div
              className="w-16 h-16 border-4 border-blue-500 border-y-transparent rounded-full animate-spin"
              style={{ animationDuration: "0.5s" }}
            ></div>

            {/* Waking Up Idle Notice (Displayed after 2.5s) */}
            {showWakeMessage && (
              <div className="mt-6 text-center px-4 max-w-md transition-opacity duration-700 ease-in-out">
                <h3 className="text-lg font-semibold text-gray-800">
                  Just a moment...
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Waking up server from idle sleep... Ready in a few seconds.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageLoader;
