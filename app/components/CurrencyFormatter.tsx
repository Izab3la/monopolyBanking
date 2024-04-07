import { Text } from "react-native-paper";

import { getNaming } from "../helpers";

export default function CurrencyFormatter({ amount, color = "none" }: { amount: number, color?: string }) {
    const currency = getNaming().currency;
    const putSeparators = (x: number) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    switch (currency) {
        case "USD":
            return <Text style={{ color }}>$ {amount}</Text>;
        case "EUR":
            return <Text style={{ color }}>{putSeparators(amount)}€</Text>;
        case "MON":
            return <><Text style={{ color }}>{putSeparators(amount)}</Text><Text style={{ textDecorationLine: "line-through", color }}>M</Text></>;
        default:
            return <Text style={{ color }}>{amount} {currency}</Text>;
    }
}