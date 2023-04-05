import React, { useState ,useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { createUrl } from "../createUrl";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import CharCard from "./CharCard";
import Error from "./Error";
import '../styles/SingleComic.css';


const ComicDetails = () => {
    const [charData, setCharData] = useState([]);
    const [error, setError] = useState(false);
    const {id} = useParams();
    const url = createUrl('comics',id);

    useEffect(() => {
        async function getCharDetails() {
            try {
                const {data} = await axios.get(url);
                if(data !== undefined && data.data.results.length !== 0) {
                    setCharData(data.data.results);
                    setError(false);
                } else {
                    setError(true);
                }
            } catch (error) {
                setError(true);
                console.log(error);
            }
        }
        getCharDetails();
    },[]);

    return (
        <Row> 
            {console.log(error)}
            { error ? <Error /> : 
                charData.map((char) => 
                (
                    <>
                        <Col key={char.id}>
                            <CharCard 
                                imgSrc={char.thumbnail.path} 
                                name={char.title} 
                                desc = {char.description} 
                                extension = {char.thumbnail.extension}>
                            </CharCard>
                        </Col>
                        <Col>
                        <Row>
                            <Col>
                                <ul className="list">
                                <span className="bigger">Related Characters:</span>
                                {char.characters.items.map((character) => (
                                    <li key={character.resourceURI.slice(-5)}>
                                            <Link 
                                                to={`/characters/${character.resourceURI.split('/').pop()}`}>
                                            {character.name}
                                            </Link>
                                    </li>
                                ))}
                                </ul>
                            </Col>
                            <Col>
                                <ul className="list">
                                <span className="bigger">Related Series:</span>
                                    <li>
                                            <Link to={`/series/${char.series.resourceURI.split('/').pop()}`}>
                                                {char.series.name}
                                            </Link>
                                    </li>
                                </ul>
                            </Col>
                        </Row>
                        </Col>
                    </>
                )
            )}
        </Row>
    )
}

export default ComicDetails;