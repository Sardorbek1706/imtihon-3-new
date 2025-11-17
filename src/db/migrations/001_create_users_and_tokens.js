exports.up = function(knex) {
  return knex.schema
    .createTable('users', function(table) {
      table.uuid('id').primary();
      table.string('email').notNullable().unique();
      table.string('username').notNullable().unique();
      table.string('password').notNullable();
      table.enu('role', ['user','admin','superadmin']).notNullable().defaultTo('user');
      table.enu('status', ['active','inactive']).notNullable().defaultTo('inactive');
      table.string('otp_code');
      table.timestamp('otp_expire');
      table.timestamps(true, true);
    })
    .createTable('refresh_tokens', function(table) {
      table.uuid('id').primary();
      table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE');
      table.text('token').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
    .createTable('products', function(table) {
      table.uuid('id').primary();
      table.string('name').notNullable();
      table.text('description');
      table.decimal('price', 12, 2).notNullable().defaultTo(0);
      table.string('category');
      table.integer('quantity').defaultTo(0);
      table.enu('status', ['available','out of stock','discontinued']).defaultTo('available');
      table.text('image_urls');
      table.timestamps(true, true);
    })
    .createTable('categories', function(table) {
      table.uuid('id').primary();
      table.string('name').notNullable();
      table.uuid('parent_id').nullable();
      table.timestamps(true, true);
    })
    .createTable('tags', function(table) {
      table.uuid('id').primary();
      table.string('name').notNullable();
      table.timestamps(true, true);
    })
    .createTable('discounts', function(table) {
      table.uuid('id').primary();
      table.uuid('product_id').references('id').inTable('products').onDelete('CASCADE');
      table.integer('discount_percent');
      table.timestamp('start_date');
      table.timestamp('end_date');
      table.timestamps(true, true);
    })
    .createTable('product_tags', function(table) {
      table.uuid('product_id').references('id').inTable('products').onDelete('CASCADE');
      table.uuid('tag_id').references('id').inTable('tags').onDelete('CASCADE');
      table.primary(['product_id','tag_id']);
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('product_tags')
    .dropTableIfExists('discounts')
    .dropTableIfExists('tags')
    .dropTableIfExists('categories')
    .dropTableIfExists('products')
    .dropTableIfExists('refresh_tokens')
    .dropTableIfExists('users');
};
