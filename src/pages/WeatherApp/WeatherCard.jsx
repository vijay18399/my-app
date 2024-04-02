import React from "react";
import { IoLocation } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
function WeatherCard({ weatherData,updateModalState }) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-center items-center mb-8">
        <div className="flex justify-center items-center">
            <IoLocation className="text-teal-400 text-3xl" />
            <h1 className="ml-4 text-2xl">{weatherData.name}</h1>
        </div>
        <FaRegEdit  className="ml-4 cursor-pointer" onClick={(e)=>{ updateModalState(true) }} />
      </div>
      <div className="bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 rounded-2xl p-4">
        <div className="flex justify-between items-center mb-4">
          <img src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} alt="" />
          <h1 className="text-6xl text-white ml-8">{weatherData.main.temp} <sup>°C</sup></h1>
        </div>
        <div className="flex flex-col text-white">
          <h2 className="text-2xl font-bold mb-2">{weatherData.weather[0].description}</h2>
          <span>{new Date().toLocaleDateString('en-us', { weekday: "long", month: "short", day: "numeric" })}</span>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
