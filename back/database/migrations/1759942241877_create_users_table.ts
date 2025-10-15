import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id') 
      table.string('cpf', 11).notNullable().unique()
      table.string('name').nullable()
      table.string('email', 254).notNullable().unique()
      table.string('password', 254).notNullable()
      table.integer('id_role_fk').unsigned().defaultTo(2).references('id').inTable('roles')
      table.integer('id_address_fk').unsigned().references('id').inTable('address')
      table.timestamp('created_at').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}