const express = require('express');
const router = express.Router();
const db = require('../db');
const { authenticate, authorize } = require('../middlewares/auth');

// Create product (admin only)
router.post('/', authenticate, authorize(['admin','superadmin']), async (req, res, next) => {
  try {
    const { name, description, price, category, quantity, status, imageUrls } = req.body;
    const id = require('uuid').v4();
    await db('products').insert({
      id, name, description, price, category, quantity, status, image_urls: JSON.stringify(imageUrls || [])
    });
    res.status(201).json({ productId: id, message: 'Product created' });
  } catch (err) { next(err); }
});

// Get all products (auth required)
router.get('/', authenticate, async (req, res, next) => {
  try {
    const rows = await db('products').select('*');
    const data = rows.map(r => ({ ...r, imageUrls: JSON.parse(r.image_urls || '[]') }));
    res.json(data);
  } catch (err) { next(err); }
});

// Get product by id
router.get('/:id', authenticate, async (req, res, next) => {
  try {
    const r = await db('products').where({ id: req.params.id }).first();
    if (!r) return res.status(404).json({ message: 'Not found' });
    r.imageUrls = JSON.parse(r.image_urls || '[]');
    res.json(r);
  } catch (err) { next(err); }
});

// Update product (admin)
router.put('/:id', authenticate, authorize(['admin','superadmin']), async (req, res, next) => {
  try {
    const updates = req.body;
    if (updates.imageUrls) updates.image_urls = JSON.stringify(updates.imageUrls);
    await db('products').where({ id: req.params.id }).update(updates);
    res.json({ id: req.params.id, message: 'Product updated' });
  } catch (err) { next(err); }
});

// Delete product (admin)
router.delete('/:id', authenticate, authorize(['admin','superadmin']), async (req, res, next) => {
  try {
    await db('products').where({ id: req.params.id }).del();
    res.json({ message: 'Product deleted' });
  } catch (err) { next(err); }
});

module.exports = router;
