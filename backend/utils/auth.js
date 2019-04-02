const jwt = require('jsonwebtoken');

const createToken = (admin, expiresIn) => {
  const { email, name } = admin;
  return jwt.sign({ email, name }, process.env.APP_SECRET, { expiresIn });
};

/**
 * Attemps to decode the token to grant permission before performing some queries/mutations
 * @param {string} token
 */
const checkAuthToken = async token => {
  if (token) {
    try {
      const adminData = await jwt.verify(token, process.env.APP_SECRET);
      return { isAuthenticated: true, adminData };
    } catch (e) {
      return { isAuthenticated: false, adminData: null };
    }
  } else {
    return { isAuthenticated: false, adminData: null };
  }
};

exports.checkAuthToken = checkAuthToken;
exports.createToken = createToken;
