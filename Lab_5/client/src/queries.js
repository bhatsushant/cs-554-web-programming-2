import { gql } from "@apollo/client"

export const GET_IMAGES = gql`
    query Query($pageNum: Int) {
        unsplashImages(pageNum: $pageNum) {
            id
            url
            posterName
            description
            userPosted
            binned
        },
    }
`;
export const GET_BINNED_IMAGES = gql`
    query Query {
        binnedImages {
            id
            url
            posterName
            description
            userPosted
            binned
        }
    }
`;

export const GET_USER_POSTED_IMAGES = gql`
    query Query {
        userPostedImages {
            id
            url
            posterName
            description
            userPosted
            binned
        }
    }
`;

export const UPLOAD_IMAGE = gql`
    mutation UpdateImage($url: String!, $description: String, $posterName: String) {
        uploadImage(url: $url, description: $description, posterName: $posterName) {
            id
            url
            posterName
            description
            userPosted
            binned
        }
    }
`;

export const UPDATE_IMAGE = gql`
    mutation UpdateImage($id: ID!, $url: String, $posterName: String, $description: String, $userPosted: Boolean, $binned: Boolean) {
        updateImage(id: $id, url: $url, posterName: $posterName, description: $description, userPosted: $userPosted, binned: $binned) {
            id
            url
            posterName
            description
            userPosted
            binned
        }
    }
`;

export const DELETE_IMAGE = gql`
    mutation UpdateImage($id: ID!) {
        deleteImage(id: $id) {
            id
            url
            posterName
            description
            userPosted
            binned
        }
    }
`;