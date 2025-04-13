import { useState, useEffect, useCallback } from "react";

type SnackbarProps = {
  /**
   * The message to display in the snackbar.
   */
  message: string;

  /**
   * Duration for which the snackbar is visible in milliseconds.
   */
  duration?: number;

  /**
   * Callback function to trigger after the snackbar disappears.
   */
  onClose?: () => void;

  /**
   * Optionally add an action button to the snackbar.
   */
  action?: {
    label: string;
    onClick: () => void;
  };
};

const Snackbar = ({
  message,
  duration = 3000,
  onClose,
  action,
}: SnackbarProps) => {
  const [isVisible, setIsVisible] = useState(false);

  // Automatically hide snackbar after the duration
  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  const handleActionClick = useCallback(() => {
    if (action?.onClick) action.onClick();
    setIsVisible(false);
    if (onClose) onClose();
  }, [action, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-sm p-4 bg-blue-500 text-white rounded-md shadow-lg">
      <div className="flex justify-between items-center">
        <div className="flex-1">
          <span>{message}</span>
        </div>
        {action && (
          <button
            onClick={handleActionClick}
            className="ml-4 px-3 py-1 bg-white text-blue-500 rounded-md"
          >
            {action.label}
          </button>
        )}
      </div>
    </div>
  );
};

export default Snackbar;
