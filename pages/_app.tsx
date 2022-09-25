import type { ReactElement, ReactNode } from "react";
import type { AppProps } from "next/app";
import type { NextPage } from "next";
import { LandingLayout } from "@/layouts/index";
import { Providers } from "@/components/index";
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout ??
    ((page) => (
      <Providers>
        <LandingLayout>{page}</LandingLayout>
      </Providers>
    ));

  return getLayout(<Component {...pageProps} />);
}
