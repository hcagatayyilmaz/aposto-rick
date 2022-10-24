import { createContext, useState } from "react";

const LocationContext = createContext();

export function LocationProvider({ children }) {
  return (
    <LocationContext.Provider value={{ location: "test" }}>
      {children}
    </LocationContext.Provider>
  );
}

export default LocationContext;
