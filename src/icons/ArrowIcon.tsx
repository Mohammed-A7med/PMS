import { IconProps } from "./IconInterface/IconPropsInterface";

interface DirectionalIconProps extends IconProps {
  rotate?: number; // degrees (0, 90, 180, 270)
}

const ArrowIcon: React.FC<DirectionalIconProps> = ({
  size = 18,
  color = "currentColor",
  className = "",
  rotate = 0,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 320 512"
      width={size}
      height={size}
      fill={color}
      className={className}
      style={{
        transform: `rotate(${rotate}deg)`,
        transition: "transform 0.2s ease", 
      }}
      role="img"
      aria-label="Arrow icon"
    >
      <path d="M311.1 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L243.2 256 73.9 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
    </svg>
  );
};

export default ArrowIcon;