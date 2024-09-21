export default function formatDate(timezoneOffset, timestamp) {
  if (!timezoneOffset || !timestamp) {
    return;
  }

  // Create a new Date object
  const date = new Date((timestamp + timezoneOffset) * 1000);

  const formatter = new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return formatter.format(date);
}
