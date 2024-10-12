import { CombinationResult } from "@/models/CombinationResult";
import React, { createContext, ReactNode, useState } from "react";
import { MarketItem } from "./models/MarketItem";

interface IAppContext {
  activeRoute: number;
  setActiveRoute: any;
  isCombinationLoading: boolean;
  setIsCombinationLoading: any;
  combinationResultData: Array<CombinationResult>;
  setCombinationResultData: any;
  inventoryList: Array<any>;
  setInventoryList: any;
  inventoryFilter: string;
  setInventoryFilter: any;
  inputItemList: Array<MarketItem>;
  setInputItemList: any;
  session: number;
  setSession: any;
  inputTarget: number;
  setInputTarget: any;
  inputNoc: number;
  setInputNoc: any;
  inputMin: number;
  setInputMin: any;
  inputMax: number;
  setInputMax: any;
  inputTimeout: number;
  setInputTimeout: any;
}

const AppContext = createContext<IAppContext | null>(null);
export default AppContext;

interface AppContextProviderProps {
  children: ReactNode;
}

function AppContextProvider({ children }: AppContextProviderProps) {
  const [activeRoute, setActiveRoute] = useState(0);
  const [isCombinationLoading, setIsCombinationLoading] = useState(false);
  const [combinationResultData, setCombinationResultData] = React.useState<
    Array<CombinationResult>
  >([]);
  const [inventoryList, setInventoryList] = useState([]);
  const [inventoryFilter, setInventoryFilter] = useState("");
  const [inputItemList, setInputItemList] = useState([]);
  const [session, setSession] = React.useState(0);
  const [inputTarget, setInputTarget] = React.useState(0.6666666);
  const [inputNoc, setInputNoc] = React.useState(4);
  const [inputMin, setInputMin] = React.useState(0.06);
  const [inputMax, setInputMax] = React.useState(0.8);
  const [inputTimeout, setInputTimeout] = React.useState(30);
  return (
    <AppContext.Provider
      value={{
        activeRoute,
        setActiveRoute,
        isCombinationLoading,
        setIsCombinationLoading,
        combinationResultData,
        setCombinationResultData,
        inventoryList,
        setInventoryList,
        inventoryFilter,
        setInventoryFilter,
        inputItemList,
        setInputItemList,
        session,
        setSession,
        inputTarget,
        setInputTarget,
        inputNoc,
        setInputNoc,
        inputMin,
        setInputMin,
        inputMax,
        setInputMax,
        inputTimeout,
        setInputTimeout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export { AppContextProvider };
