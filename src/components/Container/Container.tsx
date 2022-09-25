import classNames from "classnames";
import React from "react";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({ children, ...props }) => {
  return (
    <div
      className={classNames(
        "container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        props.className
      )}
    >
      {children}
    </div>
  );
};
