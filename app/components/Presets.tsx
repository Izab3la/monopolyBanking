import * as React from "react";
import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { Card, Snackbar, Text } from "react-native-paper";

import { PresetI } from "../data";

export default function Presets({
    onSelectPreset,
}: {
    onSelectPreset: (preset: PresetI) => void;
}) {
    const [presets, setPresets] = useState([]);

    const [errorVisible, setErrorVisible] = useState(false);
    const [error, setError] = useState("");

    async function fetchPresets() {
        try {
            const res = await fetch(
                "https://raw.githubusercontent.com/Izab3la/monopolyBanking/main/assets/variants.json",
            );
            const data = await res.json();

            const presets = await Promise.all(data.map(fetchPreset));

            setPresets(presets);
        } catch (error) {
            console.error("could not fetch presets: ", error);
            setErrorVisible(true);
            setError("Failed to fetch presets. Please try again later.");
        }
    }

    async function fetchPreset(uri: string): Promise<PresetI | undefined> {
        try {
            const res = await fetch(uri);
            const data = await res.json();
            return data;
        } catch (error) {
            console.error(`could not fetch preset [${uri}]: `, error);
        }
        return undefined;
    }

    useEffect(() => {
        fetchPresets();
    }, []);

    return (
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
                data={presets}
                renderItem={({
                    item: preset,
                    index,
                }: {
                    item: PresetI;
                    index: number;
                }) => (
                    <Card
                        key={index}
                        style={{ marginHorizontal: 10, marginVertical: 5 }}
                        onPress={() => onSelectPreset(preset)}
                    >
                        <Card.Content>
                            <Text>{preset.name}</Text>
                            <Text>{JSON.stringify(preset, null, 2)}</Text>
                        </Card.Content>
                    </Card>
                )}
            />

            <Snackbar visible={errorVisible} onDismiss={() => setErrorVisible(false)}>
                {error}
            </Snackbar>
        </View>
    );
}
