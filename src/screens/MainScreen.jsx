import * as Location from "expo-location";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { fetchForecastByCity, fetchWeatherByCoords } from "../api/weather";
import ForecastItem from "../components/ForecastItem";
import WeatherCard from "../components/WeatherCard";

export default function MainScreen({ navigation }) {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        setLoading(false);
        return;
      }

      try {
        let location = await Location.getCurrentPositionAsync({});
        const currentWeather = await fetchWeatherByCoords(
          location.coords.latitude,
          location.coords.longitude
        );
        setWeather(currentWeather);

        if (currentWeather.name) {
          const forecastData = await fetchForecastByCity(currentWeather.name);
          const daily = forecastData.list.filter((_, index) => index % 8 === 0);
          setForecast(daily);
        }
      } catch (err) {
        setErrorMsg("Error fetching weather data");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (errorMsg) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>{errorMsg}</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1501973801540-537f08ccae7b",
      }}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        {weather && (
          <View style={styles.card}>
            <WeatherCard weather={weather} />
          </View>
        )}

        <Text style={styles.subtitle}>5-Day Forecast</Text>

        <FlatList
          data={forecast}
          horizontal
          keyExtractor={(item) => item.dt.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <ForecastItem item={item} />
            </View>
          )}
        />

        <View style={{ marginTop: 20 }}>
          <Button
            title="Search City"
            onPress={() => navigation.navigate("Search")}
            color="#0077b6"
          />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 20,
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: 15,
    marginVertical: 10,
    marginRight: 10,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
    color: "white",
    textAlign: "center",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  error: {
    color: "red",
    fontSize: 16,
    fontWeight: "bold",
  },
});
