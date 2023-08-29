const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const express = require("express");
require("dotenv").config();
require("./mongo");
const TransactionRoutes = require("./src/Routes/Transaction");
const UserRoutes = require("./src/Routes/User");
const MsgRoutes = require("./src/Routes/Message");
const dexApiRoutes = require("./src/Routes/dexapi");
const app = express();
app.use(express.json());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(process.env.PORT, () => {
  console.log(`Server Running on port ${process.env.PORT}`);
});
app.use("/Transaction", TransactionRoutes);
app.use("/User", UserRoutes);
app.use("/msg", MsgRoutes);
app.use("/api", dexApiRoutes);
