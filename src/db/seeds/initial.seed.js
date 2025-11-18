import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('users').del();
  await knex('products').del();
  await knex('categories').del();
  await knex('tags').del();
  await knex('discounts').del();

  // Inserts seed entries
  await knex('users').insert([
    { id: '1', email: 'admin@example.com', username: 'admin', password: 'hashed_password', role: 'admin', status: 'active', createdAt: new Date(), updatedAt: new Date() },
    { id: '2', email: 'user@example.com', username: 'user', password: 'hashed_password', role: 'user', status: 'active', createdAt: new Date(), updatedAt: new Date() },
  ]);

  await knex('categories').insert([
    { id: '1', name: 'Electronics', createdAt: new Date(), updatedAt: new Date() },
    { id: '2', name: 'Clothing', createdAt: new Date(), updatedAt: new Date() },
  ]);

  await knex('products').insert([
    { id: '1', name: 'Smartphone', description: 'Latest model smartphone', price: 699.99, category: 'Electronics', quantity: 100, status: 'available', createdAt: new Date(), updatedAt: new Date() },
    { id: '2', name: 'T-Shirt', description: 'Comfortable cotton t-shirt', price: 19.99, category: 'Clothing', quantity: 200, status: 'available', createdAt: new Date(), updatedAt: new Date() },
  ]);

  await knex('tags').insert([
    { id: '1', name: 'New Arrival', createdAt: new Date(), updatedAt: new Date() },
    { id: '2', name: 'Sale', createdAt: new Date(), updatedAt: new Date() },
  ]);

  await knex('discounts').insert([
    { id: '1', productId: '1', discountPercent: 10, startDate: new Date(), endDate: new Date(new Date().setDate(new Date().getDate() + 30)), createdAt: new Date(), updatedAt: new Date() },
  ]);
}