import { useState } from "react";
import axios from "axios";
import Date from "./DateTime";

export default function Weather() {
  let [city, setCity] = useState(null);
  let [currentWeather, setCurrentWeather] = useState({});
  let [cityData, setCityData] = useState(false);

  // 1.2 get value searched by end-user
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
      <form>
        <input
          type="search"
          placeholder="Type a city"
          onChange={getValueTyped}
        />
        <input type="submit" onClick={submittedValue} />
      </form>

      {cityData ? (
        <div>
          <div>
            <p>{city}</p>
            <p>
              <Date />, {currentWeather.weatherCondition}
            </p>
            <p>
              Humidity: {currentWeather.humidity}%, Wind: {currentWeather.wind}
              km/h
            </p>
          </div>
          <div>
            <p>{currentWeather.icon}☀️</p>
            <p>{currentWeather.currentTemp} °C</p>
          </div>
          {/* Forecast */}
          <div>
            <p>Forecast</p>
          </div>
        </div>
      ) : (
        <div>
          <div>
            <p>Paris</p>
            {/* 1.3 Get current Day & Time */}
            <p>
              <Date />, Overcast of clouds
            </p>
            <p>Humidity: 74%, Wind: 12% km/h</p>
          </div>
          <div>
            <p>☀️</p>
            <p>12°C</p>
          </div>
          {/* Forecast */}
          <div>
            <p>Forecast</p>
          </div>{" "}
        </div>
      )}
    </div>
  );
}
