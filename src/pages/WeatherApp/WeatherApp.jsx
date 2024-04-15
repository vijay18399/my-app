import React, { useState } from "react";
import WeatherCard from "./components/WeatherCard/WeatherCard";
import WeatherForm from "./components/WeatherForm/WeatherForm";
function WeatherApp() {
  const [modalState, updateModalState] = useState(true);
  const [weatherData, setWeatherData] = useState(null);
  const API = "19f13f294e9ac4197c7af9ee0ec9a1f8";
  function editForm(){
    setWeatherData(null);
    updateModalState(true);
  }
  function getWeatherData(latitude, longitude) {
    var weatherAPI = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${API}`;
    fetch(weatherAPI)
      .then((data) => data.json())
      .then((data) => {
        setWeatherData(data);
        updateModalState(false);
      });
  }
  return (
    <>
      {weatherData && (
        <WeatherCard
          weatherData={weatherData}
          updateModalState={editForm}
        />
      )}
      {modalState && <WeatherForm getWeatherData={getWeatherData} />}
    </>
  );
}

export default WeatherApp;
