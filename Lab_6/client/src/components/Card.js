import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { catchPokemon, releasePokemon } from "../redux/actions/trainerActions";
import '../styles/Card.scss';

const Card = ({ id, imageUrl, name, page}) => {
    const trainers = useSelector((state) => state.allTrainers);
    const [ selectedTrainer ] = trainers.filter(trainer => trainer.selected === true);
    const dispatch = useDispatch();
    let selectedPokemonIds = [];
    if(selectedTrainer !== undefined && selectedTrainer !== null) {
        selectedPokemonIds = selectedTrainer.pokemonList.map(pokemon => pokemon.id);
        console.log("Selected Ids ", selectedPokemonIds);
    }
    return (
        <div className='single-card-container'>
            <div className="card">
                <Link to={`/pokemon/${id}`}>
                    <img src={imageUrl} className="card-img-top" alt={name} height="215" width="215"/>
                </Link>
                <h1 className="card-title">{name}</h1>
                {page !== 'trainers' && selectedPokemonIds.length && selectedPokemonIds.includes(id) ?
                    <Button variant='contained' onClick={ () =>
                        dispatch(releasePokemon(id))
                    }>Release</Button>
                    :
                    <>
                    
                        {page !== 'trainers' && selectedPokemonIds.length < 6 && <Button variant='contained' onClick={ () =>
                            dispatch(catchPokemon({id: selectedTrainer.id, pokemonList: {id: id, imageUrl: imageUrl, name: name}}))
                        }>Catch</Button>}

                        {selectedPokemonIds.length > 5 && 'PARTY FULL'}
                    </>
                }
            </div>
        </div>
    )
}

export default Card;