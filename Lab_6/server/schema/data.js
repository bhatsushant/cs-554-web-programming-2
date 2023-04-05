const axios = require('axios');
const redis = require('redis');
// const { v4: uuid } = require('uuid');
const REDIS_PORT = process.env.PORT || 6379;
const client = redis.createClient(REDIS_PORT);

(async () => {
    await client.connect();
})();

const fetchPokemons = async(offset) => {
    const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=20`);
    let results = data.results;
    const pokemonListObj = {};
    pokemonListObj.count = data.count;
    const list = await Promise.all(results.map(async (pokemon) => {
        let { data } = await axios.get(pokemon.url);
        const pokemonObj = await fetchSinglePokemon(data.id);
        return pokemonObj;
    }));
    pokemonListObj.pokemonList = list;
    const key = await client.get(`offset${offset}`);
    if(key) {
        console.log("Returned from cache...");
        return JSON.parse(key)
    };
    await client.set(`offset${offset}`, JSON.stringify(pokemonListObj));
    console.log("Returned from axios call...");
    return pokemonListObj;
}

const fetchSinglePokemon = async(id) => {
    const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    const abilityList = data.abilities.map(ability => {
        const abilityObj = {};
        abilityObj.name = ability.ability.name;
        return abilityObj;
    });

    const typeList = data.types.map(type => {
        const typeObj = {};
        typeObj.name = type.type.name;
        return typeObj;
    });
    const pokemonObj = {};
    pokemonObj.id = data.id;
    pokemonObj.name = data.name;
    pokemonObj.imageUrl = data.sprites.other['official-artwork'].front_default;
    pokemonObj.abilities = abilityList;
    pokemonObj.type = typeList;
    const key = await client.get(`id${data.id}`);
    if(key) {
        console.log("Returned from cache...");
        return JSON.parse(key)
    };
    await client.set(`id${data.id}`, JSON.stringify(pokemonObj));
    console.log("Returned from axios call...");
    return pokemonObj;
}

module.exports = {
    fetchSinglePokemon,
    fetchPokemons
};