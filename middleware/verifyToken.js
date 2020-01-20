const jwt = require("jsonwebtoken");
const { secretKey } = require("../config");
function verifyToken(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(403).json({
      message: "forbidden"
    });
  }
  jwt.verify(token, secretKey, (err, payload) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.payload = payload;
    next();
  });
}
exports.verifyToken = verifyToken;
