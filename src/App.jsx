import { useEffect, useState } from "react";
import "./App.css";
import DailyTempCard from "./components/DailyTempCard";
import MainChart from "./components/MainChart";
import TimeChart from "./components/TimeChart";
import SearchBar from "./components/SearchBar";
import { useWeatherContext } from "./context/ContextApi";
import Loader from "./components/Loader";

function App() {
  const { location, setLocation } = useWeatherContext();
  const [isLoading, setIsLoading] = useState(true);
  const [weather, setWeather] = useState(null);
  const API = import.meta.env.VITE_API_KEY;

  const onSuccess = (location) => {
    setLocation({
      loaded: true,
      coordinates: {
        lat: location.coords.latitude,
        lon: location.coords.longitude,
      },
    });
  };

  const onError = (error) => {
    setLocation({
      loaded: true,
      error,
    });
  };

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      onError({
        code: 0,
        message: "Geolocation not supported",
      });
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);

  useEffect(() => {
    if (location.coordinates.lat) {
      setIsLoading(true);
      fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${location.coordinates.lat}&lon=${location.coordinates.lon}&units=metric&exclude=minutely,alerts&appid=${API}`
      )
        .then((res) => res.json())
        .then((data) => {
          setWeather(data);
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err);
        });
    }
  }, [location.coordinates.lat]); // this will call whenever latitude updates

  function currentTemp() {
    let value = weather?.current?.temp;
    value = String(value);
    return value.length <= 4
      ? value.split("").slice(0, 1).join("")
      : value.split("").slice(0, 2).join("");
  }

  function sunTiming(value) {
    const tz = "Asia/Kolkata";
    // Timestamp
    const timestamp = value;
    // Create Date object
    const date = new Date(timestamp * 1000);
    // Options
    const option = {
      timeZone: tz,
      hour12: true,
      hour: "numeric",
      minute: "numeric",
      ampm: "AM/PM",
    };
    // Convert to India time
    const indiaTime = date.toLocaleString("en-US", option);
    return indiaTime;
  }

  return (
    <>
      <div className="">
        <SearchBar />
      
      </div>
      {isLoading ? (
        <div className="h-[70vh] w-full flex items-center justify-center"><Loader/></div>
      ) : (
        <div>
          <div className="flex overflow-x-scroll font-size[0.95rem] mb-6 whitespace-nowrap">
            {weather?.daily?.map((data, index) => (
              <DailyTempCard weather={data} key={index} />
            ))}
          </div>
          <div
            className="p-3 flex flex-col rounded-lg"
            style={{ boxShadow: "0 2px 8px 0 rgba(99,99,99,0.2)" }}
          >
            <div className="flex items-center">
              {weather && (
                <h1 className="font-bold text-6xl ">{currentTemp()} °C</h1>
              )}
              <img
                src={`https://openweathermap.org/img/wn/${weather?weather.current.weather[0].icon:'04d'}@2x.png`}
                alt=""
              />
            </div>
            <MainChart weather={weather} />
            <div className="flex w-full gap-5">
              <div className="flex flex-col justify-start rounded flex-1 p-2 bg-blue-100 ">
                <span className="text-left font-bold">Pressure</span>
                <span className="text-left">
                  {weather && weather.current.pressure} hpa
                </span>
              </div>
              <div className=" flex flex-col flex-1 rounded bg-blue-100 p-2">
                <span className="text-left font-bold">Humidity</span>
                <span className="text-left">
                  {weather && weather.current.humidity}%
                </span>
              </div>
            </div>
            <div className="flex w-full gap-5">
              <div className="flex flex-col justify-start rounded flex-1 p-3 ">
                <span className="text-left font-bold">Sunrise</span>
                <span className="text-left">
                  {weather && sunTiming(weather.current.sunrise)}
                </span>
              </div>
              <div className=" flex flex-col flex-1 rounded  p-3">
                <span className="text-right font-bold">Sunset</span>
                <span className="text-right">
                  {weather && sunTiming(weather.current.sunset)}
                </span>
              </div>
            </div>
            {/* <TimeChart/> */}
            <div className="w-full h-44 border-b-4 border-black flex items-center justify-center font-bold">
              Chart
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
