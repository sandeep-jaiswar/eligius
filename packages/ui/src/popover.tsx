import React, { useState, useRef, useEffect } from "react";
import { clsx } from "clsx";

type PopoverProps = {
  /**
   * The content to display inside the popover.
   */
  content: React.ReactNode;

  /**
   * The element to anchor the popover to.
   */
  children: React.ReactNode;

  /**
   * The positioning of the popover. Defaults to 'top'.
   */
  position?: "top" | "right" | "bottom" | "left";

  /**
   * Optionally disable the popover’s interactive hover/click behavior.
   */
  disabled?: boolean;
};

const Popover = ({
  content,
  children,
  position = "top",
  disabled = false,
}: PopoverProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (!disabled) {
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const popoverPositionClasses = {
    top: "bottom-full left-1/2 transform -translate-x-1/2 mb-2",
    right: "left-full top-1/2 transform -translate-y-1/2 ml-2",
    bottom: "top-full left-1/2 transform -translate-x-1/2 mt-2",
    left: "right-full top-1/2 transform -translate-y-1/2 mr-2",
  };

  if (disabled) {
    return <div ref={triggerRef}>{children}</div>;
  }

  return (
    <div
      ref={triggerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative inline-block"
    >
      {children}

      {isOpen && (
        <div
          ref={popoverRef}
          className={clsx(
            "absolute z-50 bg-white text-sm text-gray-700 shadow-md rounded-md p-3",
            popoverPositionClasses[position],
          )}
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default Popover;
