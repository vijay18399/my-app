import React, { useState } from "react";
import { MdMyLocation } from "react-icons/md";
import { FiLoader } from "react-icons/fi";
import styles from "./WeatherForm.module.css";

function WeatherForm({ getWeatherData }) {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [loader, toggleLoader] = useState(false);
  function onSubmit(event) {
    event.preventDefault();
    getWeatherData(latitude, longitude);
  }
  function setLatitudeAndLongitude() {
    toggleLoader(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (data) {
        setLatitude(data.coords.latitude);
        setLongitude(data.coords.longitude);
        toggleLoader(false);
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  return (
    <div className={styles.WeatherContainer}>
      <form className={styles.WeatherForm}>
          <input
            type="number"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            placeholder="Enter Latitude"
            className={styles.input}
          />
          <input
            type="number"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            placeholder="Enter Longitude"
            className={styles.input}
          />
        <div className={styles.btnGroup} >
          <button
            type="button"
            onClick={() => setLatitudeAndLongitude()}
            className={styles.locationBtn}
          >
           Fetch My Location
            {loader ? (
              <span className={styles.btnIcon} ><FiLoader className={styles.Loader} /></span> 
            ) : (
              <span className={styles.btnIcon}><MdMyLocation className={styles.LocationIcon} /></span>
            )}
          </button>
          <button
            type="submit"
            disabled={!(latitude && longitude)}
            onClick={(e) => onSubmit(e)}
            className={styles.submitBtn}
          >
            Get Weather Data
          </button>
        </div>
      </form>
    </div>
  );
}

export default WeatherForm;
