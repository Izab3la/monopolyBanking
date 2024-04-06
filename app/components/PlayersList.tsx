import * as React from "react";
import { FlatList } from "react-native";
import { Button, Text } from "react-native-paper";
import { useSelector } from "react-redux";

import { PlayerI } from "../components/Players.tsx";

export default function PlayersList({
  onPlayerPress,
  exclude = [],
}: {
  onPlayerPress: (name: string) => void;
  exclude: string[];
}) {
  const players = useSelector(
    ({ players }: { players: PlayerI[] }) => players,
  ).filter((player: PlayerI) => !exclude.includes(player.name));

  return (
    <FlatList
      style={{
        flex: 1,
      }}
      data={players}
      renderItem={({
        item: player,
        index,
      }: {
        item: PlayerI;
        index: number;
      }) => (
        <Button
          key={index}
          mode="elevated"
          style={{
            marginHorizontal: 10,
            marginVertical: 5,
            height: 50,
            justifyContent: "center",
          }}
          onPress={() => {
            onPlayerPress(player.name);
          }}
        >
          <Text>{player.name}</Text>
        </Button>
      )}
    />
  );
}
