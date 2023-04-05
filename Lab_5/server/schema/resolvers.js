const { fetchImages, getBinnedImages, getUserPostedImages, uploadNewImage, updateImageBin, deleteUserPostedImage, isBinned  } = require('./data');

module.exports = {
  Query: {
    unsplashImages: async(_,{ pageNum }) => await fetchImages(pageNum),
    
    binnedImages: async() => await getBinnedImages(),

    userPostedImages: async() => await getUserPostedImages()
  },

  ImagePost: {
    binned: async(parent) => await isBinned(parent.id)
  },

  Mutation: {
    uploadImage: async(_,{ url, description, posterName }) => await uploadNewImage(url, description, posterName),

    updateImage: async(_,{id, url, posterName, description, userPosted, binned}) => 
      await updateImageBin(id, url, posterName, description, userPosted, binned),

    deleteImage: async(_, { id }) => await deleteUserPostedImage(id)
  },
};