const { fetchPokemons, fetchSinglePokemon } = require('./data');

module.exports = {
  Query: {
    getPokemonList: async(_, { offset }) => await fetchPokemons(offset),

    getSinglePokemon: async(_, { id }) => fetchSinglePokemon(id),
  },
};