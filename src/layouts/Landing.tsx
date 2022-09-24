import React from "react";

interface IProps {
  children: React.ReactNode;
}

export const LandingLayout: React.FC<IProps> = ({ children }) => {
  return <>{children}</>;
};
