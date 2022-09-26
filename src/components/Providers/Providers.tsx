import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import NextNProgress from "nextjs-progressbar";
import { AppContextProvider } from "@/contexts/index";

interface IProps {
  children?: any;
}

export function Providers({ children }: IProps) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>{children}</AppContextProvider>
      <ToastContainer />
      <NextNProgress color="#fa4a25" />
    </QueryClientProvider>
  );
}

export * from "./withProviders";
