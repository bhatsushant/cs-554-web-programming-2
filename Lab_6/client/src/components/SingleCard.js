import { GET_SINGLE_POKEMON } from '../queries';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { catchPokemon, releasePokemon } from "../redux/actions/trainerActions";
import { Button } from '@mui/material';
import '../styles/Card.scss';

const SingleCard = () => {
    let { id } = useParams();
    id = parseInt(id);
    const { loading, error, data } = useQuery(GET_SINGLE_POKEMON, {variables: { id: id }});
    const trainers = useSelector((state) => state.allTrainers);
    const [ selectedTrainer ] = trainers.filter(trainer => trainer.selected === true);
    const dispatch = useDispatch();
    let selectedPokemonIds = [];
    if(selectedTrainer !== undefined && selectedTrainer !== null) {
        selectedPokemonIds = selectedTrainer.pokemonList.map(pokemon => pokemon.id);
        console.log("Selected Ids ", selectedPokemonIds);
    }

    if (loading) return 'Loading Images...'
    if(error) return `Error!!! ${error.message}`;

    console.log(data.getSinglePokemon === true)

    if(data.getSinglePokemon === null) return '404! Page Not Found! No Pokemons to catch here! Please Search on another page';

    const getAbilities = () => {
        return data.getSinglePokemon.abilities.map(ability => ` | ${ability.name}`)
    }

    const getTypes = () => {
        return data.getSinglePokemon.type.map(t => ` | ${t.name}`)
    }

    return (
            <div className="card mx-auto" style={{"width": "20%"}}>
                <img src={data.getSinglePokemon.imageUrl} className="card-img-top" alt={data.getSinglePokemon.name} height="215" width="215"/>
                <h1 className="card-title">{data.getSinglePokemon.name}</h1>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Abilities: {getAbilities()}</li>
                    <li className="list-group-item">Types: {getTypes()}</li>
                </ul>
                {selectedPokemonIds.length && selectedPokemonIds.includes(data.getSinglePokemon.id) ?
                    <Button variant='contained' onClick={ () =>
                        dispatch(releasePokemon(data.getSinglePokemon.id))
                    }>Release</Button>
                    :
                    <>
                    
                        {selectedPokemonIds.length < 6 && <Button variant='contained' onClick={ () =>
                            dispatch(catchPokemon({id: data.getSinglePokemon.id, pokemonList: {id: data.getSinglePokemon.id, imageUrl: data.getSinglePokemon.imageUrl, name: data.getSinglePokemon.name}}))
                        }>Catch</Button>}

                        {selectedPokemonIds.length > 5 && 'PARTY FULL'}
                    </>
                }    
            </div>
    )
}

export default SingleCard;