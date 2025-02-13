import "./css/Footer.css";

export default function Footer() {
  return (
    <p className="Footer">
      This project was coded by{" "}
      <a
        href="https://marine.crouzet.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        Marine Crouzet
      </a>{" "}
      and is open-sourced on{" "}
      <a
        href="https://github.com/MarineCrou/react-weather-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub
      </a>{" "}
      & hosted on{" "}
      <a
        href="https://weather-app-react-test-1.netlify.app/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Netlify
      </a>
    </p>
  );
}
