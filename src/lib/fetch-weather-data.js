export const fetchWeatherData = async (lat, lon) => {
  try {
    if (!lon || !lat) {
      throw new Error("invalid parameters");
    }

    if (!process.env.REACT_APP_OPEN_WEATHER_API_KEY) {
      throw new Error("OpenWeather api key required");
    }

    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}&units=metric`
    );

    if (!res.ok) {
      throw new Error("Something went wrong! Please try again");
    }

    return await res.json();
  } catch (error) {
    console.error("ERROR FETCHING WEATHER DATA", error);
    throw error;
  }
};
