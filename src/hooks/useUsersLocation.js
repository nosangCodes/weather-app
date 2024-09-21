import { useEffect, useState } from "react";

export default function useUsersLocation() {
  const [geolocationPos, setgeolocationPos] = useState(null);

  function success(pos) {
    const crd = pos.coords;
    if (crd.longitude && crd.latitude) {
      setgeolocationPos({
        lat: crd.latitude,
        lon: crd.longitude,
      });
    }
  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
    if (err.code === 1) {
      handlePermissionDenied();
    }
  }

  function handlePermissionDenied() {
    // if permission is denied set location of any location
    setgeolocationPos({
      lat: 72,
      lon: -40,
    });
  }

  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };
    if (navigator?.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then((permissionStatus) => {
          console.log("permissionStatus", permissionStatus.state);
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
