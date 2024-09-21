import React, { useContext } from "react";
import { WeatherContext } from "../../providers/weather-provider";
import Switch from "../switch/switch";

export default function ToggleUnit() {
  const { handleChangeUnits, units } = useContext(WeatherContext);

  const hadnleChange = (e) => {
    if (e.target.checked) {
      handleChangeUnits("metric");
    } else {
      handleChangeUnits("imperial");
    }
  };
  return (
    <Switch
      onChange={hadnleChange}
      checked={units === "metric" ? true : false}
      offLabel="&deg;F"
      onLabel="&deg;C"
    />
  );
}
