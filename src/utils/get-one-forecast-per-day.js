import formatTime from "./format-time";

export default function getOneForecastPerDay(forecastList = []) {
  if (forecastList && forecastList?.length < 0) return [];
  // set to track unique dates
  const set = new Set();
  const dailyForecasts = [];

  for (const forecast of forecastList) {
    const date = forecast?.dt_txt?.split(" ")[0];
    if (!set.has(date)) {
      dailyForecasts.push({
        time: formatTime(new Date(forecast?.dt_txt)),
        icon: forecast?.weather?.[0]?.icon,
        temp_max: forecast?.main?.temp_max,
        temp_min: forecast?.main?.temp_min,
      });
      set.add(date);
    }
  }

  return dailyForecasts.slice(0, -1);
}
