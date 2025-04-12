import React, { useState, useRef, useEffect } from "react";
import { clsx } from "clsx";

type TooltipProps = {
  /**
   * The content of the tooltip that will be shown on hover.
   */
  content: string;

  /**
   * Position of the tooltip relative to the target element.
   * Options: "top", "right", "bottom", "left"
   */
  position?: "top" | "right" | "bottom" | "left";

  /**
   * Custom class name for the tooltip.
   */
  className?: string;
};

const Tooltip = ({ content, position = "top", className }: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const targetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const targetElement = targetRef.current;
    if (targetElement) {
      targetElement.addEventListener("mouseenter", handleMouseEnter);
      targetElement.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (targetElement) {
        targetElement.removeEventListener("mouseenter", handleMouseEnter);
        targetElement.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <div ref={targetRef} className="relative inline-block">
      {isVisible && (
        <div
          ref={tooltipRef}
          className={clsx(
            "absolute z-10 text-sm text-white p-2 rounded bg-black opacity-75",
            {
              "top-full left-1/2 transform -translate-x-1/2 mt-2": position === "top",
              "bottom-full left-1/2 transform -translate-x-1/2 mb-2": position === "bottom",
              "left-full top-1/2 transform -translate-y-1/2 ml-2": position === "left",
              "right-full top-1/2 transform -translate-y-1/2 mr-2": position === "right",
            },
            className
          )}
        >
          {content}
        </div>
      )}
      <span className="cursor-pointer">{/* Children that trigger the tooltip */}</span>
    </div>
  );
};

export default Tooltip;
