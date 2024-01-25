import React, { useContext, useEffect, useState } from "react";
import mapIcon from "../assets/location.png";
import search from "../assets/search.png";
import cities from "../assets/cities";
import { useWeatherContext } from "../context/ContextApi";
const API = import.meta.env.VITE_API_KEY;

function SearchBar() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState("");
  const [data, setData] = useState([]);
  const [isDisplay, setIsDisplay] = useState(false);
  const { location, setLocation } = useWeatherContext();

  useEffect(() => {
    const fetchData = async () => {
      const arr = cities.cities;

      const promises = arr.map(async (location) => {
        const result = await mainCity(location.city);
        return {
          ...location,
          icon: `https://openweathermap.org/img/wn/${result.weather[0].icon}.png`,
          temp: result.main.temp,
          climate: result.weather[0].main,
          state: location.state,
        };
      });

      const locations = await Promise.all(promises);
      setData(locations);
    };

    fetchData();
  }, []);

  async function mainCity(location) {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API}&exclude=minutely`
    );
    const result = await res.json();
    return result;
  }

  const fetchData = (value) => {
    const result = data.filter((location) => {
      return (
        value &&
        location &&
        location.city &&
        location.city.toLowerCase().includes(value)
      );
    });

    setResults(result);
  };
  const handleChange = async (value, latitude, longitude) => {
    // const value = target.split(' ').slice(0,1).join('')
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${value}&units=metric&appid=4c7cd73b5685fa61f45cce111006dcde&exclude=minutely`
      ).then(res=>res.json())
        .then((res) =>
        { 
        const latitiude = res.coord.lat;
        const longitiude = res.coord.lon;
console.log(latitiude,longitiude,'latitiude,longitiude')
        setLocation({
            loaded: true,
            coordinates: {
              lat: latitiude,
              lon: longitiude,
            },
          })}
        )
        .catch((err) => console.log(err));

  
      setIsDisplay(true);
      fetchData(value);
      setInput(value);
   
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="searchbar relative  flex flex-col gap-4">
      <div
        className=" w-full h-16 rounded-xl border z-20  overflow-hidden px-4 bg-white flex items-center text-gray-900 focus:outline-none focus:border-sky-500 focus:ring-sky-500  sm:text-sm focus:ring-1 "
        style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}
      >
        <img src={mapIcon} className="w-6 h-6 md:w-8 md:h-8 mr-2" alt="" />
        <input
          className=" bg-transparent border-none h-full text-xl w-full ml-1 outline-none"
          placeholder="Type to search..."
          value={input}
          onChange={(e) => handleChange(e.target.value)}
        />
        <img src={search} className="w-6 h-6 md:w-8 md:h-8 mr-2" alt="" />
      </div>

      {isDisplay && results && results.length > 0 && (
        <div
          className={`absolute max-h-[400px]  overflow-y-scroll bg-white z-50 top-[74px] border-2 rounded-xl w-full`}
          style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}
        >
          {results.map((result, id) => {
            return (
              <div
                key={id}
                className="w-full  flex items-center justify-between gap-2 py-3 px-6 cursor-pointer rounded-sm  max-h-[300px] overflow-y-auto border-b"
                onClick={(e) => {
                  alert(`You selected ${result.city}!`);
                  setIsDisplay(false);
                  handleChange(result.city, result.lat, result.lng);
                }}
              >
                <div className="flex sm:items-end items-center">
                  <span className="font-bold text-xl">{result.city},</span>
                  <span>{result.state}</span>
                </div>
                <div className="flex">
                  <div className="flex flex-col items-center">
                    <span className="font-bold text-xl">{result.temp} </span>
                    <span className="relative bottom-[5px]">
                      {result.climate}
                    </span>
                  </div>
                  <img src={result.icon} alt="" />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
