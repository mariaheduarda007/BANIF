import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'account'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('account_number').primary()
      table.integer('agency_number').notNullable()
      table.float('balance').notNullable().defaultTo(0)
      table.integer('id_user_fk').unsigned().references('id').inTable('users')
      table.timestamp('created_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
