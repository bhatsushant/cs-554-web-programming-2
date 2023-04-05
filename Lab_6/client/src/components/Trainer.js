import { useState } from 'react';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { addTrainer, deleteTrainer, selectTrainer} from '../redux/actions/trainerActions';
import Card from "./Card";
import '../styles/Trainer.scss';

const Trainer = () => {
    const [formFields, setFormFields] = useState({trainerName: ''});
    const trainers = useSelector((state) => state.allTrainers);
    const dispatch = useDispatch();

    const handleInputChange = event => {
        const { name, value} = event.target;
        setFormFields(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleOnSubmit = (event) => {
        event.preventDefault();
        dispatch(addTrainer(formFields.trainerName));
        event.target.elements.trainerName.value = "";
    }

    const handleSelect = (id) => {
        dispatch(selectTrainer(id, ));
    }

    const handleDelete = (id) => {
        dispatch(deleteTrainer(id));
    }

    return (
        <>
            <form className='add-trainer-container' onSubmit={handleOnSubmit}>
                <label htmlFor="trainer-input" className='bigger'>{`ADD TRAINER :`}</label>
                <input type="text" id="trainer-input" placeholder={`add trainer...`} name="trainerName" onChange={handleInputChange}/>
                <Button type='submit' variant='contained'>ADD TRAINER</Button>
            </form>
            {trainers.map(trainer => (
                <div key={trainer.id}>
                    <div className='trainer-container'>
                        <label htmlFor="trainer-name">Trainer: {trainer.trainerName}</label>
                        {trainer.selected ?
                            'SELECTED'                           
                                :
                            <div className='button-container'>
                                <Button variant='outlined' onClick={() => handleSelect(trainer.id)}>SELECT TRAINER</Button>
                                <Button variant='outlined' startIcon={<DeleteIcon />} className='delete-trainer-button' onClick={() => handleDelete(trainer.id)}>DELETE TRAINER</Button>
                            </div>
                        }
                    </div>
                    <div className="row row-cols-1 row-cols-md-6 g-4 card-container">
                        {trainer.pokemonList.map(images => (
                            <Card imageUrl={images.imageUrl} name={images.name} id={images.id} key={images.id} page='trainers'></Card>
                        ))}
                    </div>
                </div>
            )
            )}
        </>
    )
}

export default Trainer;