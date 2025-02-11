import { now } from "moment/moment";
import { useState } from "react";

export default function DateTime() {
  const today = new Date();
  const [time, setTime] = useState(now);

  const updateTime = () => {
    const currentTime = new Date().toLocaleTimeString();
    setTime(currentTime);
  };

  setInterval(updateTime, 1000);

  const day = today.getDay();
  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let weekDay = weekDays[day];
  return (
    <>
      {" "}
      {weekDay} {time}
    </>
  );
}
