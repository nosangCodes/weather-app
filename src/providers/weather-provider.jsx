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
  loading: true,
  handleLoadingMoreData: () => {},
  handleMoreDataLoaded: () => {},
  handleSaveLastSearch: () => {},
  handleSetLastSavedSearch: () => {},
  error: "",
  setError: () => {},
};

export const WeatherContext = createContext(initialState);

export const WeatherProvider = ({ children }) => {
  const [units, setUnits] = useState("metric");
  const [weatherData, setWeatherData] = useState(null);
  const [moreWeatherData, setMoreWeatherData] = useState(null);
  const fetchedUnit = useRef();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleLoadingMoreData = () => {
    setLoading(true);
  };
  const handleMoreDataLoaded = () => {
    setLoading(false);
  };

  const handleSetfetchedUnit = (unit) => {
    fetchedUnit.current = unit;
  };

  const handleChangeUnits = (type) => {
    setUnits(type);
    window.localStorage.setItem("weather-app-units", type);
  };

  const handleSaveLastSearch = (data) => {
    window.localStorage.setItem(
      "weather-app-last-search",
      JSON.stringify(data)
    );
  };

  const handleSetLastSavedSearch = () => {
    const lastSearch = JSON.parse(
      window.localStorage.getItem("weather-app-last-search")
    );
    if (lastSearch && lastSearch?.weatherData) {
      setWeatherData(lastSearch.weatherData);
      fetchedUnit.current = lastSearch.weatherData.units;
    } else {
      setError(
        "You are currently offline. Please connect to a network to view weather updates."
      );
    }
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
    handleSaveLastSearch({
      weatherData: data,
    });
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
    loading,
    handleLoadingMoreData,
    handleMoreDataLoaded,
    handleSaveLastSearch,
    handleSetLastSavedSearch,
    error,
    setError,
  };
  return (
    <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>
  );
};
