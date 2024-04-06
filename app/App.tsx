import * as React from "react";
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider as ReduxProvider } from "react-redux";

import { store } from "./GameReducer.ts";
import Home from "./pages/Home.tsx";
import Setup from "./pages/Setup.tsx";
import Game from "./pages/Game.tsx";
import Player from "./pages/Player.tsx";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "red",
    secondary: "pink",
  },
};

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ReduxProvider store={store}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Setup">
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="Setup"
              component={Setup}
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="Game"
              component={Game}
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="Player"
              component={Player}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </ReduxProvider>
  );
}
