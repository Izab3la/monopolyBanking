import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
  Text,
} from "react-native-paper";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "red",
    secondary: "pink",
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text variant="displayLarge">App</Text>
        <StatusBar style="auto" />
      </View>
    </PaperProvider>
  );
}
