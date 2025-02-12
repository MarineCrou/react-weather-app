import axios from "axios";
import { useEffect, useState } from "react";

export default function Forecast({ city }) {
  const [forecastData, setForecastData] = useState({});

  useEffect(() => {
    if (city) {
      callApi(success, error);
    }
  }, [city]);

  let success = (response) => {
    const allForecasts = response.data.list;
    const nineAmDate = allForecasts.filter((hour) => {
      return hour.dt_txt.includes("09:00:00");
    });

    let daysOfTheWeek = nineAmDate.map((index) => {
      const unixSeconds = index.dt;
      const date = new Date(unixSeconds * 1000);
      const dayOfWeek = date.toLocaleDateString("en-US", {
        weekday: "short",
      });
      return dayOfWeek;
    });

    let temperature = nineAmDate.map((index) => {
      const temp = Math.round(index.main.temp_max);
      return temp;
    });

    let weather = {
      temp: temperature,
      weekDay: daysOfTheWeek,
    };
    setForecastData(weather);
  };

  let error = () => {
    console.log(`Could not retrieve city`);
  };

  const callApi = () => {
    const apiKey = "515c9ddbeb3cda9061acfab71031839e";
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(forecastUrl).then(success);
  };

  return (
    <div>
      {forecastData.temp && forecastData.weekDay ? (
        forecastData.weekDay.map((day, index) => (
          <p key={index}>
            {day}: {forecastData.temp[index]}°C
          </p>
        ))
      ) : (
        <p>Loading forecast...</p>
      )}
    </div>
  );
}
