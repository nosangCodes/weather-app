import { useEffect, useState } from "react";

export default function useUsersLocation() {
  const [geolocationPos, setgeolocationPos] = useState(null);

  function getLastSearch() {
    const lastSearch = JSON.parse(
      localStorage.getItem("weather-app-last-search")
    );
    return lastSearch;
  }

  function success(pos) {
    const lastSearch = getLastSearch();
    if (lastSearch?.weatherData?.coord) {
      setgeolocationPos(lastSearch?.weatherData?.coord);
    } else {
      const crd = pos.coords;
      if (crd.longitude && crd.latitude) {
        setgeolocationPos({
          lat: crd.latitude,
          lon: crd.longitude,
        });
      }
    }
  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
    handlePermissionDenied();
    // if (err.code === 1) {
    // } else if (err.code === 3) {
    //   retryGeolocation();
    // }
  }

  function handlePermissionDenied() {
    // if permission is denied set location of any location
    const lastSearch = getLastSearch();
    if (lastSearch?.weatherData?.coord) {
      setgeolocationPos(lastSearch?.weatherData?.coord);
    } else {
      setgeolocationPos({
        lat: 72,
        lon: -40,
      });
    }
  }

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  const retryGeolocation = () => {
    console.log("retrying...");
    navigator.geolocation.getCurrentPosition(success, error, {
      ...options,
      timeout: options.timeout * 2, // Double the timeout for the retry
    });
  };

  useEffect(() => {
    if (navigator?.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then((permissionStatus) => {
          if (permissionStatus.state === "granted") {
            navigator.geolocation.getCurrentPosition(success, error, options);
          } else if (permissionStatus.state === "prompt") {
            navigator.geolocation.getCurrentPosition(success, error, options);
          } else if (permissionStatus.state === "denied") {
            handlePermissionDenied();
            console.log("location permission denied");
          }
        });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  return { geolocationPos };
}
