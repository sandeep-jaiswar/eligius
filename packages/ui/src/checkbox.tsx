import { clsx } from "clsx";

type CheckboxProps = {
  /**
   * Whether the checkbox is checked or not.
   */
  checked: boolean;

  /**
   * The callback function when the checkbox value changes.
   */
  onChange: (checked: boolean) => void;

  /**
   * Label for the checkbox, to describe what the checkbox is for.
   */
  label: string;

  /**
   * Custom class names for the checkbox and label.
   */
  className?: string;
};

const Checkbox = ({ checked, onChange, label, className }: CheckboxProps) => {
  return (
    <div className={clsx("flex items-center space-x-2", className)}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
      />
      <label className="text-sm text-gray-700">{label}</label>
    </div>
  );
};

export default Checkbox;
