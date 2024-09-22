// Formula for Conversion:
// From meters per second (m/s) to miles per hour (mph):

// speed (mph) = speed (m/s) × 2.23694
// speed (m/s)=speed (mph)×0.44704

export default function convertSpeed(speed, inputUnit, targetUnit) {
  let result = 0;

  if (inputUnit === targetUnit) {
    result = speed;
  } else if (targetUnit === "metric") {
    result = Number(speed * 0.44704).toFixed(2);
  } else if (targetUnit === "imperial") {
    result = Number(speed * 2.23694).toFixed(2);
  }
  return formatSoeedUnit(result, targetUnit);
}

function formatSoeedUnit(speed, unit) {
  const unitLabel = unit === "metric" ? "m/s" : "mph";
  return `${speed} ${unitLabel}`;
}
