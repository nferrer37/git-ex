/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    knex.schema.createTable('employees', function (table) {
        table.increments();
        table.string('employee_id');
        table.string('last_name');
        table.string('first_name');
        table.string('birth_date');
        table.string('phone_number');
        table.string('home_address');
        table.string('social_security_number');
        table.timestamps('created_at').defaultTo(knex.fn.now);
        table.timestamps('updated_at').defaultTo(knex.fn.now);
      })
      
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  knex.schema.dropTableIfExists('employees')
};
