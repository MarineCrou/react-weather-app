import { useState } from "react";
import axios from "axios";

import Geolocation from "./Geolocation";
import DateTime from "./DateTime";
import Forecast from "./Forecast";
import WeatherIcons from "./WeatherIcons";
import Units from "./Units";

export default function Weather() {
  const [city, setCity] = useState(null);
  const [currentWeather, setCurrentWeather] = useState({});
  const [cityData, setCityData] = useState(false);

  const getValueTyped = (event) => {
    setCityData(false);
    const searchedValue = event.target.value;
    setCity(searchedValue);
  };

  const fetchWeather = (response) => {
    setCityData(true);
    let weather = {
      weatherCondition: response.data.weather[0].description,
      weatherIconDescription: response.data.weather[0].main,
      currentTemp: Math.round(response.data.main.temp),
      humidity: Math.round(response.data.main.humidity),
      wind: Math.round(response.data.wind.speed),
    };
    setCurrentWeather(weather);
  };

  const submittedValue = (event) => {
    event.preventDefault();
    const apiKey = "5da7b2dc058f07286fea39c4cee516a3";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(fetchWeather);
  };

  return (
    <div className="Weather">
      <form className="search-form">
        <input
          type="search"
          className="search-input"
          placeholder="Type a city"
          onChange={getValueTyped}
        />
        <input type="submit" onClick={submittedValue} className="btn" />
      </form>

      {cityData ? (
        <div className="main-container">
          <div className="current-weather-container">
            <div>
              <h1>{city.toUpperCase()}</h1>
              <ul>
                <li>
                  <span>
                    <DateTime />
                  </span>
                  , {currentWeather.weatherCondition}
                </li>
                <li>
                  Humidity: <strong>{currentWeather.humidity}%</strong>, Wind:{" "}
                  <strong>{currentWeather.wind} km/h</strong>
                </li>
              </ul>
            </div>
            <div className="temperature-container">
              <div className="weather-icon-current">
                <WeatherIcons icon={currentWeather.weatherIconDescription} />
              </div>

              <div className="inner-temp-container">
                <Units metric={currentWeather.currentTemp} />
              </div>
            </div>
          </div>
          <div>
            <Forecast city={city} />
          </div>
        </div>
      ) : (
        <div>
          <Geolocation />
        </div>
      )}
    </div>
  );
}
