import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(getTimeUntilSunday());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeUntilSunday());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex space-x-1 mt-4 max-[1325px]:ml-4">
      {[
        { label: "Days", value: timeLeft.days },
        { label: "Hours", value: timeLeft.hours },
        { label: "Min", value: timeLeft.minutes },
        { label: "Sec", value: timeLeft.seconds },
      ].map((item, index) => (
        <div
          key={index}
          className="text-center bg-[#606060] rounded text-white p-2 px-3"
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={item.value} // re-renders the span on value change
              className="block text-lg font-bold"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
            >
              {String(item.value).padStart(2, "0")}
            </motion.span>
          </AnimatePresence>

          <p className="text-sm">{item.label}</p>
        </div>
      ))}
    </div>
  );
};

function getTimeUntilSunday() {
  const now = new Date();

  // Find the next Sunday at 23:59:59
  const dayOfWeek = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const daysUntilSunday = (7 - dayOfWeek) % 7;

  const sundayEnd = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + daysUntilSunday,
    23,
    59,
    59,
    999
  );

  const diff = sundayEnd - now;

  const seconds = Math.floor((diff / 1000) % 60);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  return { days, hours, minutes, seconds };
}

export default Timer;
