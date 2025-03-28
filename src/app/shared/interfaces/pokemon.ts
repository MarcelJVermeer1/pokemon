export interface Pokemon {
    name: string ;
    id: number ;
    imageUrl: string ;
    url: string;
}

export interface Pokemons{
    name: string;
    url: string;
}

export interface PokemonDetails {
    id: number;
    name: string;
    height: number;
    weight: number;
    imageUrl: string;
    sprites: {
      front_default: string;
      back_default: string;
      front_shiny: string;
      back_shiny: string;
    };
    types: PokemonType[];
    abilities: PokemonAbility[];
    stats: PokemonStat[];
  }

  export interface PokemonType {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }
  
  export interface PokemonAbility {
    ability: {
      name: string;
      ishidden: boolean;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }
  
  export interface PokemonStat {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }

