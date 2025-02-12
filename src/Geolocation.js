import axios from "axios";
import { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";

import DateTime from "./DateTime";
import Forecast from "./css/Forecast";

export default function Geolocation() {
  const [position, setPosition] = useState(null);
  const [geolocWeather, setGeolocWeather] = useState({});

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error);
  }, [position]);

  const getGeolocationWeather = (response) => {
    let weather = {
      city: response.data.name,
      weatherCondition: response.data.weather[0].description,
      currentTemp: Math.round(response.data.main.temp),
      humidity: Math.round(response.data.main.humidity),
      wind: Math.round(response.data.wind.speed),
    };
    setGeolocWeather(weather);
  };

  const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setPosition({ latitude, longitude });

    const apiKey = "875216e64e4abd111e8dd3c5f75dc098";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(getGeolocationWeather);
  };

  const error = () => {
    console.error("Error getting geolocation");
    return "We could not retieve your geolocation";
  };

  return (
    <div>
      {position ? (
        <div>
          <div>
            <h1>{geolocWeather.city}</h1>
            <ul>
              <li>
                <span>
                  <DateTime />
                </span>
                , {geolocWeather.weatherCondition}
              </li>
              <li>
                Humidity: <strong>{geolocWeather.humidity}%</strong>, Wind:{" "}
                <strong>{geolocWeather.wind} km/h</strong>
              </li>
            </ul>
          </div>
          <div className="temperature-container d-flex justify-content-end">
            <i className="wi wi-day-lightning"></i>
            <div>
              <span className="temperature">{geolocWeather.currentTemp}</span>
              <span className="unit">°C</span>
            </div>
          </div>
          {/* Forecast */}
          <div>
            <Forecast city={geolocWeather.city} />
          </div>
        </div>
      ) : (
        <div>
          {" "}
          <ThreeDots
            visible={true}
            height="60"
            width="60"
            color="#410099"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
          <p>Getting your location...</p>
        </div>
      )}
    </div>
  );
}
