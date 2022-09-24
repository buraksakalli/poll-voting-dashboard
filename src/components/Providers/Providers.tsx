import { AppContextProvider } from "@/contexts/index";

interface IProps {
  children?: any;
}

export function Providers({ children }: IProps) {
  return <AppContextProvider>{children}</AppContextProvider>;
}

export * from "./withProviders";
