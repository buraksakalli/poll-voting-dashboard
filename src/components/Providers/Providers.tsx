import { QueryClient, QueryClientProvider } from "react-query";
import { AppContextProvider } from "@/contexts/index";
import { ToastContainer } from "react-toastify";

interface IProps {
  children?: any;
}

export function Providers({ children }: IProps) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>{children}</AppContextProvider>
      <ToastContainer />
    </QueryClientProvider>
  );
}

export * from "./withProviders";
