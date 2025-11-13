const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

exports.seed = async function(knex) {
  await knex('refresh_tokens').del();
  await knex('product_tags').del();
  await knex('discounts').del();
  await knex('tags').del();
  await knex('categories').del();
  await knex('products').del();
  await knex('users').del();

  const hash = await bcrypt.hash('password123', 10);
  const adminId = uuidv4();
  const userId = uuidv4();

  await knex('users').insert([
    { id: adminId, email: 'admin@example.com', username: 'admin', password: hash, role: 'admin', status: 'active' },
    { id: userId, email: 'user@example.com', username: 'user', password: hash, role: 'user', status: 'active' }
  ]);

  await knex('products').insert([
    { id: uuidv4(), name: 'Sample Product', description: 'A sample product', price: 9.99, category: 'electronics', quantity: 10, status: 'available', image_urls: JSON.stringify([]) }
  ]);
};
