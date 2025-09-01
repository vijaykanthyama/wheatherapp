import { useState } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  ImageBackground,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { fetchForecastByCity, fetchWeatherByCity } from "../api/weather";
import ForecastItem from "../components/ForecastItem";
import WeatherCard from "../components/WeatherCard";

export default function SearchScreen({ navigation }) {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const searchWeather = async () => {
    if (!city.trim()) {
      setErrorMsg("Please enter a city name");
      return;
    }

    setLoading(true);
    setErrorMsg("");
    setWeather(null);
    setForecast([]);

    try {
      const data = await fetchWeatherByCity(city.trim());
      setWeather(data);

      if (data.cod == 200) {
        const forecastData = await fetchForecastByCity(city.trim());
        if (forecastData.cod == 200) {
          const daily = forecastData.list.filter((_, index) => index % 8 === 0);
          setForecast(daily);
        }
        setCity("");
        Keyboard.dismiss();
      } else {
        setErrorMsg("City not found. Try again.");
      }
    } catch (err) {
      setErrorMsg("Error fetching data. Please check your network or API key.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1501973801540-537f08ccae7b",
      }}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <TextInput
          placeholder="Enter city name"
          placeholderTextColor="#ddd"
          style={styles.input}
          value={city}
          onChangeText={setCity}
          onSubmitEditing={searchWeather}
        />
        <Button title="Search" onPress={searchWeather} color="#0077b6" />

        {loading && <ActivityIndicator size="large" style={{ marginTop: 20 }} />}

        {errorMsg ? <Text style={styles.error}>{errorMsg}</Text> : null}

        {weather && !loading && (
          <View style={styles.card}>
            <WeatherCard weather={weather} />
          </View>
        )}

        {forecast.length > 0 && (
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
        )}
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
    backgroundColor: "rgba(0,0,0,0.4)", // dark overlay
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#fff",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: "rgba(255,255,255,0.2)",
    color: "white",
  },
  error: {
    color: "red",
    marginTop: 10,
    fontWeight: "bold",
    textAlign: "center",
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
});
