import { QueryClient, QueryClientProvider } from "react-query";
import { AppContextProvider } from "@/contexts/index";

interface IProps {
  children?: any;
}

export function Providers({ children }: IProps) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>{children}</AppContextProvider>
    </QueryClientProvider>
  );
}

export * from "./withProviders";
