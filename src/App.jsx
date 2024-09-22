import { lazy, Suspense, useState } from "react";
import "./App.css";
import Dropdown from "./components/dropdown/dropdown";
import useUsersLocation from "./hooks/useUsersLocation";
import ToggleUnit from "./components/toggle-unit/toggle-util";
import { Loader2 } from "lucide-react";

const FiveDayForeCasts = lazy(() =>
  import("./components/five-day-forecasts/five-day-forecasts")
);
const TodaysForecast = lazy(() =>
  import("./components/todays-forecast/todays-forecast")
);
const MoreData = lazy(() => import("./components/more-data/more-data"));
const WeatherDetails = lazy(() =>
  import("./components/weather-details/weather-details")
);

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
            width: "100%",
            columnGap: "10px",
            alignItems: "center",
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
        <Suspense
          fallback={
            <Loader2 style={{ margin: "0 auto" }} className="animate-spin" />
          }
        >
          <WeatherDetails {...position} cityName={cityName} />
          <TodaysForecast {...position} />
          <FiveDayForeCasts {...position} />
          <MoreData {...position} />
        </Suspense>
      </div>
    </div>
  );
}

export default App;
