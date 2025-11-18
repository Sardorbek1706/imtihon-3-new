import { Knex } from 'knex';

export const up = async (knex: Knex) => {
  await knex.schema.createTable('discounts', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.uuid('productId').notNullable().references('id').inTable('products').onDelete('CASCADE');
    table.integer('discountPercent').notNullable();
    table.timestamp('startDate').notNullable();
    table.timestamp('endDate').notNullable();
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
  });
};

export const down = async (knex: Knex) => {
  await knex.schema.dropTableIfExists('discounts');
};