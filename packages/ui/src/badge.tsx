import { clsx } from "clsx";

type BadgeProps = {
  /**
   * The text to display inside the badge.
   */
  children: React.ReactNode;

  /**
   * The color variant of the badge.
   * Options: "primary", "secondary", "success", "warning", "error", "info"
   */
  variant?: "primary" | "secondary" | "success" | "warning" | "error" | "info";

  /**
   * The size of the badge.
   * Options: "sm", "md", "lg"
   */
  size?: "sm" | "md" | "lg";

  /**
   * Optional className for additional styling.
   */
  className?: string;

  /**
   * Optional rounded corners for the badge (default: true).
   */
  rounded?: boolean;
};

const Badge = ({
  children,
  variant = "primary",
  size = "md",
  className,
  rounded = true,
}: BadgeProps) => {
  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base",
  };

  const variantClasses = {
    primary: "bg-blue-500 text-white",
    secondary: "bg-gray-500 text-white",
    success: "bg-green-500 text-white",
    warning: "bg-yellow-500 text-black",
    error: "bg-red-500 text-white",
    info: "bg-teal-500 text-white",
  };

  const badgeSize = sizeClasses[size];
  const badgeVariant = variantClasses[variant];

  return (
    <span
      className={clsx(
        "inline-flex items-center justify-center font-medium rounded-full",
        badgeSize,
        badgeVariant,
        {
          "rounded-full": rounded,
          "rounded-lg": !rounded, // Optionally support square corners
        },
        className
      )}
    >
      {children}
    </span>
  );
};

export default Badge;
