const { gql } = require('apollo-server');

const typeDefs = gql`
  
  type Pokemon {
    id: ID
    name: String
    imageUrl: String
    abilities: [Ability]
    type: [Types]
  }

  type Ability {
    name: String
  }

  type Types {
    name: String
  }

  type PokemonList {
    count: Int
    pokemonList: [Pokemon]
  }

  type Trainer {
    name: String!
    pokemons: [Pokemon]
  }

  type Query {
    getPokemonList(offset: Int): PokemonList
    getSinglePokemon(id: Int): Pokemon
    getTrainerList: [Trainer]
  }
  
  # type Mutation {
  #   uploadImage(url: String!, description: String, posterName: String): ImagePost
  #   updateImage(id: ID!, url: String, posterName: String, description: String, userPosted: Boolean, binned: Boolean, numBinned: Int): ImagePost
  #   deleteImage(id: ID!): ImagePost
  # }
`;

module.exports = typeDefs;