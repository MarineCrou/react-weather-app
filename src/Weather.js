import { useState } from "react";
import axios from "axios";

import Geolocation from "./Geolocation";
import DateTime from "./DateTime";
import Forecast from "./css/Forecast";

export default function Weather() {
  const [city, setCity] = useState(null);
  const [currentWeather, setCurrentWeather] = useState({});
  const [cityData, setCityData] = useState(false);
  //   const [units, setUnits] = useState("metric");
  //   const [metric, setMetric] = useState(true);

  //   const changeMetric = (event) => {
  //     event.preventDefault();
  //     setMetric(false);
  //     setUnits("farenheight");
  //   };

  const getValueTyped = (event) => {
    setCityData(false);
    console.log();
    const searchedValue = event.target.value;
    setCity(searchedValue);
  };

  const fetchWeather = (response) => {
    setCityData(true);
    console.log(response.data);
    let weather = {
      weatherCondition: response.data.weather[0].description,
      currentTemp: Math.round(response.data.main.temp),
      humidity: Math.round(response.data.main.humidity),
      wind: Math.round(response.data.wind.speed),
    };
    setCurrentWeather(weather);
  };

  const submittedValue = (event) => {
    event.preventDefault();
    const apiKey = "875216e64e4abd111e8dd3c5f75dc098";
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
              <h1>{city}</h1>
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
              <p>☀️</p>
              <div>
                <span className="temperature">
                  {currentWeather.currentTemp}
                </span>
                <span className="unit">°C</span>
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
