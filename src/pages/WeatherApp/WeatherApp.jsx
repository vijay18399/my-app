import { useState } from "react";
import { Link } from "react-router-dom";
import WeatherCard from "./WeatherCard";
import WeatherForm from "./WeatherForm";
import { IoArrowBackCircle } from "react-icons/io5";

function WeatherApp() {
    const [modalState, updateModalState] = useState(true);
    const [weatherData, setWeatherData] = useState(null);
    const API = "19f13f294e9ac4197c7af9ee0ec9a1f8"
    function getWeatherData(latitude,longitude) {
        var weatherAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API}`
        fetch(weatherAPI)
            .then((data) => { return data.json() }).then((data) => {
                setWeatherData(data);
                updateModalState(false)
            })
    }
    return (
        <div className="container mx-auto p-4">
            <div className="flex items-center justify-between mb-4 pb-4 border-b-2 border-gray-200">
                <div className="flex items-center justify-center">
                    <Link to="/">
                        <IoArrowBackCircle className="text-2xl" />
                    </Link>
                    <h1 className="text-3xl font-bold ml-4">Weather App</h1>
                </div>
            </div>
            {modalState  &&  <WeatherForm  getWeatherData={getWeatherData}  /> } 
            {weatherData &&  <WeatherCard weatherData={weatherData} updateModalState={updateModalState} /> }
        </div>
    );
    
}
export default WeatherApp;