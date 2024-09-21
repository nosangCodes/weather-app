export default function formatTime(date, formatType = "weekday") {
  let options = {};

  if (formatType === "weekday") {
    options = {
      weekday: "long",
    };
  } else if (formatType === "time") {
    options = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
  }
  const formatter = new Intl.DateTimeFormat("en-US", options);

  return formatter.format(date);
}
