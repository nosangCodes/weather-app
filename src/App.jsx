import { useState } from "react";
import "./App.css";
import Dropdown from "./components/dropdown/dropdown";
import WeatherDetails from "./components/weather-details/weather-details";
import useUsersLocation from "./hooks/useUsersLocation";
import TodaysForecast from "./components/todays-forecast/todays-forecast";
import MoreData from "./components/more-data/more-data";

function App() {
  const { geolocationPos } = useUsersLocation();
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [cityName, setCityName] = useState(null);

  const position =
    selectedLocation?.lat && selectedLocation?.lon
      ? selectedLocation
      : geolocationPos;

  return (
    <div className="app">
      <div className="weather-details-wrapper">
        <Dropdown
          onChange={(option, cityName) => {
            setSelectedLocation(option);
            setCityName(cityName);
          }}
        />
        <WeatherDetails {...position} cityName={cityName} />
        <TodaysForecast {...position} />
        <MoreData {...position} />
      </div>
      <div className="five-day-forecast">
        <p>5 days forecast</p>
      </div>
    </div>
  );
}

export default App;
