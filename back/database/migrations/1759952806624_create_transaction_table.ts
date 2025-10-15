import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'transaction'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.bigInteger('value').notNullable()
      table.boolean('type').notNullable()
      table.string('account_number_transfer').notNullable()
      table.string('account_number_fk').references('account_number').inTable('account')
      table.timestamp('created_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
