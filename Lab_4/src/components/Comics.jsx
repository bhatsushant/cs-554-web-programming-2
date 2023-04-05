import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { createUrl } from "../createUrl";
import axios from "axios";
import PaginationButtons from "./PaginationButtons";
import CharCard from "./CharCard";
import Error from "./Error";
import SearchBox from "./SearchBox";

const url = createUrl('comics', 'list');

const Comics = () => {
    const [loading, setLoading] = useState(true);
    const [charData, setCharData] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [error, setError] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    let {page} = useParams();
    let navigate = useNavigate();
    page = parseInt(page);
    const [offset, setOffset] = useState(page * 20);

    const handleInputChange = (event) => {
        console.log(event.target.value);
        setSearchTerm(event.target.value);
    }
    
    const handleChange = (event, value) => {
        page = value - 1;
        navigate(`../comics/page/${page}`);
        setOffset(page * 20);
    }

    useEffect(() => {
        async function fetchData() {
            try {
                if(searchTerm !== undefined && searchTerm !== '') {
                    const {data} = await axios.get(url + '&titleStartsWith=' + searchTerm);
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
                const {data} = await axios.get(url + '&offset=' + page * 20);
                if(data.data.results.length !== 0) {
                    console.log('Comics Page Changed');
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
            <div>
                {
                    error ? <Error/> :
                    (loading ? ('Loading...') :
                        (
                            <div>
                                <SearchBox label='COMICS' handleInputChange={handleInputChange} />
                                <PaginationButtons pages={totalPages} handleChange={handleChange}/>
                                <Row xs={1} md={4} className="g-4">
                                        {charData.map((char) => 
                                            (<div key={char.id}>
                                                <Link to={`/comics/${char.id}`}>
                                                    <Col>
                                                        <CharCard 
                                                            imgSrc={char.thumbnail.path} 
                                                            name={char.title}
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

export default Comics;