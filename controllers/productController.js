const { v4: uuidv4 } = require('uuid');
let products = [
  { id: '1', name: 'Laptop', description: '16GB RAM', price: 1200, category: 'electronics', inStock: true },
  { id: '2', name: 'Phone', description: '128GB Storage', price: 800, category: 'electronics', inStock: true },
  { id: '3', name: 'Coffee Maker', description: 'Automatic timer', price: 50, category: 'kitchen', inStock: false }
];

// GET all products + filter/search/pagination
exports.getProducts = (req, res) => {
  let result = [...products];
  const { category, search, page = 1, limit = 10 } = req.query;

  if (category) result = result.filter(p => p.category === category);
  if (search)
    result = result.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );

  const start = (page - 1) * limit;
  const end = start + parseInt(limit);

  res.json({
    total: result.length,
    page: parseInt(page),
    limit: parseInt(limit),
    products: result.slice(start, end)
  });
};

// GET product by ID
exports.getProduct = (req, res, next) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return next({ status: 404, message: 'Product not found' });
  res.json(product);
};

// POST new product
exports.createProduct = (req, res) => {
  const { name, description, price, category, inStock } = req.body;
  const newProduct = { id: uuidv4(), name, description, price, category, inStock };
  products.push(newProduct);
  res.status(201).json(newProduct);
};

// PUT update product
exports.updateProduct = (req, res, next) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return next({ status: 404, message: 'Product not found' });

  const { name, description, price, category, inStock } = req.body;
  if (name) product.name = name;
  if (description) product.description = description;
  if (price) product.price = price;
  if (category) product.category = category;
  if (inStock !== undefined) product.inStock = inStock;

  res.json(product);
};

// DELETE product
exports.deleteProduct = (req, res, next) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return next({ status: 404, message: 'Product not found' });
  const deleted = products.splice(index, 1);
  res.json({ message: 'Deleted successfully', product: deleted[0] });
};

// GET product stats (count by category)
exports.getProductStats = (req, res) => {
  const stats = products.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {});
  res.json(stats);
};
