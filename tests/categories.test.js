import request from 'supertest';
import app from '../src/app'; // Adjust the path as necessary
import { createCategory, getCategories, updateCategory, deleteCategory } from '../src/controllers/categories.controller';

describe('Categories API', () => {
  let categoryId;

  beforeAll(async () => {
    const response = await createCategory({ name: 'Test Category' });
    categoryId = response.id;
  });

  afterAll(async () => {
    await deleteCategory(categoryId);
  });

  it('should create a new category', async () => {
    const response = await request(app)
      .post('/categories')
      .send({ name: 'New Category' })
      .expect(201);

    expect(response.body).toHaveProperty('categoryId');
    expect(response.body.message).toBe('Category created');
  });

  it('should get all categories', async () => {
    const response = await request(app)
      .get('/categories')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should get a category by ID', async () => {
    const response = await request(app)
      .get(`/categories/${categoryId}`)
      .expect(200);

    expect(response.body).toHaveProperty('id', categoryId);
  });

  it('should update a category', async () => {
    const response = await request(app)
      .put(`/categories/${categoryId}`)
      .send({ name: 'Updated Category' })
      .expect(200);

    expect(response.body).toHaveProperty('categoryId', categoryId);
    expect(response.body.message).toBe('Category updated');
  });

  it('should delete a category', async () => {
    const response = await request(app)
      .delete(`/categories/${categoryId}`)
      .expect(200);

    expect(response.body.message).toBe('Category deleted');
  });
});