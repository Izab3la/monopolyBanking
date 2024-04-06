import * as React from "react";
import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, Card } from "react-native-paper";
import { BackHandler } from "react-native";

import { getPlayers, getMiddles, getDuo, getSpecials, buyProperty, transfer } from "../helpers";
import { PlayerI } from "../data";
import CustomTransaction from "../components/CustomTransaction";
import PropertiesBuyList from "../components/PropertiesBuyList";
import ExpandableCard from "../components/ExpandableCard";

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
    const player = getPlayers((player: PlayerI) => player.name === name)?.[0] as PlayerI | undefined;

    function onTransfer(to: string, amount: number) {
        console.log("Transfering money");
        try {
            transfer(player?.name, to, amount);
        } catch (error) {
            console.error("Error transfering money", error);
        }
    }
    function onBuyProperty(name: string) {
        try {
            buyProperty(player?.name, name);
        } catch (error) {
            console.error("Error buying property", error)
        }
    }

    return (
        <SafeAreaView
            style={{
                flex: 1,
                gap: 10,
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

            <ScrollView style={{
                flex: 1,
            }}>
                {player?.name && (
                    <Card style={{
                        marginHorizontal: 10,
                        marginVertical: 10,
                    }}>
                        <Card.Content>
                            <CustomTransaction from={player?.name} onPay={onTransfer} />
                        </Card.Content>
                    </Card>
                )}

                <ExpandableCard label="Middles">
                    <PropertiesBuyList properties={getMiddles()} onPay={onBuyProperty} />
                </ExpandableCard>
                <ExpandableCard label="Duo">
                    <PropertiesBuyList properties={getDuo()} onPay={onBuyProperty} />
                </ExpandableCard>
                <ExpandableCard label="Specials">
                    <PropertiesBuyList properties={getSpecials()} onPay={onBuyProperty} />
                </ExpandableCard>
            </ScrollView>

            <StatusBar style="auto" />
        </SafeAreaView>
    );
}
