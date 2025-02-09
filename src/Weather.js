// 1.1 create form
// 1.2 get value searched by end-user
export default function Weather() {
  return (
    <div className="Weather">
      <form>
        <input type="search" placeholder="Type a city" />
        <input type="submit" />
      </form>
      {/* Current Weather */}
      <div>
        <p>City Name</p>
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
