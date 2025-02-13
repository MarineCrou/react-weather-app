import { useEffect, useState } from "react";
import "./css/Units.css";

export default function Units({ unitTemp }) {
  console.log(unitTemp);
  const [unit, setUnit] = useState(unitTemp);
  const [activeUnit, setActiveUnit] = useState("metric");

  const getMetric = (e) => {
    e.preventDefault();
    setActiveUnit("metric");
    setUnit(unitTemp);
  };
  const getImperial = (e) => {
    e.preventDefault();
    setActiveUnit("imperial");
    let imperial = Math.round(unitTemp * (9 / 5) + 32);
    setUnit(imperial);
  };

  return (
    <div>
      <span className="temperature">{unit}</span>
      {/* adding a conditional class */}
      <a href="/" className="unit" onClick={getMetric}>
        °C |
      </a>
      <a href="/" className="unit" onClick={getImperial}>
        °F
      </a>
    </div>
  );
}
