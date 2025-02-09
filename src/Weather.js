import { useState } from "react";

export default function Weather() {
  let [city, setCity] = useState(null);

  // 1.2 get value searched by end-user
  const getValueTyped = (event) => {
    console.log();
    const searchedValue = event.target.value;
    setCity(searchedValue);
  };
  const submittedValue = () => {};

  return (
    <div className="Weather">
      {/* 1.1 create form */}
      <form>
        <input
          type="search"
          placeholder="Type a city"
          onChange={getValueTyped}
        />
        <input type="submit" onSubmit={submittedValue} />
      </form>
      {/* Current Weather */}
      <div>
        <p>{city}</p>
        {/* 1.3 Get current Day & Time */}
        <p>Day Time, Weather Condition</p>
        <p>Humidity: 89%, Wind: 1.54km/h</p>
      </div>
      <div>
        <p>icon ☀️</p>
        <p>Temp °C</p>
      </div>
      {/* Forecast */}
      <div>
        <p>Forecast</p>
      </div>
    </div>
  );
}
