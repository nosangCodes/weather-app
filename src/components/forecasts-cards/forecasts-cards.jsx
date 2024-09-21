import React, { useContext } from "react";
import classes from "./forecasts-cards.module.css";
import convertTempUnit from "../../utils/convert-temp-unit";
import { WeatherContext } from "../../providers/weather-provider";

export default function ForecastsCards({ forecasts, error, loading, label }) {
  return (
    <div className={classes.container}>
      <h4 className="card-heading">{label}</h4>
      {error && <p className="error-message">{error}</p>}
      <div className={classes["forecast-list"]}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          forecasts.map((item) => (
            <Card key={item.time + item.temp} {...item} />
          ))
        )}
      </div>
    </div>
  );
}

function Card({ time, temp_max, temp_min, icon }) {
  const { units, fetchedUnit } = useContext(WeatherContext);
  return (
    <div className={classes.card}>
      <p>{time}</p>
      <div className={classes["card-icon"]}>
        <img
          src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
          alt="weather icon"
        />
      </div>
      <p>
        {convertTempUnit(temp_max, fetchedUnit, units)} <span>/</span>{" "}
        {convertTempUnit(temp_min, fetchedUnit, units)}
      </p>
    </div>
  );
}
