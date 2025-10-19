const auth = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (apiKey === 'mysecretkey123') {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized: Invalid or missing API key' });
  }
};
module.exports = auth;
