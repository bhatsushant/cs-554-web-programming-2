import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { createUrl } from "../createUrl";
import axios from "axios";
import PaginationButtons from "./PaginationButtons";
import CharCard from "./CharCard";
import Error from "./Error";
import SearchBox from "./SearchBox";
import '../styles/Characters.css';

const url = createUrl('characters', 'list');

const Characters = () => {
    const [loading, setLoading] = useState(true);
    const [charData, setCharData] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [error, setError] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    let {page} = useParams();
    let navigate = useNavigate();
    page = parseInt(page);
    const [offset, setOffset] = useState(page * 20);
    
    const handleChange = (event, value) => {
        page = value - 1;
        navigate(`../characters/page/${page}`);
        setOffset(page * 20);
    }

    const handleInputChange = (event) => {
        console.log(event.target.value);
        setSearchTerm(event.target.value);
    }

    useEffect(() => {
        async function fetchData() {
            try {
                if(searchTerm !== undefined && searchTerm !== '') {
                    const {data} = await axios.get(url + '&nameStartsWith=' + searchTerm);
                    setCharData(data.data.results);
                } else {
                    const {data} = await axios.get(url + '&offset=' + page * 20);
                    setCharData(data.data.results);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [searchTerm]);

    useEffect(() => {
        async function fetchData() {
            try {
                // let searchString = '';
                // if(searchTerm.length !== 0) {
                //     searchString = '&nameStartsWith=' + searchTerm;
                // }
                const {data} = await axios.get(url + '&offset=' + page * 20);
                if(data.data.results.length !== 0) {
                    console.log('Page Changed');
                    setCharData(data.data.results)
                    setTotalPages(Math.ceil(data.data.total / data.data.limit));
                    setError(false);
                } else {
                    setError(true);
                }
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    },[page, offset]);

    return (
            <div className="characters-page-container">
                {
                    error ? <Error/> :
                    (loading ? ('Loading...') :
                        (
                            <div>
                                <SearchBox label='CHARACTER' handleInputChange={handleInputChange}></SearchBox>
                                <PaginationButtons pages={totalPages} handleChange={handleChange}/>
                                <Row md={4}>
                                        {charData.map((char) => 
                                            (<div key={char.id}>
                                                <Link to={`/characters/${char.id}`}>
                                                    <Col>
                                                        <CharCard
                                                            imgSrc={char.thumbnail.path} 
                                                            name={char.name}
                                                            extension = {char.thumbnail.extension}> 
                                                        </CharCard>
                                                    </Col>
                                                </Link>
                                            </div>)
                                        )}
                                </Row>
                            </div>          
                        ))
                }
            </div>
    )
}

export default Characters;