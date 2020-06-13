
exports.up = function(knex) {
  return knex.schema.createTable('beer', table => {
    table.increments('id').primary()
    table.string('name').notNull()
    table.string('subtitle')
    table.integer('srm').notNull()
    table.integer('ibu').notNull()
    table.float('alcohol').notNull()
    table.string('description', 1000).notNull()
    table.string('imageUrl', 1000)
    table.integer('brewerId').references('id').inTable('users').notNull()
    table.integer('styleId').references('id').inTable('style').notNull()
    table.integer('smellId').references('id').inTable('smell').notNull()
    table.integer('appearanceId').references('id').inTable('appearance').notNull()
    table.integer('compositionId').references('id').inTable('composition').notNull()
  })
};

exports.down = function(knex) {
    return knex.schema.dropTable('beer')
};
