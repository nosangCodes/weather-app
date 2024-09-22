import React, { useContext } from "react";
import classes from "./more-data.module.css";
import {
  Thermometer,
  ThermometerSnowflake,
  ThermometerSun,
  Wind,
} from "lucide-react";
import { WeatherContext } from "../../providers/weather-provider";
import MoreDataSkeleton from "./more-data-skeleton";

const icons = {
  feels_like: <Thermometer color="#fafafaa0" />,
  temp_min: <ThermometerSnowflake color="#fafafaa0" />,
  temp_max: <ThermometerSun color="#fafafaa0" />,
  wind_speed: <Wind color="#fafafaa0" />,
};

export default function MoreData() {
  const { moreWeatherData, loading, error } = useContext(WeatherContext);

  return (
    <div className={`${classes.container} card`}>
      <h4 className="card-heading">Details</h4>
      {error && <p className="error-message">{error}</p>}
      <div className={classes.cards}>
        {loading ? (
          <MoreDataSkeleton />
        ) : (
          moreWeatherData &&
          moreWeatherData?.length > 0 &&
          moreWeatherData?.map((item) => (
            <DetailsCard key={item.identifier} {...item} />
          ))
        )}
      </div>
    </div>
  );
}

function DetailsCard({ name, identifier, value }) {
  return (
    <div className={classes["details-card"]}>
      <div className={classes.icon}>{icons[identifier]}</div>
      <div className={classes["meta"]}>
        <h5>{name}</h5>
        <h4>{value}</h4>
      </div>
    </div>
  );
}
