import { useState } from "react";
import "./App.css";
import Dropdown from "./components/dropdown/dropdown";
import WeatherDetails from "./components/weather-details/weather-details";
import useUsersLocation from "./hooks/useUsersLocation";
import TodaysForecast from "./components/todays-forecast/todays-forecast";
import MoreData from "./components/more-data/more-data";
import FiveDayForeCasts from "./components/five-day-forecasts/five-day-forecasts";
import ToggleUnit from "./components/toggle-unit/toggle-util";

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
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flex: "1 1 0%",
            width: "100%",
          }}
        >
          <Dropdown
            onChange={(option, cityName) => {
              setSelectedLocation(option);
              setCityName(cityName);
            }}
          />
          <ToggleUnit />
        </div>
        <WeatherDetails {...position} cityName={cityName} />
        <FiveDayForeCasts {...position} />
        <TodaysForecast {...position} />
        <MoreData {...position} />
        
      </div>
    </div>
  );
}

export default App;
