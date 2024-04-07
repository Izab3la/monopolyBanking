import * as React from "react";
import {
    Text,
    DataTable,
    IconButton
} from "react-native-paper";

import { CardI } from "../data";
import CurrencyFormatter from "./CurrencyFormatter";

export default function TransferCardList({ cards, onCardActionPress }: { cards: CardI[], onCardActionPress: (name: string) => void }) {
    return (
        <DataTable>
            {cards.map((card, key) => (
                <DataTable.Row key={key}>
                    <DataTable.Cell><Text textBreakStrategy="simple">{card.name}</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text style={{ color: ["bank", "all players"].includes(card.payer) ? "green" : "red" }}><CurrencyFormatter amount={card.amount} /></Text></DataTable.Cell>
                    <DataTable.Cell numeric>
                        <IconButton icon="cash-fast" onPress={() => onCardActionPress(card.name)} />
                    </DataTable.Cell>
                </DataTable.Row>
            ))}
        </DataTable>
    );
}
