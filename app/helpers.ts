import { useSelector } from "react-redux";

import { PropertyI, PlayerI } from "./data";
import { store, transfer as storeTransfer } from "./GameReducer";

export function getPlayers(filter: (player: PlayerI) => boolean = () => true): PlayerI[] {
    return [
        { name: "bank", balance: Number.MAX_SAFE_INTEGER },
        ...useSelector(({ players }: { players: PlayerI[] }) => players),
    ].filter(filter);
}

export function transfer(from: string, to: string, amount: number) {
    try {
        store.dispatch(
            storeTransfer({
                from,
                to,
                amount,
            }),
        );
    } catch (error) {
        console.log(error);
    }
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
