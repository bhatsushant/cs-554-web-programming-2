import Card from 'react-bootstrap/Card';
import '../styles/CharCard.css';

const CharCard = ({imgSrc, desc, name, extension}) => {
    return (
        <Card style={{ width: '18rem', margin: '30px' }} className='card-container' aria-label='title'>
            <Card.Img variant="top" src={`${imgSrc}/portrait_uncanny.${extension}`} alt={`${name}`} 
            onError={(event) => (event.target.src = `${imgSrc}/${extension}`)}/>
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>{desc ? desc : ''}</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default CharCard;