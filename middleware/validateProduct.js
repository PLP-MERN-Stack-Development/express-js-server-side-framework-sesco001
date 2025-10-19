const validateProduct = (req, res, next) => {
  const { name, description, price } = req.body;
  if (!name || !description || price === undefined) {
    return res.status(400).json({ error: 'Missing required fields: name, description, price' });
  }
  next();
};
module.exports = validateProduct;
