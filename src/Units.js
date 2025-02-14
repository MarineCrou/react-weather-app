import { useState } from "react";
import "./css/Units.css";

export default function Units({ metric }) {
  const [unit, setUnit] = useState(metric);

  const getMetric = (e) => {
    e.preventDefault();
    setUnit(metric);
  };
  const getImperial = (e) => {
    e.preventDefault();
    let imperial = Math.round(metric * (9 / 5) + 32);
    setUnit(imperial);
  };
  if (metric) {
    return (
      <div>
        <span className="temperature">{unit}</span>
        {unit === metric ? (
          <span>
            <span className="unit ">°C </span>
            <a href="/" className="unit unit-inactive" onClick={getImperial}>
              | °F
            </a>
          </span>
        ) : (
          <span>
            <a href="/" className="unit unit-inactive" onClick={getMetric}>
              °C |
            </a>{" "}
            <span className="unit ">°F</span>
          </span>
        )}
      </div>
    );
  } else {
    return metric;
  }
}
