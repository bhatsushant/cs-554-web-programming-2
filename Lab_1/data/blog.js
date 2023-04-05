const mongoCollections = require('../config/mongoCollections');
const blogCollection = mongoCollections.blog;
const { ObjectId } = require('mongodb');
const { validateString, isStrEmpty, validateObjectId, checkForSpace } = require('../validation/validation');

let methodsToExport = {
    async getBlog(_id) {
        validateObjectId(_id);
        const blogCol = await blogCollection();
        const blog = await blogCol.findOne({ _id: ObjectId(_id) });
        if (blog === null) throw 'No blog with that ID';
        blog._id = _id;
        blog.comments.forEach(key => {
            key._id = key._id.toString();
        });
        return blog;
    },

    async getAllBlogs(skip, take) {
        let blogList = [];
        const blogCol = await blogCollection();
        blogList = await blogCol.find({}).skip(skip).limit(take).toArray();
        blogList.forEach(key => {
            key._id = key._id.toString();
        });
        return blogList;
    },

    async createBlog(title, body, userThatPosted) {
        const blogCol = await blogCollection();

        let newBlog = {
            title: title,
            body: body,
            userThatPosted: userThatPosted,
            comments: []
        }

        const insertInfo = await blogCol.insertOne(newBlog);
        if (insertInfo.insertedCount === 0) throw 'Could not add blog';
        newBlog._id = insertInfo.insertedId.toString();
        newBlog.userThatPosted._id = userThatPosted._id.toString();
        return newBlog;
    },

    async updateBlog(_id, updateContent) {
        console.log("data", updateContent);
        const blogCol = await blogCollection();
        const existingBlog = await blogCol.findOne({ _id: ObjectId(_id) });
        if (existingBlog === null) throw 'No blog with that ID';
        let updatedBlog = {};
        if (updateContent.title) {
            updatedBlog.title = updateContent.title;
        }

        if (updateContent.body) {
            updatedBlog.body = updateContent.body;
        }

        updatedBlog.userThatPosted = existingBlog.userThatPosted;
        updatedBlog.comments = existingBlog.comments;

        // let updatedBlog = {
        //     title: title,
        //     body: body,
        //     userThatPosted: existingBlog.userThatPosted,
        //     comments: existingBlog.comments
        // }

        console.log(updatedBlog);

        const updatedInfo = await blogCol.updateOne({ _id: ObjectId(_id) }, { $set: updatedBlog });
        if (updatedInfo.modifiedCount === 0) throw 'Could not update blog';
        console.log("modifiedCount", updatedInfo);
        console.log(updatedBlog.userThatPosted);
        // updatedBlog.userThatPosted._id = userThatPosted._id.toString();
        console.log("to string");
        console.log("updatedBlog", updatedBlog);
        // return (await this.getBlog(_id));
        return updatedBlog;
    },

    async createComment(blogId, comment, userThatPosted) {
        const blogList = await blogCollection();
        const blog = await blogList.findOne({ _id: ObjectId(blogId) });
        if (blog === null) throw 'No blog with that ID'

        let newComment = {
            _id: ObjectId(),
            userThatPosted: userThatPosted,
            comment: comment
        }

        let updatedBlog = await blogList.updateOne(
            { _id: ObjectId(blogId) }, { $push: { comments: newComment } }
        );
        if (updatedBlog.modifiedCount === 0) {
            throw 'No blog found to update';
        }

        const blogWithComment = await blogList.findOne({ _id: ObjectId(blogId) });
        if (blogWithComment === null) throw 'No blog with that ID';
        blogWithComment._id = blogId;
        blogWithComment.comments.forEach(key => {
            key._id = key._id.toString();
        });
        // const blogWithComment = await this.getBlog(blogId);
        return blogWithComment;
    },

    async deleteComment(blogId, commentId) {
        const blogList = await blogCollection();
        let commentToDelete, deleteComment;
        const blog = await blogList.findOne({ _id: ObjectId(blogId) });
        if (blog === null) throw 'No blog with that ID'

        commentToDelete = await blogList.findOne({ 'comments._id': ObjectId(commentId) })

        deleteComment = await blogList.updateMany(
            {},
            { $pull: { comments: { _id: ObjectId(commentId) } }, }
        )

        if (deleteComment.modifiedCount === 0) throw 'Could not delete comment';

        return 'Deleted comment successfully';
    }
}

module.exports = methodsToExport;