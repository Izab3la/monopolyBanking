import * as React from "react";
import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, Card } from "react-native-paper";
import { BackHandler } from "react-native";

import { getPlayers, getMiddles, getDuo, getSpecials, buyProperty, transfer, getDistricts, getNaming, formatCurrency, getCardStacks, useCard } from "../helpers";
import { PlayerI } from "../data";
import CustomTransaction from "../components/CustomTransaction";
import PropertiesBuyList from "../components/PropertiesBuyList";
import ExpandableCard from "../components/ExpandableCard";
import TransferCardList from "../components/TransferCardList";

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
    const naming = getNaming()

    function onTransfer(to: string, amount: number) {
        try {
            transfer(player?.name, to, amount);
        } catch (error) {
            console.error("Error transfering money", error);
        }
    }

    const districts = getDistricts();
    const middles = getMiddles();
    const duo = getDuo();
    const specials = getSpecials();

    function onBuyProperty(name: string) {
        try {
            buyProperty(player?.name, name);
        } catch (error) {
            console.error("Error buying property", error)
        }
    }

    const cardStacks = getCardStacks()

    function onCardTransaction(name: string) {
        try {
            useCard(player?.name, name)
        } catch (error) {
            console.error("Error using transfer card", error)
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
                <Text variant="displayLarge">{formatCurrency(player?.balance)}</Text>
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

                <ExpandableCard label={naming.districts} maxHeight={districts.reduce((acc, d) => acc + d.members.length * 80, 0)}>
                    {districts.map((district, key) => (
                        <View
                            key={key}
                            style={{
                                marginVertical: 10,
                            }}
                        >
                            <Text variant="titleSmall" style={{ paddingHorizontal: 5 }}>{district.name}</Text>
                            <PropertiesBuyList properties={district.members} onPay={onBuyProperty} />
                        </View>
                    ))}
                </ExpandableCard>

                <ExpandableCard label={naming.middles}>
                    <PropertiesBuyList properties={middles} onPay={onBuyProperty} />
                </ExpandableCard>
                <ExpandableCard label={naming.duo}>
                    <PropertiesBuyList properties={duo} onPay={onBuyProperty} />
                </ExpandableCard>
                <ExpandableCard label={naming.specials}>
                    <PropertiesBuyList properties={specials} onPay={onBuyProperty} />
                </ExpandableCard>

                {cardStacks.map((stack, key) => (
                    <ExpandableCard key={key} label={stack.name} maxHeight={stack.name.length * 80}>
                        <TransferCardList cards={stack.cards.filter((card) => card.action === "transfer")} onCardActionPress={onCardTransaction} />
                    </ExpandableCard>
                ))}
            </ScrollView>

            <StatusBar style="auto" />
        </SafeAreaView>
    );
}
