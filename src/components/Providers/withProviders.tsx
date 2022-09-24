import { Providers } from "./index";

export function withProviders(fn: any) {
  return function withPage(page: any) {
    return <Providers>{fn(page)}</Providers>;
  };
}
