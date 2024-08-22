import React, { createContext, useState, useContext } from 'react';

interface ILocationContextType {
  location: {latitude: number,longitude: number} | null;
  setLocation: React.Dispatch<React.SetStateAction<{latitude: number,longitude: number} | null>>;
}

const LocationContext = createContext<ILocationContextType | undefined >(undefined);

export const useLocation = () =>{
  const context = useContext(LocationContext)
  if(!context ) {
    throw new Error('useLocation must be used with a LocationProvider')
  }
  return context;
};

export const LocationProvider=({children}:{children: React.ReactNode}) =>{
  const [location,setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  
  return (
    <LocationContext.Provider value={{location, setLocation}} >
        {children}
    </LocationContext.Provider>
  );
};


