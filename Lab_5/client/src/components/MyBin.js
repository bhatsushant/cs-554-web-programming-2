import { useQuery, useMutation } from "@apollo/client";
import { GET_BINNED_IMAGES, UPDATE_IMAGE } from "../queries";
import ImageCard from "./ImageCard";

const MyBin = () => {
    const { loading, error, data, refetch } = useQuery(GET_BINNED_IMAGES, {
        fetchPolicy: "no-cache",   // Used for first execution
        // nextFetchPolicy: "cache-first" // Used for subsequent executions
      });
    const [updateImage] = useMutation(UPDATE_IMAGE, { onCompleted: refetch });
    

    
    if (loading) return 'Loading Images...'
    if(error) return `Error!!! ${error.message}`;
    
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

    return (
        <div className="image-container">
            {data.binnedImages.map(images => (
                    <ImageCard key={images.id} data={images} handleRemoveFromBin={handleRemoveFromBin} />               
            ))}
        </div>
    )
}

export default MyBin;