import React, { ButtonHTMLAttributes, forwardRef } from "react";
import { clsx } from "clsx";
import { Spinner } from "./spinner"; // optional loading spinner component

type Variant = "primary" | "secondary" | "danger" | "outline" | "ghost";
type Size = "xs" | "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "start" | "end";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = "primary",
      size = "md",
      loading = false,
      disabled,
      fullWidth = false,
      icon,
      iconPosition = "start",
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    const baseStyles =
      "inline-flex items-center justify-center rounded-2xl font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

    const variantClasses: Record<Variant, string> = {
      primary: "bg-primary text-white hover:bg-primary/90",
      secondary: "bg-secondary text-white hover:bg-secondary/90",
      danger: "bg-red-600 text-white hover:bg-red-500",
      outline: "border border-gray-300 text-gray-800 hover:bg-gray-100",
      ghost: "bg-transparent text-gray-800 hover:bg-gray-100",
    };

    const sizeClasses: Record<Size, string> = {
      xs: "px-2.5 py-1 text-xs",
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-sm",
      lg: "px-5 py-2.5 text-base",
    };

    const iconSpacing =
      icon && children ? (iconPosition === "start" ? "gap-2" : "gap-2 flex-row-reverse") : "";

    return (
      <button
        ref={ref}
        className={clsx(
          baseStyles,
          variantClasses[variant],
          sizeClasses[size],
          iconSpacing,
          fullWidth && "w-full",
          className
        )}
        disabled={isDisabled}
        {...props}
      >
        {loading ? (
          <Spinner size={size} />
        ) : (
          <>
            {icon}
            {children}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
