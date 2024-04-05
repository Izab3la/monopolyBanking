import * as React from "react";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, FlatList } from "react-native";
import { Card, IconButton, Text, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

interface Player {
  name: string;
}

export default function Setup() {
  const [players, setPlayers] = useState([]);

  const [name, setName] = useState("");

  function addPlayer() {
    if (!name) return;
    if (players.some((player: Player) => player.name === name)) return;

    setPlayers([...players, { name }]);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          gap: 10,
        }}
      >
        <FlatList
          style={{
            flex: 1,
          }}
          data={players}
          renderItem={({
            item: player,
            index,
          }: {
            player: Player;
            index: number;
          }) => (
            <Card
              key={index}
              style={{ marginHorizontal: 10, marginVertical: 5 }}
            >
              <Card.Content>
                <Text>{player.name}</Text>
              </Card.Content>
            </Card>
          )}
        />

        <Card style={{ margin: 10 }}>
          <Card.Content
            style={{
              flexDirection: "row",
            }}
          >
            <TextInput
              style={{
                flex: 1,
              }}
              mode="outlined"
              label="Name"
              value={name}
              onChangeText={setName}
            />
            <IconButton icon="plus" onPress={addPlayer} size={40} />
          </Card.Content>
        </Card>
      </View>

      <StatusBar />
    </SafeAreaView>
  );
}
