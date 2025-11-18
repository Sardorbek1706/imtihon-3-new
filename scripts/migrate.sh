#!/bin/bash

# Migrate the database
npx knex migrate:latest --knexfile knexfile.ts

# Seed the database
npx knex seed:run --knexfile knexfile.ts

echo "Database migration and seeding completed."