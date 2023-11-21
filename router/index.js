const express = require("express");
const db = require("../config");
const userController = require("../controllers/userController");
const commentController = require("../controllers/commentController");
const postController = require("../controllers/postController");
const route = express.Router();

db.sequelize.sync({ force: true }).then(() => {
    console.log("{ force: true }");
});
/*db.User.create({
    login: "admin",
    password: "1234",
    name: "admin",
    type: "admin",
});*/

// User:
route.get("/getUsers", userController.getUsers);
route.post("/createUser", userController.createUser);
route.put("/updateUser/:id", userController.updateUser);
route.delete("/deleteUser/:id", userController.deleteUser);

module.exports = route;
