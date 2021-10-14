const jwt = require('jsonwebtoken');
const { User } = require('../models');

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization === undefined) {
    return res.status(401).json({});
  }
  const [bearer, token] = authorization.split(' ');
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findOne({
      where: { userId: decoded.userId },
    });

    res.locals.user = user.id;

    console.log('로컬 유저는?', res.locals.user);

    next();
  } catch (err) {
    console.error(err);
  }
};
