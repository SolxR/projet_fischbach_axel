const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).json({ error: 'Accès non autorisé. Token absent.' });
  }

  try {
    let token = '';

    if (authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7, authHeader.length); 
    } else {
      token = authHeader;
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: 'Token invalide' });
  }
};
