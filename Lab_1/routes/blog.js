const express = require('express');
const { ObjectId } = require('mongodb');
const { isArgumentPassed, validateString, isStrEmpty, validateObjectId, checkForSpace } = require('../validation/validation');
const router = express.Router();

const { createUser, checkUser } = require('../data/users');
const { createBlog, updateBlog, createComment, deleteComment, getBlog, getAllBlogs } = require('../data/blog');

router.post("/blog/signup", async (req, res) => {
    try {
        let { name, username, password } = req.body;

        if (typeof name != 'string' || typeof username != 'string' || typeof password != 'string') {
            throw { statusCode: 400, error: "Values must be string" };
        }
        if (name.trim().length < 1 || username.trim().length < 1 || password.trim().length < 1) {
            throw { statusCode: 400, error: "Values cannot be empty" };
        }
        if (!checkForSpace.test(username) || !checkForSpace.test(password)) {
            throw { statusCode: 400, error: "Username & Password cannot contain spaces" };
        }

        const user = await createUser(name, username, password);
        res.status(200).json({ _id: user._id, name: user.name, username: user.username });
    } catch (e) {
        res.status(e.statusCode ? e.statusCode : 500).json({ error: e.error });
    }
})

router.post("/blog/login", async (req, res) => {
    try {
        let { username, password } = req.body;
        if (typeof username != 'string' || typeof password != 'string') {
            throw { statusCode: 400, error: "Values must be string" };
        }
        if (username.trim().length < 1 || password.trim().length < 1) {
            throw { statusCode: 400, error: "Values cannot be empty" };
        }
        if (!checkForSpace.test(username) || !checkForSpace.test(password)) {
            throw { statusCode: 400, error: "Username & Password cannot contain spaces" };
        }
        const authenticatedUser = await checkUser(username, password);
        if (authenticatedUser.isUserAuthenticated) {
            req.session.user = { _id: authenticatedUser._id, username: authenticatedUser.username };
            res.status(200).json({ _id: authenticatedUser._id, name: authenticatedUser.name, username: authenticatedUser.username });
        }
    } catch (e) {
        res.status(e.statusCode ? e.statusCode : 500).json({ error: e.error });
    }
})

router.get('/blog/logout', async (req, res) => {
    try {
        req.session.destroy();
        res.send('Logged out');
    } catch (e) {
        res.status(e.statusCode ? e.statusCode : 500).json({ error: e.error });
    }
})

router.route("/blog")
    .get(async (req, res) => {
        try {
            let skip = 0, take = 20;
            if (req.query.skip) {
                skip = parseInt(req.query.skip);

                if (skip === NaN || skip < 0 || skip > 100) {
                    throw { statusCode: 400, error: 'Skip must be a positive integer between 0 - 100' };
                }
            }
            if (req.query.take) {
                take = parseInt(req.query.take);

                if (take === NaN || take < 0 || skip > 100) {
                    throw { statusCode: 400, error: 'Take must be a positive integer between 0 - 100' };
                }
            }

            let blogs = await getAllBlogs(parseInt(skip), parseInt(take));
            res.status(200).json(blogs);

        } catch (e) {
            res.status(e.statusCode ? e.statusCode : 500).json({ error: e.error });
        }
    })
    .post(async (req, res) => {
        try {
            if (req.session.user) {
                let { title, body } = req.body;
                if (typeof title != 'string' || typeof body != 'string') {
                    throw { statusCode: 400, error: "Values must be string" };
                }
                if (title.trim().length < 1 || body.trim().length < 1) {
                    throw { statusCode: 400, error: "Values cannot be empty" };
                }
                res.status(200).json(await createBlog(title, body, req.session.user));
            } else {
                throw { statusCode: 401, error: "User must be logged in to create a post" };
            }
        } catch (e) {
            res.status(e.statusCode ? e.statusCode : 500).json({ error: e.error });
        }
    })

