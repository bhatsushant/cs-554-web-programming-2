import { gql } from "@apollo/client";

export const GET_POKEMON_LIST = gql`
    query Query($offset: Int) {
        getPokemonList(offset: $offset) {
            count
            pokemonList {
                id
                name
                imageUrl
                abilities {
                    name
                }
                type {
                    name
                }
            }
        }
    }
`;

export const GET_SINGLE_POKEMON = gql`
    query GetSinglePokemon($id: Int) {
    getSinglePokemon(id: $id) {
        id
        name
        imageUrl
        abilities {
            name
        }
        type {
            name
        }
    }
    }
`;