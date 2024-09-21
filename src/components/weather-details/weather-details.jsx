import React, { useContext, useEffect, useState } from "react";
import classes from "./weather-details.module.css";
import { fetchWeatherData } from "../../lib/fetch-weather-data";
import LoadingSkeleton from "./loading-sekeleton";
import { WeatherContext } from "../../providers/weather-provider";
import convertTempUnit from "../../utils/convert-temp-unit";

export default function WeatherDetails({ lat, lon, cityName }) {
  const [error, setError] = useState("");

  const {
    handleSetWeatherData,
    handleMoreDataLoaded,
    handleLoadingMoreData,
    weatherData,
    units,
    fetchedUnit,
    handleSetfetchedUnit,
    loading
  } = useContext(WeatherContext);

  useEffect(() => {
    if (lat && lon && handleSetWeatherData) {
      setError("");
      handleLoadingMoreData();
      fetchWeatherData(lat, lon, units)
        .then((res) => {
          handleSetWeatherData(res);
          handleSetfetchedUnit(res.units);
        })
        .catch((err) => {
          console.error(err);
          setError("Something went wrong!");
        })
        .finally(() => handleMoreDataLoaded());
    }
    return () => {};
  }, [lat, lon]);

  if (loading) return <LoadingSkeleton />;

  const iconSrc = weatherData?.weather?.[0]?.icon
    ? `https://openweathermap.org/img/wn/${weatherData?.weather?.[0]?.icon}@4x.png`
    : "/placeholder-weather.png";

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
              <img src={iconSrc} alt="weather icon" />
            </div>
            {/* <p>{formatDate(weatherData?.timezone, weatherData?.dt)}</p> */}
          </div>
          {/* <h1 className={classes.temp}>{weatherData?.main?.temp}&deg;C</h1> */}
          {weatherData?.main?.temp && (
            <h1 className={classes.temp}>
              {convertTempUnit(weatherData?.main?.temp, fetchedUnit, units)}
            </h1>
          )}
        </div>
        <div className={classes.icon}>
          <img src={iconSrc} alt="weather icon" />
        </div>
      </div>
      {error && <p className={classes.error}>{error}</p>}
    </div>
  );
}
