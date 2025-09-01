import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainScreen from "./src/screens/MainScreen";
import SearchScreen from "./src/screens/SearchScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={MainScreen} options={{ title: "Weather" }} />
        <Stack.Screen name="Search" component={SearchScreen} options={{ title: "Search City" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
