import { createContext } from "react";

export interface IAppContext {
  isAuth: boolean;
  setIsAuth: (_isAuth: boolean) => void;
}

export const appContext = createContext<IAppContext | null>(null);
