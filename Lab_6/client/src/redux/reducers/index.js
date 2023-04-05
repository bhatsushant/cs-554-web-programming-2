import { combineReducers } from "redux";
import trainerReducer from '../reducers/trainerReducer';

const reducers = combineReducers({
    allTrainers: trainerReducer
});

export default reducers;
