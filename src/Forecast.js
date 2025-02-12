import axios from "axios";
import { useEffect, useState } from "react";

import "./css/Forecast.css";
import WeatherIcons from "./WeatherIcons";

export default function Forecast({ city }) {
  const [forecastData, setForecastData] = useState({});

  useEffect(() => {
    if (city) {
      callApi();
    }
  }, [city]);

  let getForecast = (response) => {
    console.log(response.data);

    const allForecasts = response.data.list;
    const nineAmData = allForecasts.filter((hour) => {
      return hour.dt_txt.includes("09:00:00");
    });

    let daysOfTheWeek = nineAmData.map((index) => {
      const unixSeconds = index.dt;
      const date = new Date(unixSeconds * 1000);
      const dayOfWeek = date.toLocaleDateString("en-US", {
        weekday: "short",
      });
      return dayOfWeek;
    });

    let temperature = nineAmData.map((index) => {
      const temp = Math.round(index.main.temp_max);
      return temp;
    });

    let weatherIcon = nineAmData.map((item) => {
      const mainDescription = item.weather[0].main;
      console.log(mainDescription);
      return mainDescription;
    });

    let weather = {
      temp: temperature,
      weekDay: daysOfTheWeek,
      icon: weatherIcon,
    };
    setForecastData(weather);
  };

  const callApi = () => {
    const apiKey = "515c9ddbeb3cda9061acfab71031839e";
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(forecastUrl).then(getForecast);
  };
  console.log(forecastData.icon);

  return (
    <div className="Forecast">
      {forecastData.temp && forecastData.weekDay && forecastData.icon ? (
        forecastData.weekDay.map((day, index) => (
          <ul key={index}>
            <li className="forecast-time">{day}</li>
            <li className="weather-icon">
              <WeatherIcons icon={forecastData.icon[index]} />
            </li>
            <li className="forecast-temperature">
              {forecastData.temp[index]}°C
            </li>
          </ul>
        ))
      ) : (
        <p>Loading forecast...</p>
      )}
    </div>
  );
}
