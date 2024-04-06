import * as React from "react";
import { useState } from "react";
import { View } from "react-native";
import {
    Button,
    Icon,
    IconButton,
    Menu,
    TextInput,
} from "react-native-paper";

import { PlayerI } from "../data";
import { getPlayers } from "../helpers";

export default function CustomTransaction({ from, onPay }: { from: string, onPay: (name: string, amount: number) => void }) {
    const [visible, setVisible] = useState(false);
    const [to, setTo] = useState<string | undefined>(undefined);
    const [amount, setAmount] = useState("");

    function sendTransfer() {
        const am = Number(amount);
        if (!to || !am) return;

        onPay(to, am);
    }

    return (
        <View style={{
            gap: 10,
            flexDirection: "row",
            alignItems: "center",
        }}>
            <TextInput
                style={{
                    flex: 1,
                }}
                mode="outlined"
                label="Amount"
                inputMode="numeric"
                value={amount}
                onChangeText={setAmount}
            />

            <Icon source="arrow-right" size={40} />

            <Menu
                visible={visible}
                onDismiss={() => setVisible(false)}
                anchor={
                    <Button mode="outlined" onPress={() => setVisible(true)}>
                        {to || "To"}
                    </Button>
                }
            >
                {getPlayers((player: PlayerI) => player.name !== from).map(
                    (player: PlayerI, key: number) => (
                        <Menu.Item
                            key={key}
                            onPress={() => {
                                setTo(player.name);
                                setVisible(false);
                            }}
                            title={player.name}
                        />
                    ),
                )}
            </Menu>

            <IconButton
                icon="check"
                onPress={sendTransfer}
                size={40}
                disabled={!to || !Number(amount)}
            />
        </View>
    );
}
