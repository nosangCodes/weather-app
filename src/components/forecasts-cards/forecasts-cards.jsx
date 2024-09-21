import React from "react";
import classes from "./forecasts-cards.module.css";

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
        {temp_max}&deg;C <span>/</span> {temp_min}&deg;C
      </p>
    </div>
  );
}
