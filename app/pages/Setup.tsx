import * as React from "react";
import { useEffect, useState } from "react";
import { BackHandler, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Text } from "react-native-paper";
import { useDispatch } from "react-redux";

import { PlayerI, PresetI } from "../data";
import { addPlayers, usePreset } from "../GameReducer";
import Players from "../components/Players";
import Presets from "../components/Presets";

export default function Setup({ navigation }: { navigation: any }) {
    const [step, setStep] = useState(0);
    const [preset, setPreset] = useState<PresetI | undefined>(undefined);
    const [players, setPlayers] = useState<PlayerI[]>([]);

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

    const dispatch = useDispatch();
    function startGame() {
        dispatch(usePreset(preset));
        dispatch(addPlayers(players));
        navigation.navigate("Game");
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {[
                <Presets onSelectPreset={onSelectPreset} />,
                <View style={{ flex: 1 }}>
                    <Players
                        initialBalance={preset?.settings.playersBalance}
                        players={players}
                        setPlayers={setPlayers}
                    />
                    {players.length > 1 && <Button
                        style={{
                            margin: 10,
                            height: 50,
                            justifyContent: "center",
                        }}
                        mode="elevated"
                        onPress={onConfirmPlayers}
                    >
                        Confirm
                    </Button>}
                </View>,
                <SafeAreaView style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 10,
                }}>
                    <Text variant="headlineLarge">{preset?.name}</Text>

                    <Text variant="titleLarge">Players: {players?.map(p => p.name).join(", ")}</Text>

                    <Button onPress={startGame} mode="contained">
                        Start Game
                    </Button>
                </SafeAreaView>,
            ][step]}

            <StatusBar />
        </SafeAreaView>
    );
}
