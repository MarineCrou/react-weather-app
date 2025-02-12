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
  }, []);

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
            <p>{geolocWeather.city}</p>
            <p>
              <DateTime />, {geolocWeather.weatherCondition}
            </p>
            <p>
              Humidity: {geolocWeather.humidity}%, Wind: {geolocWeather.wind}
              km/h
            </p>
          </div>
          <div>
            <p>{geolocWeather.icon}☀️</p>
            <p>{geolocWeather.currentTemp} °C</p>
          </div>
          {/* Forecast */}
          <div>
            <Forecast
              latitude={position.latitude}
              longitude={position.longitude}
            />
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
