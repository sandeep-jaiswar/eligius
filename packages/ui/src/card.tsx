import { clsx } from "clsx";
import { forwardRef, ReactNode } from "react";

type CardVariant = "elevated" | "outlined" | "ghost" | "flat";
type CardPadding = "none" | "sm" | "md" | "lg";

type CardProps = {
  /**
   * Main title of the card.
   */
  title?: ReactNode;

  /**
   * Optional description shown below the title.
   */
  description?: ReactNode;

  /**
   * Main content of the card.
   */
  children: ReactNode;

  /**
   * Optional footer (e.g. actions or metadata).
   */
  footer?: ReactNode;

  /**
   * Visual variant of the card.
   * @default "elevated"
   */
  variant?: CardVariant;

  /**
   * Padding size inside the card.
   * @default "md"
   */
  padding?: CardPadding;

  /**
   * Optional custom class names.
   */
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const paddingMap: Record<CardPadding, string> = {
  none: "p-0",
  sm: "p-2",
  md: "p-4",
  lg: "p-6",
};

const variantMap: Record<CardVariant, string> = {
  elevated: "bg-white shadow-md border border-gray-200",
  outlined: "bg-white border border-gray-300",
  ghost: "bg-transparent border border-transparent",
  flat: "bg-gray-50 border border-gray-100",
};

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      title,
      description,
      children,
      footer,
      variant = "elevated",
      padding = "md",
      className,
      ...rest
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={clsx(
          "rounded-2xl transition-shadow duration-200",
          variantMap[variant],
          paddingMap[padding],
          className
        )}
        {...rest}
      >
        {(title || description) && (
          <div className="mb-3 space-y-1">
            {title && (
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            )}
            {description && (
              <p className="text-sm text-gray-500">{description}</p>
            )}
          </div>
        )}
        <div>{children}</div>
        {footer && (
          <div className="mt-4 pt-3 border-t border-gray-100">{footer}</div>
        )}
      </div>
    );
  }
);

Card.displayName = "Card";
export default Card;
