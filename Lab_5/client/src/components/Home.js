import { useQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import { GET_IMAGES, UPDATE_IMAGE } from "../queries";
import Button from "./Button";
import ImageCard from "./ImageCard";
import '../styles/Home.styles.scss';

const Home = ({ pageNum }) => {
    const [page, setPage] = useState(1);
    const { loading, error, data, refetch } = useQuery(GET_IMAGES, { variables: {pageNum: page} });
    const [updateImage] = useMutation(UPDATE_IMAGE);
    
    const handleNextPage = (page) => {
        setPage(page + 1);
    }

    const handlePreviousPage = (page) => {
        if(page <= 0) {
            return null;
        }
        setPage(page - 1);
    }
    
    
    const handleAddtoBin = (id, url, posterName, description, userPosted) => {
        updateBin(id, url, posterName, description, userPosted, true);
    }

    const handleRemoveFromBin = (id, url, posterName, description, userPosted) => {
        updateBin(id, url, posterName, description, userPosted, false);
    }
    
    const updateBin = (id, url, posterName, description, userPosted, binned) => {
        updateImage({
            variables: {
                id: id,
                url:url,
                posterName:posterName,
                description: description,
                userPosted: userPosted,
                binned: binned,
            }
        });
        refetch();
    }

    if (loading) return 'Loading Images...'
    if(error) return `Error!!! ${error.message}`;
    
    return (
        <div>
            <div className="post-button-container">
                {
                    page > 1 ?
                        <Button buttonType='black' onClick={() => handlePreviousPage(page)}>Get Previous Images</Button>
                    : null
                }
                <Button buttonType='black' onClick={() => handleNextPage(page)}>Get More Images</Button>
            </div>
            <div className="image-container">
                {data.unsplashImages.map(images => (    
                        <ImageCard key={images.id} data={images} handleAddtoBin={handleAddtoBin} handleRemoveFromBin={handleRemoveFromBin} />               
                ))}
            </div>
        </div>
    )
}

export default Home;