import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { getWeatherIcon } from "../utils";

export default function WeatherCard({ weather }) {
  if (!weather || weather.cod !== 200) return null;

  return (
    <View style={styles.card}>
      <Text style={styles.city}>{weather.name}</Text>
      <Text style={styles.temp}>{Math.round(weather.main.temp)}°C</Text>
      <Image
        source={{ uri: getWeatherIcon(weather.weather[0].icon) }}
        style={styles.icon}
      />
      <Text style={styles.condition}>{weather.weather[0].description}</Text>
      <Text>Humidity: {weather.main.humidity}%</Text>
      <Text>Wind: {weather.wind.speed} m/s</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    backgroundColor: "#e0f7fa",
    padding: 20,
    borderRadius: 12,
    margin: 10,
  },
  city: { fontSize: 24, fontWeight: "bold" },
  temp: { fontSize: 40, marginVertical: 10 },
  icon: { width: 80, height: 80 },
  condition: { fontSize: 18, fontStyle: "italic", marginBottom: 10 },
});
