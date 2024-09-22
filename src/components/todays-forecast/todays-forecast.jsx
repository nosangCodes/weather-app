import React, { useContext, useEffect, useState } from "react";
import { fetchWeatherDataHrly } from "../../lib/fetch-today-hrly-forecast";
import ForecastsCards from "../forecasts-cards/forecasts-cards";
import formatTime from "../../utils/format-time";
import { WeatherContext } from "../../providers/weather-provider";
import useIsOnline from "../../hooks/useIsOnline";

export default function TodaysForecast({ lat, lon }) {
  const [todaysForecast, setTodaysForecast] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { units, handleSaveLastSearch } = useContext(WeatherContext);
  const { isOnline } = useIsOnline();

  useEffect(() => {
    if (lat && lon) {
      setError("");
      setLoading(true);

      if (!isOnline) {
        const result = JSON.parse(
          localStorage.getItem("weather-app-todays-forecast")
        );
        if(result && result?.length > 0){
          setTodaysForecast(result)
        }else{ 
          setError(
            "You are currently offline. Please connect to a network to view weather updates."
          );
        }
        setLoading(false);
      } else {
        fetchWeatherDataHrly(lat, lon, units)
          .then((res) => {
            if (res?.list && res.list?.length > 0) {
              const result = res.list.map((item) => ({
                time: formatTime(new Date(item?.dt_txt), "time"),
                icon: item?.weather?.[0]?.icon,
                temp: item?.main?.temp,
              }));
              // save today's forecast in localstorage
              localStorage.setItem(
                "weather-app-todays-forecast",
                JSON.stringify(result)
              );

              setTodaysForecast(result);
            }
          })
          .catch((err) => {
            console.error(err);
            setError("Something went wrong!");
          })
          .finally(() => setLoading(false));
      }
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
