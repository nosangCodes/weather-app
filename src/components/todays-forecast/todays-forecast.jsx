import React, { useEffect, useState } from "react";
import classes from "./todays-forecast.module.css";
import { fetchWeatherDataHrly } from "../../lib/fetch-today-hrly-forecast";
import formatTime from "../../utils/format-time";

export default function TodaysForecast({ lat, lon }) {
  const [todaysForecast, setTodaysForecast] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (lat && lon) {
      setError("");
      setLoading(true);
      fetchWeatherDataHrly(lat, lon)
        .then((res) => {
          if (res?.list && res.list?.length > 0) {
            setTodaysForecast(res.list);
          }
        })
        .catch((err) => {
          console.error(err);
          setError("Something went wrong!");
        })
        .finally(() => setLoading(false));
    }
  }, [lat, lon]);

  return (
    <div className={classes.container}>
      {error && <p className="error-message">{error}</p>}
      <h4 className="card-heading">Today's forecast</h4>
      <div className={classes["forecast-list"]}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          todaysForecast.map((item) => (
            <Card
              key={item.dt}
              time={item.dt_txt}
              icon={item?.weather?.[0]?.icon}
              temp={item?.main?.temp}
            />
          ))
        )}
      </div>
    </div>
  );
}

function Card({ time, temp, icon }) {
  return (
    <div className={classes.card}>
      <p>{formatTime(new Date(time))}</p>
      <div className={classes["card-icon"]}>
        <img
          src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
          alt="weather icon"
        />
      </div>
      <p>{temp}&deg;C</p>
    </div>
  );
}
