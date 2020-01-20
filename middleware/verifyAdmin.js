const User = require("../users/User");
async function verifyAdmin(req, res, next) {
  try {
    const user = await User.findById(req.payload.UserID);
    if (!user || !user.admin) {
      return res.sendStatus(403);
    }
    next();
  }
  catch (err) {
    next(err);
  }
}
exports.verifyAdmin = verifyAdmin;
