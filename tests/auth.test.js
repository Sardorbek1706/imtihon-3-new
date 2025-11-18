import request from 'supertest';
import app from '../src/app'; // Adjust the path as necessary
import { createUser, loginUser } from './utils/auth'; // Utility functions for creating and logging in users

describe('Auth API', () => {
  let token;

  beforeAll(async () => {
    // Create a user before running tests
    const user = await createUser({
      email: 'test@example.com',
      username: 'testuser',
      password: 'password123',
      role: 'user',
    });
    token = await loginUser({
      email: user.email,
      password: 'password123',
    });
  });

  it('should sign up a new user', async () => {
    const response = await request(app)
      .post('/auth/signup')
      .send({
        email: 'newuser@example.com',
        username: 'newuser',
        password: 'password123',
        confirmPassword: 'password123',
        role: 'user',
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message', 'User created');
  });

  it('should sign in an existing user', async () => {
    const response = await request(app)
      .post('/auth/signin')
      .send({
        email: 'test@example.com',
        password: 'password123',
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('accessToken');
    expect(response.body).toHaveProperty('refreshToken');
  });

  it('should get current user details', async () => {
    const response = await request(app)
      .get('/auth/me')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('email', 'test@example.com');
    expect(response.body).toHaveProperty('username', 'testuser');
  });

  it('should log out the user', async () => {
    const response = await request(app)
      .get('/auth/logout')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Logout successful');
  });

  it('should refresh the access token', async () => {
    const response = await request(app)
      .post('/auth/refresh-token')
      .send({
        refreshToken: token,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('accessToken');
    expect(response.body).toHaveProperty('refreshToken');
  });
});