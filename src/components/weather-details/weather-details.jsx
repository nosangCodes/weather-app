import React, { useContext, useEffect, useState } from "react";
import classes from "./weather-details.module.css";
import { fetchWeatherData } from "../../lib/fetch-weather-data";
import LoadingSkeleton from "./loading-sekeleton";
import { WeatherContext } from "../../providers/weather-provider";
import convertTempUnit from "../../utils/convert-temp-unit";
import useIsOnline from "../../hooks/useIsOnline";

export default function WeatherDetails({ lat, lon, cityName }) {
  const { isOnline } = useIsOnline();
  const [info, setInfo] = useState("");

  const {
    handleSetWeatherData,
    handleMoreDataLoaded,
    handleLoadingMoreData,
    weatherData,
    units,
    fetchedUnit,
    handleSetfetchedUnit,
    loading,
    handleSetLastSavedSearch,
    error,
    setError,
  } = useContext(WeatherContext);

  useEffect(() => {
    if (lat && lon && handleSetWeatherData) {
      if (!isOnline) {
        setInfo(
          "You're viewing outdated data! Connect to the internet to view the latest weather updates."
        );
        handleSetLastSavedSearch();
        handleMoreDataLoaded();
      } else {
        handleLoadingMoreData();
        fetchWeatherData(lat, lon, units)
          .then((res) => {
            handleSetWeatherData({
              ...res,
              name: cityName ? cityName : res.name,
            });
            handleSetfetchedUnit(res.units);
          })
          .catch((err) => {
            console.error(err);
            setError("Something went wrong!");
          })
          .finally(() => handleMoreDataLoaded());
      }
    }

    return () => {
      setInfo("");
      setError("");
    };
  }, [lat, lon, isOnline]);

  if (loading) return <LoadingSkeleton />;

  const iconSrc = weatherData?.weather?.[0]?.icon
    ? `https://openweathermap.org/img/wn/${weatherData?.weather?.[0]?.icon}@4x.png`
    : "/placeholder-weather.png";

  return (
    <div className={classes.container}>
      {!error && info && (
        <p className={`${classes.info} info-message`}>{info}</p>
      )}
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
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}
