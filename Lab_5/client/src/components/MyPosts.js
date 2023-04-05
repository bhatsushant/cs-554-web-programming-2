import { useQuery, useMutation } from "@apollo/client";
import { DELETE_IMAGE, GET_USER_POSTED_IMAGES, UPDATE_IMAGE } from "../queries";
import { useNavigate } from 'react-router-dom';
import ImageCard from "./ImageCard";
import Button from "./Button";
import '../styles/MyPost.styles.scss';

const MyPosts = () => {
    const { loading, error, data, refetch } = useQuery(GET_USER_POSTED_IMAGES, {
        fetchPolicy: "no-cache",   // Used for first execution
        // nextFetchPolicy: "cache-first" // Used for subsequent executions
      });
    const [updateImage] = useMutation(UPDATE_IMAGE, { onCompleted: refetch });
    const [deleteImage] = useMutation(DELETE_IMAGE, { onCompleted: refetch });
    const navigate = useNavigate();
    

    
    if (loading) return 'Loading Images...'
    if(error) return `Error!!! ${error.message}`;
    
    const handleAddtoBin = (id, url, posterName, description, userPosted) => {
        console.log(id);
        updateBin(id, url, posterName, description, userPosted, true);
    }

    const handleRemoveFromBin = (id, url, posterName, description, userPosted) => {
        console.log(id);
        updateBin(id, url, posterName, description, userPosted, false);
    }

    const handleDeletePost = (id) => {
        console.log(id);
        deleteImage({
            variables: {
                id: id
            }
        });
        refetch();
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

    const handleNewPost = () => {
        navigate("/new-post")
    }

    return (
        <div>
            <div className="post-button-container">
                <Button onClick={handleNewPost}>New Post</Button>
            </div>
            <div className="image-container">
                {data.userPostedImages.map(images => ( 
                    <div key={images.id}>  
                        <div>
                            <ImageCard data={images} handleAddtoBin={handleAddtoBin} handleRemoveFromBin={handleRemoveFromBin} />
                        </div>
                        <div className="post-button-container">
                            <Button buttonType='inverted' onClick={() => handleDeletePost(images.id)}>Delete Post</Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyPosts;