import { useEffect, useRef, useState } from "react";

export default function ResponsiveText({ children, fontmin, fontmax }) {
  const pRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [checked, setChecked] = useState(false);

  const checkOverflow = () => {
    const el = pRef.current;
    if (el) {
      // Temporarily force a consistent font size for accurate measurement
      el.style.fontSize = "1.125rem"; // tailwind's text-lg is 1.125rem

      const lineHeight = parseFloat(getComputedStyle(el).lineHeight);
      const lines = el.clientHeight / lineHeight;

      // Revert font size so Tailwind class can take over
      el.style.fontSize = "";

      setIsOverflowing(lines > 2);
      setChecked(true); // mark as checked to avoid flicker
    }
  };

  useEffect(() => {
    const el = pRef.current;
    if (!el) return;

    const resizeObserver = new ResizeObserver(checkOverflow);
    const mutationObserver = new MutationObserver(checkOverflow);

    resizeObserver.observe(el);
    mutationObserver.observe(el, {
      childList: true,
      characterData: true,
      subtree: true,
    });

    checkOverflow();

    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, [children]);

  return (
    <div
      ref={pRef}
      className={` ${
        checked ? (isOverflowing ? fontmin : fontmax) : "text-lg"
      } line-clamp-3`}
    >
      {children}
    </div>
  );
}
