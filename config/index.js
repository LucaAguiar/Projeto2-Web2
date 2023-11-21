const Sequelize = require("sequelize");
const sequelize = new Sequelize("projeto2_db", "postgres", "admin", {
    host: "localhost",
    dialect: "postgres",
});

var db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Users = require("../models/user.js")(sequelize, Sequelize);
db.Posts = require("../models/post.js")(sequelize, Sequelize);
db.Comments = require("../models/comment.js")(sequelize, Sequelize);

db.Users.hasMany(db.Comments, {
    foreignKey: "user_id",
    onDelete: "NO ACTION",
});
db.Users.hasMany(db.Posts, {
    foreignKey: "user_id",
    onDelete: "NO ACTION",
});
db.Posts.hasMany(db.Comments, {
    foreignKey: "post_id",
    onDelete: "NO ACTION",
});

module.exports = db;
