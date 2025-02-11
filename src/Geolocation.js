import axios from "axios";
import { useEffect, useState } from "react";
import DateTime from "./DateTime";

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
    console.log(longitude, latitude);
    setPosition({ latitude, longitude });

    const apiKey = "875216e64e4abd111e8dd3c5f75dc098";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    // https://api.openweathermap.org/data/2.5/weather?lat=46.1616173&lon=-1.1697472&appid=875216e64e4abd111e8dd3c5f75dc098&units=metric
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
            <p>Forecast</p>
          </div>
        </div>
      ) : (
        <p>Getting your location...</p>
      )}
    </div>
  );
}
