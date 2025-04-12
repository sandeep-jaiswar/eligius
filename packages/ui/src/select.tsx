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
  onChange: (value: string) => void;

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
   * Whether the select input has an error state.
   */
  error?: boolean;

  /**
   * Optional class names for custom styling.
   */
  className?: string;

  /**
   * Additional attributes for the select element.
   */
  [key: string]: any;
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
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
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
        <div className="absolute text-xs text-red-500 mt-1">This field is required</div>
      )}
    </div>
  );
};

export default Select;
