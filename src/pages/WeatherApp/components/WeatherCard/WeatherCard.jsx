import React from "react";
import { IoLocation } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import styles from "./WeatherCard.module.css"; 

function WeatherCard({ weatherData, updateModalState }) {
  return (
    <div className={styles.cardContainer}>
    <div className={styles.weatherCard}>
      <div className={styles.locationContainer}>
        <div className={styles.location}>
          <IoLocation className={styles.locationIcon} />
          <h1 className={styles.locationName}>{weatherData.name}</h1>
        </div>
        <FaRegEdit className={styles.editIcon} onClick={() => updateModalState(true)} />
      </div>
      <div className={styles.weatherInfo}>
        <div className={styles.weatherIcon}>
          <img src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} />
        </div>
        <div className={styles.temperature}>
          <h1 className={styles.temp}>{weatherData.main.temp} <sup>°C</sup></h1>
        </div>
        <div className={styles.description}>
          <h2 className={styles.weatherDescription}>{weatherData.weather[0].description}</h2>
          <div className={styles.dates}>
            <div className={styles.dateCard}>
               <span>Sunrise</span>
               <span className={styles.date} >{new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            <div className={styles.dateCard}>
               <span>Sunset</span>
               <span className={styles.date}>{new Date(weatherData.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>
         </div>
      </div>
    </div>
    </div>
  );
}

export default WeatherCard;
