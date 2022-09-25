import classNames from "classnames";

type ButtonStyle = keyof typeof style;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonStyle;
}

const style = {
  primary: "bg-primary active:bg-primary-900 hover:bg-primary-600 text-white",
  default: "active:bg-gray-100 hover:bg-gray-50 text-inverted",
  filter: "text-primary bg-secondary",
  disabled: "bg-gray-100 text-gray-300",
  danger: "bg-red-500 active:bg-red-900 hover:bg-red-600 text-base-500",
  loading: "bg-gray-100 text-gray-300",
};

export const Button: React.FC<ButtonProps> = ({ className, ...props }) => {
  return (
    <button
      className={classNames(
        `${
          style[props.disabled ? "disabled" : props.variant ?? "default"]
        } group flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all duration-300 active:scale-95 active:shadow-sm`,
        className
      )}
      {...props}
    >
      {props.children}
    </button>
  );
};
