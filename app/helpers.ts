import { useSelector } from "react-redux";

import { PropertyI, PlayerI } from "./data";
import { store, transfer as storeTransfer, buyProperty as storeBuyProperty } from "./GameReducer";

export function getPlayers(filter: (player: PlayerI) => boolean = () => true): PlayerI[] {
    return [
        { name: "bank", balance: Number.MAX_SAFE_INTEGER },
        ...useSelector(({ players }: { players: PlayerI[] }) => players),
    ].filter(filter);
}

export function transfer(from: string, to: string, amount: number) {
    store.dispatch(
        storeTransfer({
            from,
            to,
            amount,
        }),
    );
}

export function getMiddles(): PropertyI[] {
    return store.getState().properties.middles;
}

export function getDuo(): PropertyI[] {
    return store.getState().properties.duo;
}

export function getSpecials(): PropertyI[] {
    return store.getState().properties.specials;
}

export function buyProperty(player: string, property: string) {
    store.dispatch(
        storeBuyProperty({ player, property }),
    );
}
