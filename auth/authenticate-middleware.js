const jwt = require("jsonwebtoken");

function restrict() {
  return async (req, res, next) => {
    const authError = {
      message: "Invalid credentials",
    };

    try {
      const token = req.headers.token;
      if (!token) {
        return res.status(401).json(authError);
      }

      jwt.verify(
        token,
        "the shire was too beautiful to behold",
        (err, decoded) => {
          if (err) {
            return res.status(401).json(authError);
          }

          next();
        }
      );
    } catch (err) {
      next(err);
    }
  };
}

module.exports = restrict;
