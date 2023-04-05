import '../styles/Home.scss';
import backgroundImage from '../assets/pokemon-background.jpeg'

const Home = () => {
    return (
        <div className="background-image">
            <img src={backgroundImage} alt="pokemon-background" />
        </div>
    )
}

export default Home;