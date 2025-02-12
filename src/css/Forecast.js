import axios from "axios";
import { useState } from "react";

export default function Forecast({ latitude, longitude }) {
  const [forecastData, setForecastData] = useState({});

  const getForecast = (response) => {
    console.log(response);
  };

  const callApi = () => {
    console.log(`lat: ${latitude}, lon: ${longitude}`);
    const apiKey = "875216e64e4abd111e8dd3c5f75dc098";
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(forecastUrl).then(getForecast);
  };
  callApi();
  // return 5 days

  return <div>"hello"</div>;
}
