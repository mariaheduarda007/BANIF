import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'accounts'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('agency_number').notNullable()
      table.integer('account_number').notNullable()
      table.float('balance').notNullable().defaultTo(0)
      table.integer('id_user_fk').unsigned().references('id').inTable('users')
      table.timestamp('created_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
