const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(err.status || 500).json({
    status: err.status || 500,
    error: err.message || 'Server error',
  });
};
module.exports = errorHandler;
