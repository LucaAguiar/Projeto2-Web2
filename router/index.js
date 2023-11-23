const express = require("express");
const db = require("../config");
const userController = require("../controllers/userController");
const commentController = require("../controllers/commentController");
const postController = require("../controllers/postController");
const route = express.Router();

/*db.sequelize.sync({ force: true }).then(() => {
    console.log("{ force: true }");
});*/

// Users routes:
route.get("/getUsers", userController.getUsers);
route.get("/getUserByName/:name", userController.getUserByName);
route.post("/createUser", userController.createUser);
route.put("/updateUser/:id", userController.updateUser);
route.delete("/deleteUser/:id", userController.deleteUser);

// Posts routes:
route.get("/getPosts", postController.getPosts);
route.get("/getPostById/:id", postController.getPostById);
route.get("/getPostByUserId/:id", postController.getPostByUserId);
route.post("/createPost", postController.createPost);
route.delete("/deletePost/:id", postController.deletePost);

// Comments routes:
route.get("/getComments", commentController.getComments);
route.get("/getCommentsByPostId/:id", commentController.getCommentsByPostId);
route.post("/createComment", commentController.createComment);
route.delete("/deleteComment/:id", commentController.deleteComment);

module.exports = route;
