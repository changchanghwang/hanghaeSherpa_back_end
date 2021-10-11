const jwt = require('jsonwebtoken');
const { User } = require('../models');

module.exports = async (req, res, next) => {
  const cookie = req.cookies.user;

  if (cookie === undefined) {
    res.status(401).send({});
  } else {
    try {
      const decoded = jwt.verify(cookie, process.env.SECRET_KEY);

      const user = await User.findOne({ 
          where : { userId: decoded.userId } 
        });

      res.locals.user = user.userId;

      console.log('로컬 유저는?', res.locals.user);
      
      next();

    } catch (error) {
      res.status(400).send({});
    }
  }
};
