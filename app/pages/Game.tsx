import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

import PlayersList from "../components/PlayersList.tsx";

export default function Game({ navigation }: { navigation: any }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PlayersList
        onPlayerPress={(name: string) => {
          navigation.navigate("Player", { name });
        }}
      />

      <StatusBar />
    </SafeAreaView>
  );
}
