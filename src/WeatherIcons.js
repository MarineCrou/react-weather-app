import { useEffect, useState } from "react";

export default function WeatherIcons({ icon }) {
  let [weatherIcon, setWeatherIcon] = useState("");
  
  useEffect(() => {
    if (icon) {
      iconSelection();
      console.log(weatherIcon);
    }
  }, []);

  const iconSelection = () => {
    const icons = {
      Clear: "☀️",
      Clouds: "☁️",
      Thunderstorm: "⛈️",
      Dizzle: "🌦️",
      Rain: "🌧️",
      Snow: "🌨️",
      Mist: "🌫️",
      Fog: "🌫️",
      Haze: "🌁",
      Dust: "💨",
      Sand: "🏖️",
      Ash: "💨",
      Tornado: "🌪️",
    };
    const matchWeatherIcon = icons[icon] || "🌤️";
    setWeatherIcon(matchWeatherIcon);
  };

  return <div className="WeatherIcons">{weatherIcon}</div>;
}
