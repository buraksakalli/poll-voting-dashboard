import React from "react";

export interface IconProps extends React.SVGAttributes<SVGElement> {
  name?: IconNameType;
  width?: number;
  height?: number;
  strokeWidth?: number;
  stroke?: string;
  fill?: string;
  rotatecenter?: number;
}

export const MenuIcon: React.FC<IconProps> = ({ ...props }) => {
  return (
    <svg
      className="w-6 h-6"
      aria-hidden="true"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fill-rule="evenodd"
        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
        clip-rule="evenodd"
      ></path>
    </svg>
  );
};

export const LineIcon: React.FC<IconProps> = ({ ...props }) => {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 418 42"
      preserveAspectRatio="none"
      {...props}
    >
      <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z"></path>
    </svg>
  );
};

export const Arrow: React.FC<IconProps> = ({ ...props }) => {
  return (
    <svg
      width="14"
      height="18"
      viewBox="0 0 14 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7 17V1M7 1L1 7M7 1L13 7"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
export const iconMapper = {
  MenuIcon,
  LineIcon,
  Arrow,
};

export type IconNameType = keyof typeof iconMapper;

export const Icon = ({
  name = "MenuIcon",
  stroke = "transparent",
  ...props
}: IconProps) => {
  const icon = iconMapper[name];

  if (typeof icon !== "undefined")
    return React.createElement(icon, { stroke, ...props }, null);
  return React.createElement(iconMapper["MenuIcon"], { ...props }, null);
};
