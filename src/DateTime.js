export default function DateTime() {
  const today = new Date();
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

  const hour = today.getHours();
  const min = today.getMinutes();
  console.log(weekDay);

  return (
    <>
      {" "}
      {weekDay} {hour}:{min}
    </>
  );
}
