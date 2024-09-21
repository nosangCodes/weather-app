import React, { useContext } from "react";
import classes from "./forecasts-cards.module.css";
import convertTempUnit from "../../utils/convert-temp-unit";
import { WeatherContext } from "../../providers/weather-provider";
import CardsSkeleton from "./cards-skeleton";

export default function ForecastsCards({ forecasts, error, loading, label }) {
  return (
    <div className={classes.container}>
      <h4 className="card-heading">{label}</h4>
      {error && <p className="error-message">{error}</p>}
      {loading ? (
        <CardsSkeleton />
      ) : (
        <div className={classes["forecast-list"]}>
          {forecasts.map((item) => (
            <Card key={item.time + item.temp} {...item} />
          ))}
        </div>
      )}
    </div>
  );
}

function Card({ time, temp_max, temp_min, icon, temp }) {
  const { units, fetchedUnit } = useContext(WeatherContext);
  return (
    <div className={classes.card}>
      <p className={classes.time}>{time}</p>
      <div className={`${classes["card-icon"]} ${classes["lg"]}`}>
        <img
          src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
          alt="weather icon"
        />
      </div>
      {temp ? (
        <p className={classes["card-temp"]}>
          {convertTempUnit(temp, fetchedUnit, units)}
        </p>
      ) : (
        <p className={classes["card-temp"]}>
          {convertTempUnit(temp_max, fetchedUnit, units)} <span>/</span>{" "}
          {convertTempUnit(temp_min, fetchedUnit, units)}
        </p>
      )}
      <div className={`${classes["card-icon"]} ${classes["md"]}`}>
        <img
          src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
          alt="weather icon"
        />
      </div>
    </div>
  );
}
