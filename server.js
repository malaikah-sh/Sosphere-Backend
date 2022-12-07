const express = require("express");
require("dotenv").config();
require("./mongo");
const UserRoutes = require("./src/Routes/user");
const PostRoutes = require("./src/Routes/post");
const CommentsRoutes = require("./src/Routes/comment");
const app = express();
app.use(express.json());
app.listen(process.env.PORT, () => {
  console.log(`Server Running on port ${process.env.PORT}`);
});
app.use("/user", UserRoutes);
app.use("/post", PostRoutes);
app.use("/comments", CommentsRoutes);
