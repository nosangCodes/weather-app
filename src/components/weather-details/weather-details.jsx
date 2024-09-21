import React, { useContext, useEffect, useState } from "react";
import classes from "./weather-details.module.css";
import { fetchWeatherData } from "../../lib/fetch-weather-data";
import LoadingSkeleton from "./loading-sekeleton";
import { WeatherContext } from "../../providers/weather-provider";

export default function WeatherDetails({ lat, lon, cityName }) {
  // const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { handleSetWeatherData, weatherData } = useContext(WeatherContext);

  useEffect(() => {
    if (lat && lon && handleSetWeatherData) {
      setError("");
      setLoading(true);
      fetchWeatherData(lat, lon)
        .then((res) => {
          handleSetWeatherData(res);
        })
        .catch((err) => {
          console.error(err);
          setError("Something went wrong!");
        })
        .finally(() => setLoading(false));
    }
    return () => {};
  }, [lat, lon]);

  if (loading) return <LoadingSkeleton />;

  return (
    <div className={classes.container}>
      <div className={classes.main}>
        <div>
          <div className={classes["main-data"]}>
            <h1>{cityName ? cityName : weatherData?.name}</h1>
            <p>{weatherData?.weather?.[0]?.description}</p>
            <div
              className={`${classes.icon} ${classes["mobile-weather-icon"]}`}
            >
              <img
                src={`https://openweathermap.org/img/wn/${weatherData?.weather?.[0]?.icon}@4x.png`}
                alt="weather icon"
              />
            </div>
            {/* <p>{formatDate(weatherData?.timezone, weatherData?.dt)}</p> */}
          </div>
          {weatherData?.main?.temp && (
            <h1 className={classes.temp}>{weatherData?.main?.temp}&deg;C</h1>
          )}
        </div>
        <div className={classes.icon}>
          <img
            src={`https://openweathermap.org/img/wn/${weatherData?.weather?.[0]?.icon}@4x.png`}
            alt="weather icon"
          />
        </div>
      </div>
      {error && <p className={classes.error}>{error}</p>}
    </div>
  );
}
