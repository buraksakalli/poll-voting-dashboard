import React, { createContext, useReducer } from "react";

export interface IAppState {}

export const initialAppState: IAppState = {};

export enum AppContextActionTypeEnum {}

export interface IAppContextAction {
  type: AppContextActionTypeEnum;
  value?: any;
}

const reducer = (state: IAppState, action: IAppContextAction) => {
  switch (action.type) {
    default:
      return state;
  }
};

export const AppContext = createContext<IAppState>(initialAppState);
export const AppContextDispatcher = createContext<
  React.Dispatch<IAppContextAction>
>(() => {});

export const AppContextProvider = (props: any) => {
  // @ts-ignore
  const [state, dispatch] = useReducer(reducer, initialAppState);

  return (
    <AppContext.Provider value={state}>
      <AppContextDispatcher.Provider value={dispatch}>
        {props.children}
      </AppContextDispatcher.Provider>
    </AppContext.Provider>
  );
};
