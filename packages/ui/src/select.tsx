import { clsx } from "clsx";

type Option = {
  value: string;
  label: string;
};

type SelectProps = {
  /**
   * The current value of the select input.
   */
  value: string;

  /**
   * The callback function when the value changes.
   */
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;

  /**
   * The options for the select input.
   */
  options: Option[];

  /**
   * The placeholder text for the select input.
   */
  placeholder?: string;

  /**
   * Whether the select input is disabled.
   */
  disabled?: boolean;

  /**
   * Whether the select input has an error state or error message.
   */
  error?: boolean | string;

  /**
   * Optional class names for custom styling.
   */
  className?: string;
};

const Select = ({
  value,
  onChange,
  options,
  placeholder,
  disabled = false,
  error = false,
  className,
  ...props
}: SelectProps) => {
  const errorMessage =
    typeof error === "string" ? error : "This field is required";

  return (
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={clsx(
          "block w-full px-4 py-2 text-sm rounded-md border",
          {
            "border-gray-300": !error,
            "border-red-500": error,
            "bg-gray-100 cursor-not-allowed": disabled,
          },
          className,
        )}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? "select-error" : undefined}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <div id="select-error" className="absolute text-xs text-red-500 mt-1">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default Select;
