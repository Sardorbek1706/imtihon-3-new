import { Knex } from 'knex';

export const up = async (knex: Knex) => {
  await knex.schema.createTable('categories', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.string('name').notNullable();
    table.uuid('parentId').nullable().references('id').inTable('categories');
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now()).onUpdate(knex.fn.now());
  });
};

export const down = async (knex: Knex) => {
  await knex.schema.dropTableIfExists('categories');
};