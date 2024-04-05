import * as React from "react";
import { useEffect, useState } from "react";
import { BackHandler, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Text } from "react-native-paper";

import Players from "../components/Players.tsx";
import Presets, { PresetI } from "../components/Presets.tsx";

export default function Setup() {
  const [step, setStep] = useState(0);
  const [preset, setPreset] = useState(null);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const backAction = () => {
      if (step > 0) {
        if (step === 1) {
          setPlayers([]);
        }
        setStep(step - 1);

        return true;
      }

      return false;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction,
    );

    return () => backHandler.remove();
  }, [step]);

  function onSelectPreset(preset: PresetI) {
    setPreset(preset);
    setStep(1);
  }

  function onConfirmPlayers() {
    setStep(2);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {[
        <Presets onSelectPreset={onSelectPreset} />,
        <View style={{ flex: 1 }}>
          <Players players={players} setPlayers={setPlayers} />
          <Button
            style={{
              margin: 10,
              height: 50,
              justifyContent: "center",
            }}
            mode="elevated"
            onPress={onConfirmPlayers}
          >
            Confirm
          </Button>
        </View>,
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>{JSON.stringify(preset)}</Text>
          <Text>{JSON.stringify(players)}</Text>
        </View>,
      ][step]}

      <StatusBar />
    </SafeAreaView>
  );
}
