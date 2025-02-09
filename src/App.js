// 1.1 create form
// 1.2 get value searched by end-user
// 1.3. Axios - Connect to openWeather API
// 2. Get weather forecast for the following 5 days

import Footer from "./Footer";
import Weather from "./Weather";

import "./css/App.css";

function App() {
  return (
    <div className="App">
      <Weather />
      <Footer />
    </div>
  );
}

export default App;
