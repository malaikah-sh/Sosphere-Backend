const mongoose = require("mongoose");

// Fix the Mongoose warning
mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.DB_Connection, {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log(
      `Connected to Mongo! Database name: "${con.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to Mongo", err);
  });

module.exports = mongoose;
