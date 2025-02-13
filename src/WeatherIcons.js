import { useEffect, useState } from "react";

export default function WeatherIcons({ icon }) {
  let [weatherIcon, setWeatherIcon] = useState("");

  useEffect(() => {
    if (icon) {
      const weatherGifs = {
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
      const matchWeatherIcon = weatherGifs[icon] || "🌤️";
      setWeatherIcon(matchWeatherIcon);
    }
  }, [icon, weatherIcon]);

  return <div className="WeatherIcons">{weatherIcon}</div>;
}
