import * as React from "react";
import {
    Text,
    DataTable,
    IconButton
} from "react-native-paper";

import { PropertyI } from "../data";
import { formatCurrency } from "../helpers";

export default function PropertiesBuyList({ properties, onPay }: { properties: PropertyI[], onPay: (name: string) => void }) {
    return (
        <DataTable>
            {properties.map((property) => (
                <DataTable.Row key={property.name}>
                    <DataTable.Cell><Text textBreakStrategy="simple">{property.name}</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text style={{ color: "red" }}>{formatCurrency(property.price)}</Text></DataTable.Cell>
                    <DataTable.Cell numeric>
                        <IconButton icon="cash-fast" onPress={() => onPay(property.name)} />
                    </DataTable.Cell>
                </DataTable.Row>
            ))}
        </DataTable>
    );
}
