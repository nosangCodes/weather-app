import convertSpeed from "../utils/convert-speed";
import convertTempUnit from "../utils/convert-temp-unit";

const { createContext, useState, useEffect, useRef } = require("react");

const initialState = {
  units: "metric",
  fetchedUnit: "",
  weatherData: null,
  moreWeatherData: null,
  handleChangeUnits: () => {},
  handleSetWeatherData: () => {},
  handleSetfetchedUnit: () => {},
};

export const WeatherContext = createContext(initialState);

export const WeatherProvider = ({ children }) => {
  const [units, setUnits] = useState("metric");
  const [weatherData, setWeatherData] = useState(null);
  const [moreWeatherData, setMoreWeatherData] = useState(null);
  // const [fetchedUnit, setFetchedUnit] = useState("");

  const fetchedUnit = useRef();
  const handleSetfetchedUnit = (unit) => {
    // setFetchedUnit(unit);
    fetchedUnit.current = unit;
  };

  const handleChangeUnits = (type) => {
    setUnits(type);
    window.localStorage.setItem("weather-app-units", type);
  };

  useEffect(() => {
    const lSsavedUnits = window.localStorage.getItem("weather-app-units");
    if (!lSsavedUnits) {
      window.localStorage.setItem("weather-app-units", units);
    } else {
      setUnits(lSsavedUnits);
    }
  }, []);

  useEffect(() => {
    if (weatherData) {
      console.log("updated more data");
      setMoreWeatherData([
        {
          identifier: "feels_like",
          value: convertTempUnit(
            weatherData?.main?.feels_like,
            fetchedUnit.current,
            units
          ),
          name: "Real feel",
        },
        {
          identifier: "temp_min",
          value: convertTempUnit(
            weatherData?.main?.temp_min,
            fetchedUnit.current,
            units
          ),
          name: "Temp min",
        },
        {
          identifier: "temp_max",
          value: convertTempUnit(
            weatherData?.main?.temp_max,
            fetchedUnit.current,
            units
          ),
          name: "Temp max",
        },
        {
          identifier: "wind_speed",
          value: convertSpeed(weatherData?.wind?.speed, fetchedUnit, units),
          name: "Wind speed",
        },
      ]);
    }
  }, [units, weatherData]);

  const handleSetWeatherData = (data) => {
    setWeatherData(data);
  };

  const value = {
    units,
    weatherData,
    fetchedUnit: fetchedUnit.current,
    moreWeatherData,
    handleChangeUnits,
    handleSetWeatherData,
    handleSetfetchedUnit,
  };
  return (
    <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>
  );
};
