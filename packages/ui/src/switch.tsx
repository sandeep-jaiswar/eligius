import { clsx } from "clsx";

type SwitchProps = {
  /**
   * The current checked state of the switch.
   */
  checked: boolean;

  /**
   * The callback function when the switch state changes.
   */
  onChange: (checked: boolean) => void;

  /**
   * Whether the switch is disabled.
   */
  disabled?: boolean;

  /**
   * Optional class names for custom styling.
   */
  className?: string;

  /**
   * Optional label text to describe the switch.
   */
  label?: string;
};

const Switch = ({
  checked,
  onChange,
  disabled = false,
  className,
  label,
}: SwitchProps) => {
  return (
    <div className={clsx("flex items-center space-x-2", className)}>
      {label && <label className="text-sm">{label}</label>}
      <button
        type="button"
        onClick={() => onChange(!checked)}
        disabled={disabled}
        className={clsx(
          "relative inline-flex items-center cursor-pointer w-12 h-6 rounded-full transition-colors",
          {
            "bg-gray-400": !checked,
            "bg-blue-500": checked,
            "cursor-not-allowed opacity-50": disabled,
          },
        )}
      >
        <span
          className={clsx(
            "inline-block w-4 h-4 bg-white rounded-full transition-transform transform",
            {
              "translate-x-6": checked,
              "translate-x-1": !checked,
            },
          )}
        />
      </button>
    </div>
  );
};

export default Switch;
