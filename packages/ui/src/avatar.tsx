import { clsx } from "clsx";

type AvatarProps = {
  /**
   * The image URL to display in the avatar. If not provided, the avatar will display initials.
   */
  src?: string;

  /**
   * The alt text for the image.
   */
  alt?: string;

  /**
   * The initials to display if no image is provided.
   */
  initials?: string;

  /**
   * The size of the avatar. 
   * Options: "sm", "md", "lg", "xl"
   */
  size?: "sm" | "md" | "lg" | "xl";

  /**
   * Optional border color for the avatar.
   */
  borderColor?: string;

  /**
   * Optional className for additional styling.
   */
  className?: string;

  /**
   * Optional background color for when no image is provided (default: gray).
   */
  bgColor?: string;

  /**
   * Optional text color for initials (default: white).
   */
  textColor?: string;
};

const Avatar = ({
  src,
  alt,
  initials,
  size = "md",
  borderColor = "border-gray-200",
  className,
  bgColor = "bg-gray-500",
  textColor = "text-white",
}: AvatarProps) => {
  const sizeClasses = {
    sm: "w-8 h-8 text-sm",
    md: "w-12 h-12 text-base",
    lg: "w-16 h-16 text-lg",
    xl: "w-20 h-20 text-xl",
  };

  const avatarSize = sizeClasses[size];

  return (
    <div
      className={clsx(
        "inline-flex items-center justify-center rounded-full overflow-hidden",
        avatarSize,
        borderColor,
        "border-2", // Adds a border around the avatar
        bgColor,
        className
      )}
    >
      {src ? (
        <img 
          src={src} 
          alt={alt} 
          className="object-cover w-full h-full" 
          onError={(e) => {
            e.currentTarget.style.display = 'none';
            // Force re-render to show initials
            e.currentTarget.parentElement?.classList.add('image-error');
          }} 
        />
      ) : (
        <span className={clsx("flex items-center justify-center w-full h-full", textColor)}>
          {initials || '?'}
        </span>
      )}
    </div>
  );
};

export default Avatar;
