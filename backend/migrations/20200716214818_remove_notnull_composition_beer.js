exports.up = knex => {
    return knex.schema
      .alterTable('beer', (table) => {
        table.integer('compositionId').nullable().alter();
      });
  };
  
  exports.down = knex => {
    return knex.schema
      .alterTable('beer', table => {
        table.integer('compositionId').notNullable().alter();
      });
  };