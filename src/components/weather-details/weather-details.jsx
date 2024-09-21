import React, { useEffect, useState } from "react";
import classes from "./weather-details.module.css";
import { fetchWeatherData } from "../../lib/fetch-weather-data";

export default function WeatherDetails({ lat, lon }) {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => {
    if (lat && lon) {
      setError("");
      fetchWeatherData(lat, lon)
        .then((res) => {
          setWeatherData(res);
        })
        .catch((err) => {
          console.error(err);
          setError("Something went wrong!");
        });
    }
    return () => {};
  }, [lat, lon]);

  return (
    <div className={classes.container}>
      Weather details
      <div>{JSON.stringify(weatherData)}</div>
      {error && <p>{error}</p>}
    </div>
  );
}
