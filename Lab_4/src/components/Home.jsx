import '../styles/Home.css';
import marvelVideo from "../assets/marvel-video.mp4";

const Home = () => {
    return(
        <video autoPlay loop muted id="myVideo" className="home-container">
            <source src={marvelVideo} type="video/mp4" />
        </video>
    )
}

export default Home;