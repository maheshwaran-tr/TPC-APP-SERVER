import jwt from 'jsonwebtoken';

const generateAccessToken = (userId) => {
  // Payload now includes id, username, and roles
  const payload = {
    id: userId,
  };

  // Options for the token, including the expiration time
  const options = {
    expiresIn: '24h',
  };

  // Generate the token by signing the payload with the secret key and options
  return jwt.sign(payload, process.env.JWT_SECRET, options);
};

const generateRefreshToken = (userId) => {
  // Payload now includes id, username, and roles
  const payload = {
    id: userId,
  };

  // Options for the token, including the expiration time
  const options = {
    expiresIn: '7d',
  };

  // Generate the token by signing the payload with the secret key and options
  return jwt.sign(payload, process.env.JWT_REFRESH_KEY, options);
};

export default { generateAccessToken, generateRefreshToken };
