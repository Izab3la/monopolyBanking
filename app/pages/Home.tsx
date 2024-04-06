import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { Text } from "react-native-paper";

export default function Home() {
    return (
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
    );
}
