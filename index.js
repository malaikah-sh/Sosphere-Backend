const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./mongo");

const UserRoutes = require("./src/Routes/userRoutes");
const MsgRoutes = require("./src/Routes/Message");
const dexApiRoutes = require("./src/Routes/dexapi");
const searchRoutes = require("./src/Routes/search");
const alertRoutes = require("./src/Routes/alertRoutes"); // ✅ Import alert routes
const shelterRoutes = require("./src/Routes/shelterRoutes"); // ✅ Import shelter routes
const forumRoutes = require("./src/Routes/forumRoutes"); // ✅ Import forum routes

const app = express();
app.use(express.json());
app.use(cors());

// Register routes
app.use("/User", UserRoutes);
app.use("/msg", MsgRoutes);
app.use("/api", dexApiRoutes);
app.use("/search", searchRoutes);
app.use("/alert", alertRoutes); // ✅ Alert API
app.use("/shelter", shelterRoutes); // ✅ Shelter API
app.use("/forum", forumRoutes); // ✅ Community Forum API

const PORT = process.env.PORT || 4444;
app.listen(PORT, () => {
  console.log(`🚀 Server Running on port ${PORT}`);
});

const listEndpoints = require("express-list-routes");
listEndpoints(app);
