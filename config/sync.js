const db = require("./index");

async function syncDB() {
  await db.Users.sync({ force: true });
  await db.Posts.sync({ force: true });
  await db.Comments.sync({ force: true });
}
syncDB();
