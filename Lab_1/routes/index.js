const blog = require('./blog');

const constructorMethod = (app) => {
    app.use('/', blog);

    app.use('*', (req, res) => {
        res.sendStatus(404);
    });
};

module.exports = constructorMethod;