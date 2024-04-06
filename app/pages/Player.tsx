import * as React from "react";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native-paper";
import { BackHandler } from "react-native";

import { getPlayers } from "../helpers.ts";
import { PlayerI } from "../components/Players.tsx";
import CustomTransaction from "../components/CustomTransaction.tsx";

export default function Player({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        navigation.goBack();
        return true;
      },
    );

    return () => backHandler.remove();
  }, []);

  const { name } = route.params;
  const player = getPlayers().find(
    (player: PlayerI) => player.name === name,
  ) as PlayerI | undefined;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        padding: 10,
      }}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginVertical: 50,
          gap: 20,
        }}
      >
        <Text
          variant="titleSmall"
          style={{
            color: "gray",
          }}
        >
          {player?.name}
        </Text>
        <Text variant="displayLarge">${player?.balance}</Text>
      </View>

      {player?.name && <CustomTransaction from={player?.name} />}

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
