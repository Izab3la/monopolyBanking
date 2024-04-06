import * as React from "react";
import { useState, useRef } from "react";
import { Animated } from "react-native";
import { Text, Card } from "react-native-paper";

export default function ExpandableCard({ children, label, maxHeight = 500 }: { children: React.ReactNode, label: string, maxHeight?: number }) {
    const [expanded, setExpanded] = useState(false);
    const expandAnim = useRef(new Animated.Value(0)).current;

    return (
        <Card style={{
            marginHorizontal: 10,
            marginBottom: 10,
        }}
            onPress={
                () => Animated.timing(expandAnim, {
                    toValue: expanded ? 0 : maxHeight,
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
                    {children}
                </Animated.View>
            </Card.Content>
        </Card>
    )
}
