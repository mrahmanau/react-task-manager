const jwt = require("jsonwebtoken");

/**
 * Generates a JSON Web Token for the given user ID.
 *
 * @param {string} userId - The unique identifier of the user.
 * @returns {string} A signed JWT valid for 30 days.
 */
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = generateToken;
