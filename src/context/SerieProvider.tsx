import React, { createContext } from "react";
import { SerieResponse } from "../types/serie";

export const SerieContext = createContext({});

export const SerieProvider = ({ children }: any) => {
  const [seriesSearch, setSeriesSearch] = React.useState<SerieResponse[]>([]);
  return (
    <SerieContext.Provider value={{ seriesSearch, setSeriesSearch }}>
      {children}
    </SerieContext.Provider>
  );
};
