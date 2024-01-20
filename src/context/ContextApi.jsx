import { createContext, useContext, useState } from 'react';

export const WeatherContext = createContext(""); 

const AppProvider = ({ children }) => {

    const [location, setLocation] = useState({
      loaded: false,
      coordinates: { lat: "", lon: "" },
    });
    return (
        <WeatherContext.Provider value={{ location, setLocation }}>
          {children}
        </WeatherContext.Provider>
      );
}
const useWeatherContext = () => {
    return useContext(WeatherContext);
  };
export { AppProvider, useWeatherContext}