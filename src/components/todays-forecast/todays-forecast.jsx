import React, { useContext, useEffect, useState } from "react";
import { fetchWeatherDataHrly } from "../../lib/fetch-today-hrly-forecast";
import ForecastsCards from "../forecasts-cards/forecasts-cards";
import formatTime from "../../utils/format-time";
import { WeatherContext } from "../../providers/weather-provider";

export default function TodaysForecast({ lat, lon }) {
  const [todaysForecast, setTodaysForecast] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { units } = useContext(WeatherContext);

  useEffect(() => {
    if (lat && lon) {
      setError("");
      setLoading(true);
      fetchWeatherDataHrly(lat, lon, units)
        .then((res) => {
          if (res?.list && res.list?.length > 0) {
            setTodaysForecast(
              res.list.map((item) => ({
                time: formatTime(new Date(item?.dt_txt), "time"),
                icon: item?.weather?.[0]?.icon,
                temp: item?.main?.temp,
                temp_min: item?.main?.temp_min,
                temp_max: item?.main?.temp_max,
              }))
            );
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
    <ForecastsCards
      label={"Today's forecast"}
      error={error}
      forecasts={todaysForecast}
      loading={loading}
    />
  );
}