router.route("/blog/:id")
    .get(async (req, res) => {
        try {
            validateObjectId(req.params.id);
            res.status(200).json(await getBlog(req.params.id));
        } catch (e) {
            res.status(e.statusCode ? e.statusCode : 500).json({ error: e.error });
        }
    })
    .put(async (req, res) => {
        try {
            validateObjectId(req.params.id);

            const _id = req.params.id;
            const updateObj = {};
            updateObj.title = req.body.title;
            updateObj.body = req.body.body;
            if (typeof updateObj.title != 'string' || typeof updateObj.body != 'string') {
                throw { statusCode: 400, error: "Values must be string" };
            }
            if (updateObj.title.trim().length < 1 || updateObj.body.trim().length < 1) {
                throw { statusCode: 400, error: "Values cannot be empty" };
            }
            const existingBlog = await getBlog(_id);
            if (req.session.user) {
                if (existingBlog.userThatPosted._id === req.session.user._id) {
                    const updatedBlog = await updateBlog(_id, updateObj);
                    res.status(200).json(updatedBlog);
                } else {
                    throw { statusCode: 401, error: "Users can only update their own blogs" };
                }
            } else {
                throw { statusCode: 401, error: "Only logged in users can update their posts" };
            }
        } catch (e) {
            res.status(e.statusCode ? e.statusCode : 500).json({ error: e.error });
        }
    })
    .patch(async (req, res) => {
        try {
            const { title, body } = req.body;

            if (typeof updateObj.title != 'string' || typeof updateObj.body != 'string') {
                throw { statusCode: 400, error: "Values must be string" };
            }
            if (updateObj.title.trim().length < 1 || updateObj.body.trim().length < 1) {
                throw { statusCode: 400, error: "Values cannot be empty" };
            }

            if (req.session.user) {
                let updateObj = {};
                const oldBlog = await getBlog(req.params.id);

                if (oldBlog.userThatPosted._id === req.session.user._id) {
                    if (title && title !== oldBlog.title)
                        updateObj.title = title;
                    if (body && body !== oldBlog.body)
                        updateObj.body = body;

                    if (Object.keys(updateObj).length !== 0) {
                        try {
                            const updatedBlog = await updateBlog(req.params.id, updateObj);
                            res.json(updatedBlog);
                        } catch (e) {
                            res.status(e.statusCode ? e.statusCode : 500).json({ error: e.error });
                        }
                    } else {
                        throw {
                            statusCode: 400, error: 'No fields have been changed from their inital values, so no update has occurred'
                        };
                    }
                } else {
                    throw { statusCode: 401, error: "Users can only update their own comments" };
                }
            } else {
                throw { statusCode: 401, error: "Users must be logged in to update their blogs" };
            }

        } catch (e) {
            res.status(e.statusCode ? e.statusCode : 500).json({ error: e.error });
        }
    })

router.post("/blog/:id/comments", async (req, res) => {
    try {
        const { comment } = req.body;

        if (typeof comment != 'string') {
            throw { statusCode: 400, error: "Values must be string" };
        }
        if (comment.trim().length < 1) {
            throw { statusCode: 400, error: "Values cannot be empty" };
        }

        if (req.session.user) {
            res.status(200).json(await createComment(req.params.id, comment, req.session.user));
        } else {
            throw { statusCode: 401, error: "Users must be logged in to comment" };
        }
    } catch (e) {
        res.status(e.statusCode ? e.statusCode : 500).json({ error: e.error });
    }
})

router.delete("/blog/:blogId/:commentId", async (req, res) => {
    try {
        validateObjectId(req.params.blogId);
        validateObjectId(req.params.commentId);
        const existingBlog = await getBlog(req.params.blogId);

        if (req.session.user) {
            let userId;

            existingBlog.comments.forEach((key) => {
                userId = key.userThatPosted._id;
            });

            if (userId === req.session.user._id) {
                res.status(200).json(await deleteComment(req.params.blogId, req.params.commentId));
            } else {
                throw { statusCode: 401, error: "Users can only delete their own comments" };
            }
        } else {
            throw { statusCode: 401, error: "Users must be logged in to delete their comments" };
        }
    } catch (e) {
        res.status(e.statusCode ? e.statusCode : 500).json({ error: e.error });
    }
})

module.exports = router;