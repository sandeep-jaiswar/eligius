import { clsx } from "clsx";

type AlertType = "success" | "error" | "info" | "warning";

type AlertProps = {
  /**
   * The type of the alert, which defines the style.
   */
  type: AlertType;

  /**
   * The message to be displayed inside the alert.
   */
  message: string;

  /**
   * A callback function for an optional action button.
   */
  onAction?: () => void;

  /**
   * The label for the action button (optional).
   */
  actionLabel?: string;

  /**
   * Whether the alert should be dismissible.
   */
  dismissible?: boolean;

  /**
   * A callback function for dismissing the alert.
   */
  onDismiss?: () => void;
};

const Alert = ({
  type,
  message,
  onAction,
  actionLabel,
  dismissible = true,
  onDismiss,
}: AlertProps) => {
  const alertTypeStyles = {
    success: "bg-green-100 text-green-800",
    error: "bg-red-100 text-red-800",
    info: "bg-blue-100 text-blue-800",
    warning: "bg-yellow-100 text-yellow-800",
  };

  return (
    <div
      className={clsx(
        "flex items-start p-4 rounded-lg shadow-md",
        alertTypeStyles[type],
      )}
    >
      <div className="flex-grow">
        <p>{message}</p>
        {onAction && actionLabel && (
          <button
            onClick={onAction}
            className="mt-2 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-200 rounded"
          >
            {actionLabel}
          </button>
        )}
      </div>
      {dismissible && onDismiss && (
        <button
          onClick={onDismiss}
          className="ml-4 text-gray-600 hover:text-gray-800 focus:outline-none"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      )}
    </div>
  );
};

export default Alert;
