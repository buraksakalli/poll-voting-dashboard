import { lazy } from "react";

export const lazyImport = (path: string) => {
  const component = lazy(async () => ({
    default: await import(path),
  }));
  return component;
};
