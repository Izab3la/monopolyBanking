import * as React from "react";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Button,
  Card,
  Icon,
  IconButton,
  Modal,
  Portal,
  Text,
  TextInput,
} from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { BackHandler } from "react-native";

import { transfer } from "../GameReducer.ts";
import { PlayerI } from "../components/Players.tsx";
import PlayersList from "../components/PlayersList.tsx";

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
  const player = useSelector(
    ({ players }: { players: PlayerI[] }) => players,
  ).find((player: PlayerI) => player.name === name);
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");

  function sendTransfer() {
    try {
      dispatch(
        transfer({
          from: player.name,
          to,
          amount: Number(amount),
        }),
      );
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        padding: 10,
      }}
    >
      <Portal>
        <Modal
          visible={visible}
          onDismiss={() => setVisible(0)}
          contentContainerStyle={{
            flex: 1,
            backgroundColor: "white",
            padding: 20,
            margin: 20,
          }}
        >
          <PlayersList
            onPlayerPress={(name: string) => {
              setTo(name);
              setVisible(false);
            }}
            exclude={[player.name]}
          />
        </Modal>
      </Portal>

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
          {player.name}
        </Text>
        <Text variant="displayLarge">${player.balance}</Text>
      </View>

      <Card style={{ marginHorizontal: 10 }}>
        <Card.Content
          style={{
            gap: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <TextInput
              style={{
                flex: 1,
              }}
              mode="outlined"
              label="Ammount"
              inputMode="numeric"
              value={amount}
              onChangeText={setAmount}
            />
            <IconButton icon="arrow-up" onPress={sendTransfer} size={40} />
          </View>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Icon source="arrow-right" size={40} />
            <Button
              style={{ flex: 1 }}
              mode="outlined"
              onPress={() => setVisible(true)}
            >
              {to || "To"}
            </Button>
          </View>
        </Card.Content>
      </Card>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
