import request from 'supertest';
import app from '../src/app'; // Adjust the path as necessary
import { createProduct, deleteProduct } from '../src/services/products.service'; // Adjust the path as necessary

describe('Product API Tests', () => {
  let productId;

  beforeAll(async () => {
    // Create a product for testing
    const product = {
      name: 'Test Product',
      description: 'This is a test product',
      price: 99.99,
      category: 'electronics',
      quantity: 10,
      status: 'available',
      imageUrls: ['http://example.com/image.jpg'],
      tags: []
    };

    const response = await createProduct(product);
    productId = response.productId;
  });

  afterAll(async () => {
    // Clean up the created product
    await deleteProduct(productId);
  });

  it('should create a new product', async () => {
    const newProduct = {
      name: 'New Product',
      description: 'This is a new product',
      price: 49.99,
      category: 'clothing',
      quantity: 5,
      status: 'available',
      imageUrls: ['http://example.com/new-image.jpg'],
      tags: []
    };

    const response = await request(app)
      .post('/products')
      .send(newProduct)
      .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`); // Use a valid test token

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Product created');
    expect(response.body.productId).toBeDefined();
  });

  it('should get all products', async () => {
    const response = await request(app)
      .get('/products')
      .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`); // Use a valid test token

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should get a product by ID', async () => {
    const response = await request(app)
      .get(`/products/${productId}`)
      .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`); // Use a valid test token

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(productId);
  });

  it('should update a product', async () => {
    const updatedProduct = {
      name: 'Updated Product',
      description: 'This is an updated product',
      price: 59.99,
      category: 'electronics',
      quantity: 15,
      status: 'available',
      imageUrls: ['http://example.com/updated-image.jpg'],
      tags: []
    };

    const response = await request(app)
      .put(`/products/${productId}`)
      .send(updatedProduct)
      .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`); // Use a valid test token

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Product updated');
  });

  it('should delete a product', async () => {
    const response = await request(app)
      .delete(`/products/${productId}`)
      .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`); // Use a valid test token

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Product deleted');
  });
});