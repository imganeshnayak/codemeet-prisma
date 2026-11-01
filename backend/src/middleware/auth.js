const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';
const TOKEN_TTL = process.env.JWT_EXPIRES_IN || '7d';

function signToken(user) {
  return jwt.sign({ sub: user._id.toString() }, JWT_SECRET, {
    expiresIn: TOKEN_TTL,
  });
}

async function requireAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const [scheme, token] = header.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ message: 'Authentication required.' });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(payload.sub);

    if (!user) {
      return res.status(401).json({ message: 'Session expired. Please sign in again.' });
    }

    req.user = user;
    return next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: 'Invalid or expired session. Please sign in again.' });
  }
}

async function optionalAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const [scheme, token] = header.split(' ');
<<<<<<< HEAD

  if (scheme !== 'Bearer' || !token) {
    return next();
  }
=======
  if (scheme !== 'Bearer' || !token) return next();
>>>>>>> 0303c8b7b5059b2184fe3e764716173c9a058922

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(payload.sub);
<<<<<<< HEAD
    if (user) {
      req.user = user;
    }
  } catch (error) {
    // Ignore invalid tokens for optional auth
  }

  return next();
}

module.exports = { requireAuth, optionalAuth, signToken };
=======
    if (user) req.user = user;
  } catch (error) {
    // ignore invalid tokens for optional auth
  }
  return next();
}

module.exports = { requireAuth, signToken, optionalAuth };
>>>>>>> 0303c8b7b5059b2184fe3e764716173c9a058922
