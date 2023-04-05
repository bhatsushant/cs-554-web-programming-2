const axios = require('axios');
const redis = require('redis');
const { v4: uuid } = require('uuid');
const REDIS_PORT = process.env.PORT || 6379;
const client = redis.createClient(REDIS_PORT);

(async () => {
    await client.connect();
})();

const imgPosts = (data) => {
    const imagePosts = [];
    data.map((image) => {
        const imgObj = {};
        const { id, urls, user, description } = image;
        imgObj.id = id;
        imgObj.url = urls.small_s3;
        imgObj.posterName = user.name;
        imgObj.description = description;
        imgObj.userPosted = false;
        imgObj.binned = false;
        imagePosts.push(imgObj);
    });
    console.log(imagePosts);
    return imagePosts;
}

const fetchImages = async(pageNum) => {
    const { data } = await axios.get(`https://api.unsplash.com/photos?page=${pageNum}&client_id=wp7S-m39BQB-Txy64ARi6XMuHNQCUzbSa4IJmJFCq9s`);
    return imgPosts(data);
}

const getBinnedImages = async() => {
    let list = await client.get("userBin");
    if(list) {
        let imageList = JSON.parse(list);
        return imageList;
    }
    return [];
}

const setBinnedImages = async (imageList, id) => {
    const binnedImages = imageList.filter(image => image.id !== id);
    await client.set("userBin", JSON.stringify(binnedImages));
}

const getUserPostedImages = async() => {
    let list = await client.lRange("userPostedImages", 0, -1);
    if(list.length !== 0) return list.map(posts => JSON.parse(posts));
    return [];
}

const uploadNewImage = async(url, description, posterName) => {
    const imagePost = {
        url: url,
        description: description,
        posterName: posterName,
        binned: false,
        userPosted: true,
        id: uuid()
    };

    await client.lPush("userPostedImages", JSON.stringify(imagePost));
    return imagePost;
}

const updateImageBin = async(id, url, posterName, description, userPosted, binned) => {
    const imageObject = {
        id : id,
        url : url,
        posterName : posterName,
        description : description,
        userPosted : userPosted,
        binned : binned
    };
    

    const imageList = await getBinnedImages();
    if (binned) {
        if(imageList.length !== 0) {
            imageList.unshift(imageObject);
            await client.set("userBin", JSON.stringify(imageList));
        } else {
            await client.set("userBin", JSON.stringify([imageObject]));
        }
    } else {
        await setBinnedImages(imageList, id);
    }
    return imageObject;
}

const deleteUserPostedImage = async(id) => {
    console.log(id);
    const userImages = await client.lRange("userPostedImages", 0, -1);
    const imageList = await getBinnedImages();
    await setBinnedImages(imageList, id);
    await client.lRem("userPostedImages", 0, userImages.find((element) => JSON.parse(element).id === id), (error, data) => console.log(error));
    return null;
}

const isBinned = async(id) => {
    const binnedImages = await getBinnedImages();
    if(binnedImages.length === 0) {
        return false;
    }
    
    for(image of binnedImages) {
        if(image.id === id) {
            return true;
        }
    }
    return false;

}

module.exports = {
    fetchImages,
    getBinnedImages,
    getUserPostedImages,
    uploadNewImage,
    updateImageBin,
    deleteUserPostedImage,
    isBinned
};