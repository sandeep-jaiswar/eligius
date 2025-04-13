import React from "react";
import { clsx } from "clsx";

type IconButtonProps = {
  /**
   * The icon to be rendered inside the button.
   * You can pass any icon component here, e.g., from react-icons.
   */
  icon: React.ReactNode;

  /**
   * Optional label that will appear when hovering over the button.
   */
  ariaLabel: string;

  /**
   * Optional className for custom styling.
   */
  className?: string;

  /**
   * Controls the size of the button.
   * Default size is `w-10 h-10`, and you can adjust it using Tailwind CSS classes.
   */
  size?: string;

  /**
   * Color customization for the button's icon.
   * You can use any Tailwind color class (e.g., "text-gray-500").
   */
  color?: string;

  /**
   * If true, the button will be disabled.
   */
  disabled?: boolean;

  /**
   * Handles the button's click event.
   */
  onClick?: () => void;
};

const IconButton = ({
  icon,
  ariaLabel,
  className,
  size = "w-10 h-10",
  color = "text-gray-500",
  disabled = false,
  onClick,
}: IconButtonProps) => {
  return (
    <button
      className={clsx(
        "flex items-center justify-center rounded-full bg-transparent hover:bg-gray-200 focus:outline-none disabled:opacity-50 transition-all",
        size,
        color,
        className,
      )}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onClick}
    >
      {icon}
    </button>
  );
};

export default IconButton;
