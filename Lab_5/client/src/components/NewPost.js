import { useState } from 'react';
import validator from 'validator'
import FormInput from './FormInput';
import Button from './Button';
import '../styles/NewPost.styles.scss';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { UPLOAD_IMAGE } from '../queries';

const defaultFormFields = {
    description: '',
    url: '',
    posterName: '',
}

const NewPost = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { description, url, posterName } = formFields;
    const [uploadImage] = useMutation(UPLOAD_IMAGE);
    const navigate = useNavigate();

    const handleChange = (event) => {
        const {name, value} = event.target;      
        setFormFields({...formFields, [name]: value});
    }

    const handleOnSubmit = (event) => {
        event.preventDefault();
        if(validator.isURL(url)) {
            uploadImage({
                variables: {
                    url: url,
                    description: description,
                    posterName: posterName
                }
            })  
            navigate('/my-posts');
        } else {
            alert('Url is not valid');
        }
    }

    return (
        <form onSubmit={handleOnSubmit} className='form-container'>
            <FormInput label="Description" type="text" required onChange={handleChange} value={description} name='description' />

            <FormInput label="Image URL" type="text" required onChange={handleChange} value={url} name='url' />

            <FormInput label="Author" type="text" required onChange={handleChange} value={posterName} name='posterName' />

            <Button type='submit'>Upload Post</Button>
        </form>
    )
}

export default NewPost;