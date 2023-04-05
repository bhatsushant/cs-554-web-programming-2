import React, { useState ,useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { createUrl } from "../createUrl";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import CharCard from "./CharCard";
import Error from "./Error";
import '../styles/SingleChar.css';

const SingleChar = () => {
    const [charData, setCharData] = useState([]);
    const [error, setError] = useState(false);
    const {id} = useParams();
    const url = createUrl('characters',id);

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
                                name={char.name} 
                                desc = {char.description} 
                                extension = {char.thumbnail.extension}>
                            </CharCard>
                        </Col>
                        <Col>
                        <Row>
                            <Col>
                                <ul className="list">
                                <span className="bigger">Related Comics:</span>
                                {char.comics.items.map((comic) => (
                                    <li key={comic.resourceURI.slice(-5)}>
                                            <Link 
                                                to={`/comics/${comic.resourceURI.split('/').pop()}`}>
                                            {comic.name}
                                            </Link>
                                    </li>
                                ))}
                                </ul>
                            </Col>
                            <Col>
                                <ul className="list">
                                <span className="bigger">Related Series:</span>
                                {char.series.items.map((item) => (
                                    <li key={item.resourceURI.slice(-5)}>
                                        <Link to={`/comics/${item.resourceURI.split('/').pop()}`}>
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
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

export default SingleChar;