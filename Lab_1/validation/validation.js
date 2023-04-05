const { ObjectId } = require('mongodb');

// const userNameFormat = /^[a-zA-Z0-9]*$/gi;
const checkForSpace = /^\S*$/;

const isArgumentPassed = (obj) => {
    for (const [key, value] of Object.entries(obj)) {
        if (!`${value}`) {
            console.log(`!${value}`);
            throw { statusCode: 400, error: 'All arguments must be passed' };
        }
    }
}

const validateString = (str) => {
    isArgString(str)
    isStrEmpty(str)

    return str.trim()
}

const isArgString = (str) => {
    if (typeof str !== 'string') {
        throw { statusCode: 400, error: `${str} must be a string` }
    }
}

const isStrEmpty = (str) => {
    if (!str.trim() || str.length < 1) {
        throw { statusCode: 400, error: `${str} cannot be empty` }
    }
}

const validateObjectId = (id) => {
    const objectIdFormat = /^[a-fA-F0-9]{24}$/
    id = ObjectId(id)

    if (!ObjectId.isValid(id) || !objectIdFormat.test(id)) {
        throw { statusCode: 400, error: 'Given ID is not a valid ObjectId.' }
    }

    return ObjectId(id)
}

module.exports = {
    isArgumentPassed,
    validateString,
    isStrEmpty,
    validateObjectId,
    checkForSpace
}