import React from "react";
import cloudy from "../assets/cloudy.svg";
import clear from "../assets/clear.svg";
function DailyTempCard({ weather }) {
  // function clouds(value) {
  //   if (value == "Clouds") {
  //     return <img src={cloudy} alt="" />;
  //   } else if (value == "Clear") {
  //     return <img src={clear} alt="" />;
  //   }
  // }

  function getDay(timestamp) {
    const date = new Date(timestamp * 1000);
    const dayIndex = date.getDay();

    const days = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];

    // Get the day name using the index
    const dayName = days[dayIndex];
    return dayName;
  }
  return (
    <div className=" relative m-2 min-w-[65px]">
      <div className=" flex flex-col items-center justify-center  p-2">
        <p>{getDay(weather.dt)}</p>
        <p>
          <span>{weather.temp.day} °</span>
        </p>
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt=""
        />
        {/* {clouds(weather.weather[0].main)} */}

        <p>
          <span>{weather.weather[0].main} </span>
        </p>
      </div>
    </div>
    // </div>
  );
}

export default DailyTempCard;
