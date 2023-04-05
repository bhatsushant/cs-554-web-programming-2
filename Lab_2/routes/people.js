const express = require('express');
const redis = require('redis');
const router = express.Router();
const { getById } = require('../data/people');
const { validateInteger, checkForSpace } = require('../validation/validation');
const REDIS_PORT = process.env.PORT || 6379;
const client = redis.createClient(REDIS_PORT);

(async () => {
    await client.connect();
})();

router.get('/history', async (req, res) => {
    const visitors = await client.lRange("visitors", 0, 19);
    const userList = visitors.map(user => JSON.parse(user));
    res.status(200).json(userList);
});

router.get('/:id', async (req, res) => {
    try {
        validateInteger(req.params.id);
        checkForSpace(req.params.id, "ID")
        const id = validateInteger(req.params.id);
        const doesUserExist = await client.get(`${id}`);
        if (doesUserExist) {
            console.log("Fetching user from cache...");
            await client.lPush("visitors", doesUserExist);
            return res.status(200).json(JSON.parse(doesUserExist));

        }
        console.log("User does not exist in cache. Getting from DB...");
        const user = await getById(id);
        if (user) {
            await client.set(`${id}`, JSON.stringify(user));
            await client.lPush("visitors", JSON.stringify(user));
            const getUser = await client.get(`${id}`);
            res.status(200).json(JSON.parse(getUser));
        } else {
            throw { statusCode: 404, message: "User not found" };
        }
    } catch (error) {
        res.status(error.statusCode ? error.statusCode : 500).json(error.message ? error.message : 'Internal Server Error');
    }
});

module.exports = router;