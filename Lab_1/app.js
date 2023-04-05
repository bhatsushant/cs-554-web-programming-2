const express = require('express');
const configRoutes = require('./routes');
// const { updateBlog, deleteComment, getBlog, getAllBlogs } = require('./data/blog');
const session = require('express-session');
const app = express();

app.use(express.json());

app.use(session({
    name: 'AuthCookie',
    secret: 'some secret string!',
    resave: false,
    saveUninitialized: true
}));

// app.use("/blog", async (req, res, next) => {
//     if (req.method == 'POST' || req.method == 'PUT' || req.method == 'PATCH') {
//         if (!(req.url === "/blog/login") || !(req.url === "/blog/signup")) {
//             if (!req.session.user) {
//                 res.status(401).send("User must be logged in");
//                 return;
//             } else {
//                 if (req.method == 'PUT' || req.method == 'PATCH') {
//                     const existingBlog = await getBlog(_id);
//                     if (existingBlog.userThatPosted._id === req.session.user._id) {
//                         next();
//                     } else {
//                         throw { statusCode: 401, error: "Users can only update their own blogs" };
//                     }
//                 }
//             }
//         }
//     }
//     next();
// })

// app.use("/blog/:id/comments", async (req, res, next) => {
//     if (req.method == 'POST') {
//         if (!req.session.user) {
//             res.status(401).send("User must be logged in");
//             return;
//         }
//     }
//     next();
// })

// app.use("/blog/:blogId/:commentId", async (req, res, next) => {
//     if (req.method == 'POST' || req.method == 'DELETE') {
//         if (!req.session.user) {
//             res.status(401).send("User must be logged in");
//             return;
//         } else {
//             if (req.method == 'DELETE') {
//                 let userId;
//                 existingBlog.comments.forEach((key) => {
//                     userId = key.userThatPosted._id;
//                 });

//                 if (userId === req.session.user._id) {
//                     next();
//                 }
//             }
//         }
//     }
//     next();
// })

configRoutes(app);

app.listen(3000);