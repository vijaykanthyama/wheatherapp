// Convert timestamp → Day name
export const formatDate = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toDateString().split(" ")[0]; // "Mon", "Tue"
};

// Get OpenWeather icon URL
export const getWeatherIcon = (iconCode) =>
  `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
