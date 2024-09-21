import "./App.css";
import Dropdown from "./components/dropdown/dropdown";
import WeatherDetails from "./components/weather-details/weather-details";
import useUsersLocation from "./hooks/useUsersLocation";

function App() {
  const { geolocationPos } = useUsersLocation();
  return (
    <div className="app">
      <div className="weather-details-wrapper">
        <Dropdown />
        <WeatherDetails {...geolocationPos} />
      </div>
      <div className="five-day-forecast">
        <p>5 days forecast</p>
      </div>
    </div>
  );
}

export default App;
