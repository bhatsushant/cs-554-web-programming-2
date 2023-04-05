const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
const { ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');
const { validateString, isStrEmpty, checkForSpace } = require('../validation/validation');
const saltRounds = 16;

module.exports = {

    async createUser(name, username, password) {
        if (typeof name != 'string' || typeof username != 'string' || typeof password != 'string') {
            throw { statusCode: 400, error: "Values must be string" };
        }
        if (name.trim().length < 1 || username.trim().length < 1 || password.trim().length < 1) {
            throw { statusCode: 400, error: "Values cannot be empty" };
        }
        if (!checkForSpace.test(username) || !checkForSpace.test(password)) {
            throw { statusCode: 400, error: "Username & Password cannot contain spaces" };
        }

        username = username.trim().toLowerCase();

        const hashedPass = await bcrypt.hash(password, saltRounds);

        let newUser = {
            name: name,
            username: username,
            password: hashedPass
        }

        const userCol = await users();
        const user = await userCol.findOne({ username: username });
        if (user !== null) throw { statusCode: 400, error: "User already exists. Please create an account with a different username" };

        const insertInfo = await userCol.insertOne(newUser);

        if (insertInfo.insertedCount === 0) {
            throw { statusCode: 500, error: 'Could not add user' };
        }

        const insertedUser = await userCol.findOne({ username: username });
        const _id = insertedUser._id.toString();

        return { isUserCreated: true, _id: _id, name: insertedUser.name, username: insertedUser.username };
    },

    async checkUser(username, password) {
        if (typeof username != 'string' || typeof password != 'string') {
            throw { statusCode: 400, error: "Values must be string" };
        }
        if (username.trim().length < 1 || password.trim().length < 1) {
            throw { statusCode: 400, error: "Values cannot be empty" };
        }
        if (!checkForSpace.test(username) || !checkForSpace.test(password)) {
            throw { statusCode: 400, error: "Username & Password cannot contain spaces" };
        }

        username = username.trim().toLowerCase();
        const userCol = await users();
        const user = await userCol.findOne({ username: username });
        if (user === null) throw { statusCode: 400, error: 'Either the username or password is invalid' };

        let compToHash = false;

        compToHash = await bcrypt.compare(password, user.password);

        if (compToHash) {
            return { isUserAuthenticated: true, _id: user._id, username: user.username, name: user.name }
        } else {
            throw { statusCode: 401, error: 'Either the username or password is invalid' };
        }
    },
}