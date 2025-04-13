import React from "react";
import { clsx } from "clsx";

type TypographyProps = {
  /**
   * The text content that will be rendered.
   */
  children: React.ReactNode;

  /**
   * Defines the type of typography element (e.g., h1, h2, p, span, etc.)
   */
  variant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "section" | "aside" | "footer" | "header" | "article" | "nav" | "main";

  /**
   * Optional className for additional styling.
   */
  className?: string;

  /**
   * Optional color for text.
   * Example: "text-gray-800", "text-blue-500"
   */
  color?: string;

  /**
   * Optional font weight (default: "font-normal").
   */
  fontWeight?: "font-light" | "font-normal" | "font-semibold" | "font-bold";

  /**
   * Optional font size (default: "text-base").
   */
  fontSize?: "text-xs" | "text-sm" | "text-base" | "text-lg" | "text-xl" | "text-2xl";
};

const Typography = ({
  variant,
  children,
  className,
  color = "text-black",
  fontWeight = "font-normal",
  fontSize = "text-base",
}: TypographyProps) => {
  const Tag = variant;

  return (
    <Tag
      className={clsx(
        color,
        fontWeight,
        fontSize,
        "leading-relaxed",
        className
      )}
    >
      {children}
    </Tag>
  );
};

export default Typography;
