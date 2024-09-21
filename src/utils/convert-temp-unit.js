// From Celsius to Fahrenheit: (C * 9/5) + 32
// From Fahrenheit to Celsius: (F - 32) * 5/9

export const formatTemprature = (temp, unit) => {
  if (!temp || !unit) return;
  let options = {};

  if (unit === "metric") {
    options = {
      style: "unit",
      unit: "celsius",
    };
  } else if (unit === "imperial") {
    options = {
      style: "unit",
      unit: "fahrenheit",
    };
  }
  const tempFormatter = new Intl.NumberFormat("en-US", options);

  return tempFormatter.format(temp);
};

export default function convertTempUnit(temperature, inputUnit, targetUnit) {
  let displayTemperature;
  if (inputUnit === targetUnit) {
    // No conversion needed if the units are the same
    displayTemperature = temperature;
  } else if (targetUnit === "imperial") {
    // Convert Celsius to Fahrenheit
    displayTemperature = Number(((temperature * 9) / 5 + 32).toFixed(1));
  } else if (targetUnit === "metric") {
    // Convert Fahrenheit to Celsius
    displayTemperature = Number((((temperature - 32) * 5) / 9).toFixed(1));
  }

  return formatTemprature(displayTemperature, targetUnit);
}
