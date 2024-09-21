import React, { useEffect, useRef, useState } from "react";
import styles from "./dropdown.module.css";
import useSearchCities from "../../hooks/useSearchCities";
import useDebounce from "../../hooks/useDebounce";
import { fetchWeatherData } from "../../lib/fetch-weather-data";

export default function Dropdown() {
  const [isDropdownFocused, setIsDropdownFocused] = useState(true);
  const [, setValue] = useState(null);
  const dropdownRef = useRef(null); // Reference for dropdown wrapper
  const [inputValue, setInputValue] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const { getCities, loadedCities, isLoading } = useSearchCities();

  useDebounce(() => (inputValue ? getCities(inputValue) : () => {}), 1000, [
    inputValue,
  ]);

  const handleOptions = async (option) => {
    console.log("selected option", option);
    setValue(option);
    setIsDropdownFocused(false);
    setInputValue(option.name);
    if (option?.position?.lat && option?.position?.lon) {
      const res = await fetchWeatherData(
        option.position.lat,
        option.position.lon
      );
      setWeatherData(res);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    // getCities(value);
  };

  useEffect(() => {}, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownFocused(false); // Close dropdown when clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <>
      <div ref={dropdownRef} className={styles.container}>
        <input
          value={inputValue}
          onFocus={() => setIsDropdownFocused(true)}
          type="text"
          placeholder={"Search city"}
          onChange={handleInputChange}
        />
        {isDropdownFocused && (
          <ul className={styles["dropdown-list"]}>
            {loadedCities?.map((city) => (
              <li key={city.id}>
                <button type="button" onClick={() => handleOptions(city)}>
                  {city.name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
