import React, { useContext, useEffect, useState } from "react";
import fetchFiveDayForecast from "../../lib/fetch-five-day-forecasts";
import ForecastsCards from "../forecasts-cards/forecasts-cards";
import getOneForecastPerDay from "../../utils/get-one-forecast-per-day";
import { WeatherContext } from "../../providers/weather-provider";
import useIsOnline from "../../hooks/useIsOnline";

export default function FiveDayForeCasts({ lat, lon }) {
  const [todaysForecast, setTodaysForecast] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { units } = useContext(WeatherContext);
  const { isOnline } = useIsOnline();

  useEffect(() => {
    if (lat && lon) {
      setError("");
      setLoading(true);

      if (!isOnline) {
        const list = JSON.parse(
          localStorage.getItem("weather-app-five-day-forecast")
        );
        if (list && list?.length > 0) {
          setTodaysForecast(list);
        } else {
          setError(
            "You are currently offline. Please connect to a network to view weather updates."
          );
        }
        setLoading(false)
      } else {
        fetchFiveDayForecast(lat, lon, units)
          .then((res) => {
            if (res?.list && res.list?.length > 0) {
              const newList = getOneForecastPerDay(res.list);
              // save five day forecast in localstorage
              localStorage.setItem(
                "weather-app-five-day-forecast",
                JSON.stringify(newList)
              );
              setTodaysForecast(newList);
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
      label={"5-day forecast"}
      error={error}
      forecasts={todaysForecast}
      loading={loading}
    />
  );
}
