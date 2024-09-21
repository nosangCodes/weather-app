import { useState } from "react";
import { fetchcities } from "../lib/fetch-cities";

function useSearchCities() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [loadedCities, setCities] = useState([]);

  const getCities = async (query) => {
    if (!query) {
      setError("City name required");
      return;
    }

    const isInResult =
      loadedCities &&
      loadedCities.length > 0 &&
      loadedCities?.some((city) => city.name === query);
    if (isInResult) return;

    setCities([]);
    setError("");
    setIsLoading(true);
    await fetchcities(query)
      .then((res) => {
        const cities = [];
        const result = res?.results ?? [];
        if (!result && result?.length < 0) {
          return;
        } else {
          result.forEach((city) => {
            const cityName =
              city?.type === "POI"
                ? `${city?.poi?.name} ${city?.address?.country}`
                : `${city?.address?.freeformAddress} ${city?.address?.country}`;

            if (city.type !== "POI") {
              let obj = {
                id: city.id,
                type: city.type,
                name: cityName,
                position: city?.position,
              };
              cities.push(obj);
            }
          });

          console.log("cities", cities);
          setCities(cities);
        }
      })
      .catch((err) => {
        return [];
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return { getCities, isLoading, error, loadedCities };
}

export default useSearchCities;
