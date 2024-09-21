export default function formatTime(date) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeStyle: "short",
  });

  return formatter.format(date);
}
