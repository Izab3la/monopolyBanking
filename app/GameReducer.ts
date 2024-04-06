import { configureStore, createSlice } from "@reduxjs/toolkit";

import { DistrictI, PlayerI, PropertyI, PresetI, CardI } from "./data";

type StateI = {
    name: string;
    uri: string;
    setup: {
        playersBalance: number;
        startBonus: number;
    };
    properties: {
        districts: DistrictI[];
        middles: PropertyI[];
        duo: PropertyI[];
        specials: PropertyI[];
    };
    cards: {
        [type: string]: {
            [name: string]: CardI;
        };
    };
    players: PlayerI[];
};

const gameSlice = createSlice({
    name: "players",
    initialState: {
        name: "",
        uri: "",
        setup: {
            playersBalance: 0,
            startBonus: 0,
        },
        properties: {
            districts: [],
            middles: [],
            duo: [],
            specials: [],
        },
        cards: {},
        players: [],
    },
    reducers: {
        usePreset: (state: StateI, { payload }: { payload: PresetI }) => {
            state.name = payload.name;
            state.uri = payload.uri;
            state.setup = payload.setup;
            state.properties = payload.properties;
            state.cards = payload.cards;
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
        transfer: (
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
        ) => {
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

            if (payer.balance < payload.amount) {
                throw new Error(`Player ${payer.name} does not have enough money`);
            }

            payer.balance -= payload.amount;
            recipient.balance += payload.amount;
        },
    },
});

export const { addPlayers, transfer, usePreset } = gameSlice.actions;

export const store = configureStore({
    reducer: gameSlice.reducer,
});
