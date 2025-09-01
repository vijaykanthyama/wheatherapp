import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { getWeatherIcon, formatDate } from "../utils";

export default function ForecastItem({ item }) {
  return (
    <View style={styles.item}>
      <Text style={styles.day}>{formatDate(item.dt)}</Text>
      <Image
        source={{ uri: getWeatherIcon(item.weather[0].icon) }}
        style={styles.icon}
      />
      <Text style={styles.temp}>{Math.round(item.main.temp)}°C</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    alignItems: "center",
    padding: 10,
    margin: 5,
    backgroundColor: "#fff3e0",
    borderRadius: 8,
  },
  day: { fontSize: 16, fontWeight: "bold" },
  icon: { width: 50, height: 50, marginVertical: 5 },
  temp: { fontSize: 18 },
});
