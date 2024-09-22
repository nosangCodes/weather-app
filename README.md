# Weather App

This is a weather app that fetches weather data from the OpenWeather API and supports querying places via the TomTom API. The app allows users to search for a city, view its weather conditions, and toggle between Celsius and Fahrenheit units. Users can also view today’s five-hour forecast and a five-day forecast.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Setup Instructions](#setup-instructions)
3. [Assumptions](#assumptions)
4. [How to Use](#how-to-use)
5. [Deployed Link](#deployed-link)

---

## Prerequisites

- **OpenWeather API Key:** Sign up at [OpenWeatherMap](https://openweathermap.org/api) to get your API key for fetching weather data.
- **TomTom API Key:** Register at [TomTom Developer Portal](https://developer.tomtom.com/) to obtain your API key for querying places.

---

## Setup Instructions

1. **Install Packages:**
   ```
   npm install
   ```
2. **Set Up Environment Variables: Create a .env file in the root directory and add your API keys:**
   ```
   REACT_APP_WEATHER_API_KEY=your_openweather_api_key
   REACT_APP_TOMTOM_API_KEY=your_tomtom_api_key
   ```
3. **Start Project Locally:**
   ```
   npm run start
   ```
4. **Create a Production Build:**
   ```
   npm run build
   ```
5. **Create a Production Build:**
   ```
   npm run build
   ```
   
---

## Assumptions
- Users will have internet access to fetch data.
- The app defaults to Celsius, but users can switch to Fahrenheit for temperature display.

___

## How to use
1. **Searching:**
    - Enter the city name in the input field at the top of the page.
    - You'll get a list of matching place names. Select any one to view the weather conditions there.
2. **Toggle Temperature Units:**
    - You can toggle between Celsius and Fahrenheit using the switch located at the top right of the page.
___

## Deployed Link
Access the deployed app at: **https://weather.nosang.in**
