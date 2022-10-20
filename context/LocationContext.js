import { createContext, useState } from "react";

const LocationContext = createContext();

export function LocationProvider({ children }) {
  const [residents, setResidents] = useState([]);

  const changeLocation = (residents) => {
    setResidents(residents);
  };

  return (
    <LocationContext.Provider value={{ residents, changeLocation }}>
      {children}
    </LocationContext.Provider>
  );
}

export default LocationContext;
