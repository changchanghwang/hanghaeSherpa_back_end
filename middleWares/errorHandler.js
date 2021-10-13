module.exports = {
  errorHandler(err, req, res, next) {
    // res.locals.message = err.message;
    // res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    console.error(err.stack);
    res.status(err.status || 500).send('에러가 발생했습니다');
  },
};
