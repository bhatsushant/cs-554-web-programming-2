import { ActionTypes } from "../constants/actionTypes";

export const addTrainer = name => {
    return {
        type: ActionTypes.ADD_TRAINER,
        payload: { trainerName: name }
    }
}

export const selectTrainer = (id) => {
    return {
        type: ActionTypes.SELECT_TRAINER,
        payload: { id: id }
    }
}

export const unselectTrainer = id => {
    return {
        type: ActionTypes.UNSELECT_TRAINER,
        payload: { id: id }
    }
}

export const deleteTrainer = id => {
    return {
        type: ActionTypes.DELETE_TRAINER,
        payload: { id: id }
    }
}

export const catchPokemon = ({ id, pokemonList }) => {
    return {
        type: ActionTypes.CATCH_POKEMON,
        payload: { id: id, pokemonList: pokemonList }
    }
}

export const releasePokemon = id => {
    return {
        type: ActionTypes.RELEASE_POKEMON,
        payload: { id: id }
    }
}