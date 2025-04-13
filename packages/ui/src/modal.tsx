import React, { useEffect } from "react";
import { clsx } from "clsx";

type ModalSize = "small" | "medium" | "large";

type ModalProps = {
  /**
   * Whether the modal is visible or not.
   */
  isOpen: boolean;

  /**
   * A function to close the modal.
   */
  onClose: () => void;

  /**
   * The title of the modal (optional).
   */
  title?: string;

  /**
   * The content to be displayed inside the modal.
   */
  children: React.ReactNode;

  /**
   * The size of the modal. Default is 'medium'.
   */
  size?: ModalSize;

  /**
   * A callback function for an optional action button.
   */
  onAction?: () => void;

  /**
   * The label for the action button (optional).
   */
  actionLabel?: string;
};

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = "medium",
  onAction,
  actionLabel,
}: ModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Prevent background scrolling when modal is open
    } else {
      document.body.style.overflow = "auto"; // Re-enable scrolling when modal is closed
    }
    return () => {
      document.body.style.overflow = "auto"; // Cleanup on unmount
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const modalSizeStyles = {
    small: "max-w-sm",
    medium: "max-w-2xl",
    large: "max-w-4xl",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className={clsx(
          "bg-white rounded-lg shadow-lg p-6",
          modalSizeStyles[size],
        )}
      >
        {/* Modal Header */}
        {title && (
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-800 focus:outline-none"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        )}
        {/* Modal Body */}
        <div className="mb-4">{children}</div>
        {/* Modal Footer */}
        <div className="flex justify-end space-x-4">
          {onAction && actionLabel && (
            <button
              onClick={onAction}
              className="px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-200 rounded"
            >
              {actionLabel}
            </button>
          )}
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
