export const cities = [
  { name: "New York", country: "USA" },
  { name: "London", country: "UK" },
  { name: "Tokyo", country: "Japan" },
  { name: "Paris", country: "France" },
  { name: "Sydney", country: "Australia" },
  { name: "Berlin", country: "Germany" },
  { name: "Toronto", country: "Canada" },
  { name: "Dubai", country: "UAE" },
  { name: "Mumbai", country: "India" },
  { name: "São Paulo", country: "Brazil" },
];

export const fetchcities = async (query = "") => {
  if (!query) {
    throw new Error("Missing query.");
  }
  if (!process.env.REACT_APP_TOMTOM_API_KEY) {
    throw new Error("Missing api key");
  }
  try {
    const res = await fetch(
      `https://api.tomtom.com/search/2/search/${query}.json?key=${process.env.REACT_APP_TOMTOM_API_KEY}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      throw new Error("Somethign went wrong!");
    }
    return await res.json();
  } catch (error) {
    console.log("🚀 ~ fetchcities ~ error:", error);
    throw error;
  }
};
