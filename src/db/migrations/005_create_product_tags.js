import { Knex } from 'knex';

export const up = async (knex: Knex) => {
  await knex.schema.createTable('product_tags', (table) => {
    table.uuid('productId').references('id').inTable('products').onDelete('CASCADE');
    table.uuid('tagId').references('id').inTable('tags').onDelete('CASCADE');
    table.primary(['productId', 'tagId']);
    table.timestamps(true, true);
  });
};

export const down = async (knex: Knex) => {
  await knex.schema.dropTableIfExists('product_tags');
};