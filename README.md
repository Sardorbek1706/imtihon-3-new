# Product Catalog API

## Overview

The Product Catalog API is a RESTful API designed to manage a product catalog, including users, products, categories, tags, and discounts. It provides endpoints for user authentication, product management, and more, ensuring a robust and scalable solution for e-commerce applications.

## Features

- User authentication and authorization
- CRUD operations for products, categories, tags, and discounts
- Role-based access control
- JWT-based authentication
- Database migrations and seeding

## Technologies Used

- **Node.js**: JavaScript runtime for building the API
- **Express.js**: Web framework for building the API
- **PostgreSQL**: Relational database for storing data
- **Knex.js**: SQL query builder for database interactions
- **JWT**: For secure user authentication
- **TypeScript**: For type safety and better development experience

## Project Structure

```
product-catalog-api
├── src
│   ├── app.ts
│   ├── server.ts
│   ├── config
│   │   └── index.ts
│   ├── routes
│   │   ├── index.ts
│   │   ├── auth.routes.ts
│   │   ├── products.routes.ts
│   │   ├── categories.routes.ts
│   │   ├── tags.routes.ts
│   │   └── discounts.routes.ts
│   ├── controllers
│   │   ├── auth.controller.ts
│   │   ├── products.controller.ts
│   │   ├── categories.controller.ts
│   │   ├── tags.controller.ts
│   │   └── discounts.controller.ts
│   ├── services
│   │   ├── auth.service.ts
│   │   ├── products.service.ts
│   │   ├── categories.service.ts
│   │   ├── tags.service.ts
│   │   └── discounts.service.ts
│   ├── repositories
│   │   ├── user.repository.ts
│   │   ├── product.repository.ts
│   │   ├── category.repository.ts
│   │   ├── tag.repository.ts
│   │   └── discount.repository.ts
│   ├── models
│   │   ├── user.model.ts
│   │   ├── product.model.ts
│   │   ├── category.model.ts
│   │   ├── tag.model.ts
│   │   └── discount.model.ts
│   ├── dtos
│   │   └── index.ts
│   ├── middlewares
│   │   ├── auth.middleware.ts
│   │   ├── role.middleware.ts
│   │   └── error.middleware.ts
│   ├── utils
│   │   ├── logger.ts
│   │   ├── jwt.ts
│   │   └── validators.ts
│   └── db
│       ├── knex.ts
│       ├── migrations
│       │   ├── 001_create_users.ts
│       │   ├── 002_create_products.ts
│       │   ├── 003_create_categories.ts
│       │   ├── 004_create_tags.ts
│       │   ├── 005_create_product_tags.ts
│       │   └── 006_create_discounts.ts
│       └── seeds
│           └── initial.seed.ts
├── tests
│   ├── auth.test.ts
│   ├── products.test.ts
│   └── categories.test.ts
├── scripts
│   ├── start.sh
│   └── migrate.sh
├── .env.example
├── .gitignore
├── knexfile.ts
├── package.json
├── tsconfig.json
├── jest.config.ts
├── Dockerfile
├── docker-compose.yml
└── README.md
```

## Getting Started

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/product-catalog-api.git
   ```

2. Navigate to the project directory:
   ```
   cd product-catalog-api
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Set up the environment variables by copying the example:
   ```
   cp .env.example .env
   ```

5. Run database migrations:
   ```
   npm run migrate
   ```

6. Start the application:
   ```
   npm start
   ```

## API Documentation

Refer to the API documentation for detailed information on available endpoints, request/response formats, and examples.

## Testing

To run tests, use the following command:
```
npm test
```

## License

This project is licensed under the MIT License. See the LICENSE file for more details.