import React from "react";
import { clsx } from "clsx";

type Orientation = "horizontal" | "vertical";
type Align = "start" | "center" | "end";

interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Defines the orientation of the divider.
   * - "horizontal" (default): Divider runs horizontally.
   * - "vertical": Divider runs vertically.
   */
  orientation?: Orientation;

  /**
   * Aligns the text/content in relation to the divider line.
   * - "start": Aligns content to the left (or top in vertical mode).
   * - "center" (default): Aligns content to the center.
   * - "end": Aligns content to the right (or bottom in vertical mode).
   */
  align?: Align;

  /**
   * Controls the thickness of the divider line.
   * Default values: 
   * - Horizontal: `h-px`
   * - Vertical: `w-px`
   * You can override it with Tailwind CSS size classes (e.g., `"h-1"`, `"w-2"`).
   */
  thickness?: string;

  /**
   * Allows you to customize the color of the divider line.
   * You can use any Tailwind CSS color class (e.g., "primary", "gray-300").
   */
  color?: string;

  /**
   * Text or content that will be displayed between the two lines of the divider.
   * The content will be rotated in vertical mode.
   */
  children?: React.ReactNode;

  /**
   * Optional custom class name for additional styling.
   * This will be added to the root div container.
   */
  className?: string;
}

const Divider = ({
  orientation = "horizontal",
  align = "center",
  thickness,
  color,
  children,
  className,
  ...props
}: DividerProps) => {
  const isVertical = orientation === "vertical";

  const baseStyles = clsx(
    "flex",
    isVertical ? "flex-col items-center" : "items-center",
    className
  );

  const lineClass = clsx(
    "bg-border",
    thickness ?? (isVertical ? "w-px" : "h-px"),
    color && `bg-${color}`,
    isVertical ? "h-full" : "w-full",
    !children && (isVertical ? "w-px" : "h-px"),
  );

  const contentAlignClass = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
  };

  return (
    <div className={clsx(baseStyles, contentAlignClass[align])} {...props}>
      <div className={lineClass} />
      {children && (
        <span
          className={clsx(
            "mx-2 text-sm text-muted-foreground whitespace-nowrap",
            isVertical && "rotate-90 my-2"
          )}
        >
          {children}
        </span>
      )}
      <div className={lineClass} />
    </div>
  );
};

export default Divider;
