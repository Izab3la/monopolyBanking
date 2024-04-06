import * as React from "react";
import { useEffect, useState, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { Animated, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, Card } from "react-native-paper";
import { BackHandler } from "react-native";

import { getPlayers, getMiddles, getDuo, getSpecials } from "../helpers";
import { PlayerI, PropertyI } from "../data";
import CustomTransaction from "../components/CustomTransaction";
import PropertiesBuyList from "../components/PropertiesBuyList";

function CustomCard({ properties, label }: { properties: PropertyI[], label: string }) {
    const [expanded, setExpanded] = useState(true);
    const expandAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => { setExpanded(false); }, []);

    return (
        <Card style={{
            marginHorizontal: 10,
            marginBottom: 10,
        }}
            onPress={
                () => Animated.timing(expandAnim, {
                    toValue: expanded ? 0 : 500,
                    duration: 500,
                    useNativeDriver: false,
                }).start(() => setExpanded(!expanded))
            }
        >
            <Card.Content>
                <Text style={{ paddingHorizontal: 5 }} variant="titleMedium">{label}</Text>
                <Animated.View
                    style={{
                        maxHeight: expandAnim,
                        overflow: "hidden",
                    }}
                >
                    <PropertiesBuyList properties={properties} onPay={() => {
                        console.log("buy");
                    }} />
                </Animated.View>
            </Card.Content>
        </Card>
    )
}

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
                    <View style={{
                        marginHorizontal: 10,
                        marginVertical: 10,
                    }}>
                        <CustomTransaction from={player?.name} />
                    </View>
                )}

                <CustomCard label="Middles" properties={getMiddles()} />
                <CustomCard label="Duo" properties={getDuo()} />
                <CustomCard label="Specials" properties={getSpecials()} />
            </ScrollView>

            <StatusBar style="auto" />
        </SafeAreaView>
    );
}
