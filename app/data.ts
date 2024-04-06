export interface PlayerI {
    name: string;
    balance: number;
}

export interface PropertyI {
    name: string;
    color: string;
    price: number;
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

export interface DistrictI {
    name: string;
    color: string;
    members: PropertyI[];
}

export interface PresetI {
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
}
