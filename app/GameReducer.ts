import { configureStore, createSlice } from "@reduxjs/toolkit";

import { DistrictI, PlayerI, PropertyI, PresetI, CardStackI, CardI } from "./data";

type StateI = {
    name: string;
    uri: string;
    settings: {
        playersBalance: number;
        startBonus: number;
    };
    naming: {
        districts: string;
        members: string;
        middles: string;
        duo: string;
        specials: string;
        currency: string;
    };
    properties: {
        districts: DistrictI[];
        middles: PropertyI[];
        duo: PropertyI[];
        specials: PropertyI[];
    };
    cardStacks: CardStackI[];
    players: PlayerI[];
}

function transferFn(
    { players }: StateI,
    {
        payload,
    }: {
        payload: {
            from: string;
            to: string;
            amount: number;
        };
    },
): void {
    const payer = payload.from === "bank"
        ? { name: "bank", balance: Number.MAX_SAFE_INTEGER }
        : players.find((player: PlayerI) => player.name === payload.from);
    if (!payer) {
        throw new Error(`Player ${payload.from} does not exist`);
    }

    const recipient = payload.to === "bank"
        ? { name: "bank", balance: 0 }
        : players.find((player: PlayerI) => player.name === payload.to);
    if (!recipient) {
        throw new Error(`Player ${payload.to} does not exist`);
    }

    // TODO: Handle going in debt
    // Temparary solution is to have a negative balance
    // if (payer.balance < payload.amount) {
    //     throw new Error(`Player ${payer.name} does not have enough money`);
    // }

    payer.balance -= payload.amount;
    recipient.balance += payload.amount;
}
function buyPropertyFn(state: StateI, { payload }: { payload: { player: string; property: string } }): void {
    const player = state.players.find((p: PlayerI) => p.name === payload.player);
    if (!player) {
        throw new Error(`Player ${payload.player} does not exist`);
    }

    const propertyName = payload.property;
    const property =
        state.properties.middles.find((p) => p.name === propertyName)
        || state.properties.duo.find((p) => p.name === propertyName)
        || state.properties.specials.find((p) => p.name === propertyName)
        || state.properties.districts.reduce((acc: undefined | PropertyI, d) => {
            if (acc) {
                return acc;
            }
            return d.members.find((p) => p.name === propertyName)
        }, undefined);
    if (!property) {
        throw new Error(`Property ${propertyName} does not exist`);
    }

    try {
        transferFn(state, {
            payload: {
                from: player.name,
                to: "bank",
                amount: property.price
            }
        });
    } catch (error) {
        throw error
    }
}

function useCardFn(state: StateI, { payload }: { payload: { player: string, card: string } }): void {
    const player = state.players.find((p) => p.name === payload.player);
    if (!player) {
        throw new Error(`Player ${payload.player} does not exist`);
    }

    const card = state.cardStacks.reduce((acc: undefined | CardI, stack) => {
        if (acc) {
            return acc;
        }
        return stack.cards.find((c) => c.name === payload.card);
    }, undefined);
    if (!card) {
        throw new Error(`Card ${payload.card} does not exist`);
    }

    if (card.action === "transfer") {
        transferCard(state, player.name, card);
    } else {
        throw new Error(`Card ${card.name} has an unsupported action ${card.action}`);
    }
}
function transferCard(state: StateI, player: string, card: CardI): void {
    const mapToPlayers = (name: string): string[] => {
        if (name === "bank") {
            return ["bank"]
        }
        if (name === "player") {
            return [player];
        }
        if (name === "all players") {
            return state.players.map((p) => p.name);
        }
    }

    try {
        const payers = mapToPlayers(card.payer);
        const recipients = mapToPlayers(card.recipient);

        for (const payer of payers) {
            for (const recipient of recipients) {
                transferFn(state, {
                    payload: {
                        from: payer,
                        to: recipient,
                        amount: card.amount
                    }
                });
            }
        }
    } catch (error) {
        throw error;
    }
}

const gameSlice = createSlice({
    name: "players",
    initialState: {
        name: "",
        uri: "",
        settings: {
            playersBalance: 0,
            startBonus: 0,
        },
        naming: {
            districts: "",
            members: "",
            middles: "",
            duo: "",
            specials: "",
            currency: "",
        },
        properties: {
            districts: [],
            middles: [],
            duo: [],
            specials: [],
        },
        cardStacks: [],
        players: [],
    },
    reducers: {
        usePreset: (state: StateI, { payload }: { payload: PresetI }) => {
            state.name = payload.name;
            state.uri = payload.uri;
            state.settings = payload.settings;
            state.naming = payload.naming;
            state.properties = payload.properties;
            state.cardStacks = payload.cardStacks;
        },
        addPlayers: ({ players }: StateI, { payload }: { payload: PlayerI[] }) => {
            for (const player of payload) {
                if (player.name === "bank") {
                    throw new Error(`Player name cannot be "bank"`);
                }
                if (players.find((p: PlayerI) => p.name === player.name)) {
                    throw new Error(`Player ${player.name} already exists`);
                }

                players.push(player);
            }
        },
        transfer: transferFn,
        buyProperty: buyPropertyFn,
        useCard: useCardFn,
    },
});

export const { addPlayers, transfer, usePreset, buyProperty, useCard } = gameSlice.actions;

export const store = configureStore({
    reducer: gameSlice.reducer,
});
