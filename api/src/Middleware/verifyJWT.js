const jwt = require("jsonwebtoken");

const verifyJwt = (req, res, next) => {
  try {
    console.log("in middleware");
    const bearerHeader = req.headers["authorization"];

    if (bearerHeader) {
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];
      req.token = bearerToken;
      jwt.verify(bearerToken, process.env.JWT_SECRET_KEY, (err, isValid) => {
        if (err) {
          // console.log(err);
          return res.status(401).json({
            error: "Unauthorized",
          });
        }
        if (isValid) {
          next();
        }
      });
    } else {
      res.sendStatus(403);
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = verifyJwt;
