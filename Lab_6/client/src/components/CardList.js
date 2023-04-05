import { useQuery } from "@apollo/client";
import { GET_POKEMON_LIST } from '../queries';
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "./Card";
import PaginationButtons from "./PaginationButtons";
import '../styles/CardList.scss';

const CardList = () => {
    let {pagenum} = useParams();
    let navigate = useNavigate();
    pagenum = parseInt(pagenum);
    const [currentPage, setCurrentPage] = useState(pagenum);
    // setCurrentPage(pagenum);
    const [offset, setOffset] = useState(pagenum * 20);
    const { loading, error, data } = useQuery(GET_POKEMON_LIST, {variables: {offset: offset}, onCompleted: () => setCurrentPage(pagenum)});

    const handlePageChange = (event, value) => {
        pagenum = value - 1;
        navigate(`../pokemon/page/${pagenum}`);
        setOffset(pagenum * 20);
        setCurrentPage(pagenum);
    }

    
    if (loading) return 'Loading Images...'
    if(error) return `Error!!! ${error.message}`;
    
    if(data.getPokemonList.pokemonList.length === 0) return '404! Page Not Found! No Pokemons to catch here! Please Search on another page';
    const totalPages = Math.ceil(data.getPokemonList.count / 20);

    return (
        <>
            <PaginationButtons count={totalPages} currentPage={currentPage+1} handlePageChange={handlePageChange}></PaginationButtons>
            <div className="row row-cols-1 row-cols-md-6 g-4 card-container">
                {data.getPokemonList.pokemonList.map(images => (
                    <Card imageUrl={images.imageUrl} name={images.name} id={images.id} key={images.id}>
                    </Card>
                ))}
            </div>
        </>
    )
}

export default CardList;