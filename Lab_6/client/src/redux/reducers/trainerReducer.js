import { ActionTypes } from "../constants/actionTypes";
import { v4 as uuid } from 'uuid';

const initialTrainerReducerState = [{
    id: uuid(),
    trainerName: 'Sushant',
    selected: false,
    pokemonList: []
}];

let copyState = null;
let index = 0;

const trainerReducer = (state = initialTrainerReducerState, { type, payload }) => {
    switch(type) {
        case ActionTypes.ADD_TRAINER:
            return [...state, {id: uuid(), trainerName: payload.trainerName, selected: false, pokemonList: []}];
        case ActionTypes.SELECT_TRAINER:
            copyState = [...state];
            copyState.map(copy => copy.selected = false);
            index = copyState.findIndex((x) => x.id === payload.id);
            copyState[index].selected = true;
            console.log(copyState);
            return [...copyState];
        case ActionTypes.UNSELECT_TRAINER:
            copyState = [...state];
            index = copyState.findIndex((x) => x.id === payload.id);
            copyState[index].selected = false;
            return [...copyState];
        case ActionTypes.DELETE_TRAINER:
            copyState = [...state];
            index = copyState.findIndex((x) => x.id === payload.id);
            copyState.splice(index, 1);
            return [...copyState];
        case ActionTypes.CATCH_POKEMON:
            copyState = [...state];
            index = copyState.findIndex((x) => x.id === payload.id);
            console.log("INDEX",copyState[index]);
            copyState[index].pokemonList.push(payload.pokemonList);
            return [...copyState];
        case ActionTypes.RELEASE_POKEMON:
            copyState = [...state];
            console.log("Pokemon List", copyState);
            index = copyState[0].pokemonList.findIndex((x) => x.id === payload.id);
            return copyState.map(selected => {
                if(selected.selected) {
                    index = selected.pokemonList.findIndex((x) => x.id === payload.id);
                    selected.pokemonList.splice(index, 1);
                }
                return selected;
            });
        default:
            return state;
    }
}

export default trainerReducer;