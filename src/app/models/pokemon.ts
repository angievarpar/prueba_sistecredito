export interface Pokemon {
    id: number;
    name: string;
    order: number;
    weight: number;
    height: number;
    base_experience: number;
    abilities: Abilities[];
}

export interface Abilities {
    ability: Ability;
    is_hidden: boolean;
}

export interface Ability {
    name: string;
    url: string;
}
