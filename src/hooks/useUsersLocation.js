import { useEffect, useState } from "react";

export default function useUsersLocation() {
  const [geolocationPos, setgeolocationPos] = useState(null);

  function success(pos) {
    console.log("🚀 ~ success ~ pos:", pos);
    const crd = pos.coords;

    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);

    if (crd.longitude && crd.latitude) {
      setgeolocationPos({
        lat: crd.latitude,
        lon: crd.longitude,
      });
    }
  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
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
          console.log(permissionStatus.state);
          if (permissionStatus.state === "granted") {
            navigator.geolocation.getCurrentPosition(success, error, options);
            //If granted then you can directly call your function here
          } else if (permissionStatus.state === "prompt") {
            //If prompt then the user will be asked to give permission
            navigator.geolocation.getCurrentPosition(success, error, options);
          } else if (permissionStatus.state === "denied") {
            console.log("location permission denied");
            //If denied then you have to show instructions to enable location
          }
        });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  return { geolocationPos };
}
