import { type ReactNode } from "react";
import { clsx } from "clsx";

export type CardVariant = "default" | "outline" | "filled" | "elevated";
export type CardSize = "sm" | "md" | "lg";

export interface CardProps {
  /**
   * The title of the card
   */
  title: string;
  /**
   * The content of the card
   */
  children: ReactNode;
  /**
   * The URL the card links to
   */
  href: string;
  /**
   * The variant of the card
   * @default "default"
   */
  variant?: CardVariant;
  /**
   * The size of the card
   * @default "md"
   */
  size?: CardSize;
  /**
   * Whether the card is disabled
   * @default false
   */
  disabled?: boolean;
  /**
   * Additional class names to apply to the card
   */
  className?: string;
}

const cardVariants = {
  default:
    "ui-border-transparent hover:ui-border-neutral-700 hover:ui-bg-neutral-800/30",
  outline: "ui-border-neutral-700 hover:ui-bg-neutral-800/30",
  filled: "ui-bg-neutral-800/30 hover:ui-bg-neutral-800/50",
  elevated: "ui-shadow-md hover:ui-shadow-lg ui-border-transparent",
};

const cardSizes = {
  sm: "ui-px-4 ui-py-3",
  md: "ui-px-5 ui-py-4",
  lg: "ui-px-6 ui-py-5",
};

export function Card({
  title,
  children,
  href,
  variant = "default",
  size = "md",
  disabled = false,
  className,
}: CardProps) {
  const cardClasses = clsx(
    // Base styles
    "ui-group ui-rounded-lg ui-border ui-transition-colors",
    // Variant styles
    cardVariants[variant],
    // Size styles
    cardSizes[size],
    // Disabled state
    disabled && "ui-opacity-50 ui-cursor-not-allowed",
    // Custom classes
    className
  );

  const titleClasses = clsx("ui-mb-3 ui-font-semibold", {
    "ui-text-xl": size === "sm",
    "ui-text-2xl": size === "md",
    "ui-text-3xl": size === "lg",
  });

  const contentClasses = clsx("ui-m-0 ui-text-sm ui-opacity-50", {
    "ui-max-w-[25ch]": size === "sm",
    "ui-max-w-[30ch]": size === "md",
    "ui-max-w-[35ch]": size === "lg",
  });

  return (
    <a
      className={cardClasses}
      href={disabled ? undefined : href}
      rel="noopener noreferrer"
      target="_blank"
      aria-disabled={disabled}
    >
      <h2 className={titleClasses}>
        {title}
        <span className="ui-inline-block ui-transition-transform group-hover:ui-translate-x-1 motion-reduce:ui-transform-none">
          -&gt;
        </span>
      </h2>
      <p className={contentClasses}>{children}</p>
    </a>
  );
}
