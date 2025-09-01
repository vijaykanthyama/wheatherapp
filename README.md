#  WeatherApp

A React Native Weather Application built as part of the [Backend/Frontend] Internship assignment for **Gurucool**.





##  Features
- Search weather by city
- Real-time weather data from OpenWeather API
- Displays temperature, humidity, and conditions
- Cross-platform support (Android/iOS)

---

##  Tech Stack
- React Native  
- OpenWeather API  
- Node.js / npm

## Code Snippets

###  Fetching Weather Data from API
javascript
const API_KEY = "key";

const getWeather = async (city) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
};
by using above code fetching the city wheaather and humidity....


