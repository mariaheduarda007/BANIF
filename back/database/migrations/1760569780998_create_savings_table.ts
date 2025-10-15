import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'savings'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.float('value').notNullable()
      table.string('account_number_fk').references('account_number').inTable('account')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}