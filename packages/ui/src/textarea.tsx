import { clsx } from "clsx";

type TextAreaProps = {
  /**
   * The value of the text area.
   */
  value: string;

  /**
   * Callback function to handle change in the text area.
   */
  onChange: (value: string) => void;

  /**
   * Placeholder text for the text area.
   */
  placeholder?: string;

  /**
   * Whether the text area is disabled.
   */
  disabled?: boolean;

  /**
   * Whether the text area is required.
   */
  required?: boolean;

  /**
   * Custom class names for styling.
   */
  className?: string;

  /**
   * Optional rows for the text area.
   */
  rows?: number;

  /**
   * Optional cols for the text area.
   */
  cols?: number;
};

const TextArea = ({
  value,
  onChange,
  placeholder = "",
  disabled = false,
  required = false,
  className,
  rows = 4,
  cols = 50,
}: TextAreaProps) => {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      required={required}
      rows={rows}
      cols={cols}
      className={clsx(
        "resize-none p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
        {
          "bg-gray-200": disabled,
          "bg-white": !disabled,
          "border-gray-300": !disabled,
          "border-gray-400": disabled,
          "focus:ring-gray-300": disabled,
        },
        className
      )}
    />
  );
};

export default TextArea;
