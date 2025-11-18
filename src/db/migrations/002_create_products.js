import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('products', (table) => {
    table.uuid('id').primary();
    table.string('name').notNullable();
    table.text('description').notNullable();
    table.decimal('price', 10, 2).notNullable();
    table.enu('category', ['electronics', 'clothing', 'grocery']).notNullable();
    table.integer('quantity').notNullable();
    table.enu('status', ['available', 'out of stock', 'discontinued']).notNullable();
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now()).onUpdate(knex.fn.now());
    table.specificType('imageUrls', 'text[]').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('products');
}