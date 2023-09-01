// "use strict";
// const util = require('util');
// global.TextEncoder = util.TextEncoder;
// global.TextDecoder = util.TextDecoder;
const express = require("express");
require("dotenv").config();
require("./mongo");
const UserRoutes = require("./src/Routes/User");
const MsgRoutes = require("./src/Routes/Message");
const dexApiRoutes = require("./src/Routes/dexapi");
const app = express();
app.use(express.json());

app.listen(process.env.PORT, () => {
  console.log(`Server Running on port ${process.env.PORT}`);
});
app.use("/User", UserRoutes);
app.use("/msg", MsgRoutes);
app.use("/api", dexApiRoutes);
