import Button from './Button';
import '../styles/ImageCard.styles.scss';

const ImageCard = ({ data, handleAddtoBin, handleRemoveFromBin }) => {
    const { id, posterName, url, description, userPosted, binned } = data;

    return (
        <>
            <div className="image-card-container">
                <img src={url} alt={`${description}`} />
                <div className="footer">
                    <span className='name'>{posterName}</span>
                    <span className='description'>{description}</span>
                </div>
                {   binned ? 
                    <Button buttonType='danger' onClick={() => handleRemoveFromBin(id, url, posterName, description, userPosted)}>Remove from bin</Button>
                    :
                    <Button buttonType='danger' onClick={() => handleAddtoBin(id, url, posterName, description, userPosted)}>Add to bin</Button> 
                }
            </div>
        </>
    )
}

export default ImageCard;