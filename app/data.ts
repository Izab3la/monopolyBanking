export interface PlayerI {
    name: string;
    balance: number;
}

export interface CardStackI {
    name: string;
    cards: CardI[];
}

export interface CardI {
    name: string;
    description: string | undefined;
    action: string;

    // transfer
    amount: number | undefined;
    payer: string | undefined;
    recipient: string | undefined;

    destination: string | undefined; // goto
    distance: number | undefined; // move
    startBonus: boolean | undefined;
}

export interface PropertyI {
    name: string;
    color: string;
    price: number;
}

export interface DistrictI {
    name: string;
    color: string;
    members: PropertyI[];
}

export interface PresetI {
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
}
