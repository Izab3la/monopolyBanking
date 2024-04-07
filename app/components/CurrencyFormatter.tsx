import { Text } from "react-native-paper";

import { getNaming } from "../helpers";

export default function CurrencyFormatter({ amount }: { amount: number }) {
    const currency = getNaming().currency;
    const putSeparators = (x: number) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    switch (currency) {
        case "USD":
            return <Text>$ {amount}</Text>;
        case "EUR":
            return <Text>{putSeparators(amount)}€</Text>;
        case "MON":
            return <><Text>{putSeparators(amount)}</Text><Text style={{ textDecorationLine: "line-through" }}>M</Text></>;
        default:
            return <Text>{amount} {currency}</Text>;
    }
}