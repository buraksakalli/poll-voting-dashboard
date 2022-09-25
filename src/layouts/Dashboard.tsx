import React from "react";
import { DashboardHeader } from "../containers";

interface IProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<IProps> = ({ children }) => {
  return (
    <>
      <DashboardHeader />
      {children}
    </>
  );
};
