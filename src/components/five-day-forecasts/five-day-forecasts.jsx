import React, { useContext, useEffect, useState } from "react";
import fetchFiveDayForecast from "../../lib/fetch-five-day-forecasts";
import ForecastsCards from "../forecasts-cards/forecasts-cards";
import getOneForecastPerDay from "../../utils/get-one-forecast-per-day";
import { WeatherContext } from "../../providers/weather-provider";

export default function FiveDayForeCasts({ lat, lon }) {
  const [todaysForecast, setTodaysForecast] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const {units} = useContext(WeatherContext)

  useEffect(() => {
    if (lat && lon) {
      setError("");
      setLoading(true);
      fetchFiveDayForecast(lat, lon, units)
        .then((res) => {
          if (res?.list && res.list?.length > 0) {
            const newList = getOneForecastPerDay(res.list);
            setTodaysForecast(newList);
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
      label={"5-day forecast"}
      error={error}
      forecasts={todaysForecast}
      loading={loading}
    />
  );
}
