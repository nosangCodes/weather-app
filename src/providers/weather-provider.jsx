const { createContext, useState } = require("react");

const initialState = {
  units: "metric",
  weatherData: null,
  moreWeatherData: null,
  handleChangeUnits: () => {},
  handleSetWeatherData: () => {},
};

export const WeatherContext = createContext(initialState);

export const WeatherProvider = ({ children }) => {
  const [units, setUnits] = useState("metric");
  const [weatherData, setWeatherData] = useState(null);
  const [moreWeatherData, setMoreWeatherData] = useState(null);

  const handleChangeUnits = (type) => {
    setUnits(type);
  };

  const handleSetWeatherData = (data) => {
    setWeatherData(data);
    setMoreWeatherData([
      {
        identifier: "feels_like",
        value: data?.main?.feels_like,
        name: "Real feel",
      },
      {
        identifier: "temp_min",
        value: data?.main?.temp_min,
        name: "Temp min",
      },
      {
        identifier: "temp_max",
        value: data?.main?.temp_max,
        name: "Temp max",
      },
      {
        identifier: "wind_speed",
        value: data?.wind?.speed,
        name: "Wind speed",
      },
    ]);
  };

  const value = {
    units,
    weatherData,
    moreWeatherData,
    handleChangeUnits,
    handleSetWeatherData,
  };
  return (
    <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>
  );
};
