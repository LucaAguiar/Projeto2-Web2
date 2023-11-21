const Sequelize = require("sequelize");
const sequelize = new Sequelize("projeto2_db", "postgres", "admin", {
    host: "localhost",
    dialect: "postgres",
});

var db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.User = require("../models/user.js")(sequelize, Sequelize);
db.Post = require("../models/post.js")(sequelize, Sequelize);
db.Comment = require("../models/comment.js")(sequelize, Sequelize);

db.User.hasMany(db.Comment, {
    foreignKey: "user_id",
    onDelete: "NO ACTION",
});
db.User.hasMany(db.Post, {
    foreignKey: "user_id",
    onDelete: "NO ACTION",
});
db.Post.hasMany(db.Comment, {
    foreignKey: "post_id",
    onDelete: "NO ACTION",
});

module.exports = db;
