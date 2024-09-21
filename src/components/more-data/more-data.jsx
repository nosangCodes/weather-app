import React, { useContext } from "react";
import classes from "./more-data.module.css";
import {
  Thermometer,
  ThermometerSnowflake,
  ThermometerSun,
  Wind,
} from "lucide-react";
import { WeatherContext } from "../../providers/weather-provider";

const icons = {
  feels_like: <Thermometer color="#fafafaa0" size={35} />,
  temp_min: <ThermometerSnowflake color="#fafafaa0" size={35} />,
  temp_max: <ThermometerSun color="#fafafaa0" size={35} />,
  wind_speed: <Wind color="#fafafaa0" size={35} />,
};

export default function MoreData() {
  const { moreWeatherData } = useContext(WeatherContext);
  console.log("🚀 ~ MoreData ~ moreWeatherData:", moreWeatherData)

  return (
    <div className={`${classes.container} card`}>
      <h4 className="card-heading">Details</h4>
      <div className={classes.cards}>
        {moreWeatherData &&
          moreWeatherData?.length > 0 &&
          moreWeatherData?.map((item) => (
            <DetailsCard key={item.identifier} {...item} />
          ))}
      </div>
    </div>
  );
}

function DetailsCard({ name, identifier, value }) {
  return (
    <div className={classes["details-card"]}>
      <div>{icons[identifier]}</div>
      <div>
        <h5>{name}</h5>
        <h4>{value}</h4>
      </div>
    </div>
  );
}
