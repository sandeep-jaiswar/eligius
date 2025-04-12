import { clsx } from "clsx";

type InputProps = {
  /**
   * The current value of the input.
   */
  value: string;

  /**
   * The callback function when the value changes.
   */
  onChange: (value: string) => void;

  /**
   * The type of the input (e.g., text, password, email, etc.).
   */
  type?: string;

  /**
   * The placeholder text for the input.
   */
  placeholder?: string;

  /**
   * Whether the input is disabled or not.
   */
  disabled?: boolean;

  /**
   * Whether the input has an error state.
   */
  error?: boolean;

  /**
   * Optional class names for custom styling.
   */
  className?: string;

  /**
   * Additional attributes for the input element.
   */
  [key: string]: any;
};

const Input = ({
  value,
  onChange,
  type = "text",
  placeholder,
  disabled = false,
  error = false,
  className,
  ...props
}: InputProps) => {
  return (
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={clsx(
          "block w-full px-4 py-2 text-sm rounded-md border",
          {
            "border-gray-300": !error,
            "border-red-500": error,
            "bg-gray-100 cursor-not-allowed": disabled,
          },
          className
        )}
        {...props}
      />
      {error && (
        <div className="absolute text-xs text-red-500 mt-1">This field is required</div>
      )}
    </div>
  );
};

export default Input;
