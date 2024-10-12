import { CombinationResult } from "@/models/CombinationResult";
import React, { createContext, ReactNode, useState } from "react";

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
  inputItemList: Array<any>;
  setInputItemList: any;
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export { AppContextProvider };
