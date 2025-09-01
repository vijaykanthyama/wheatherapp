import { API_KEY, BASE_URL } from "../config";

// Current weather by latitude/longitude
export const fetchWeatherByCoords = async (lat, lon) => {
  const res = await fetch(
    `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
  );
  return res.json();
};

// Current weather by city name
export const fetchWeatherByCity = async (city) => {
  const res = await fetch(
    `${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`
  );
  return res.json();
};

//5-days forecast by city name
export const fetchForecastByCity = async (city) => {
  const res = await fetch(
    `${BASE_URL}/forecast?q=${city}&units=metric&appid=${API_KEY}`
  );
  return res.json();
};
