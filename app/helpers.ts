import { PlayerI } from "./types";
import { useSelector } from "react-redux";
import { store, transfer as storeTransfer } from "./GameReducer";

export function getPlayers(filter: (player: PlayerI) => boolean = () => true) {
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
