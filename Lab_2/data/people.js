const axios = require('axios').default;
const { validateInteger, checkForSpace } = require('../validation/validation');

const getById = async (id) => {
    validateInteger(id);
    checkForSpace(id, "ID")

    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/ed50954f42c3e620f7c294cf9fe772e8/raw/925e36aa8e3d60fef4b3a9d8a16bae503fe7dd82/lab2');

    const user = data.filter(user => user.id === id);

    const promise = new Promise(resolve => setTimeout(() => {
        resolve(user[0]);
    }, 5000));
    if (user && user.length != 0) {
        return promise;
    } else {
        throw { statusCode: 404, message: "User not found" };
    }
}

module.exports = {
    getById
}