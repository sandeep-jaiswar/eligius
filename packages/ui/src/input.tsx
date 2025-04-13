import { clsx } from "clsx";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * The current value of the input.
   */
  value: string;

  /**
   * The callback function when the value changes.
   */
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

  /**
   * The type of the input (e.g., text, password, email, etc.).
   */
  type?: "text" | "password" | "email" | "tel" | "number" | "url";

  /**
   * The placeholder text for the input.
   */
  placeholder?: string;

  /**
   * Whether the input is disabled or not.
   */
  disabled?: boolean;

  /**
   * Whether the input has an error state or error message.
   */
  error?: boolean | string;

  /**
   * Optional class names for custom styling.
   */
  className?: string;
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
  const errorMessage = typeof error === "string" ? error : "This field is required";

  return (
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder || ""}
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
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? "input-error" : undefined}
        {...props}
      />
      {error && (
        <div
          id="input-error"
          className="absolute text-xs text-red-500 mt-1"
        >
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default Input;
