import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'transaction'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.bigInteger('value').notNullable()
      table.string('account_number_sender').notNullable()
      table.string('account_number_recipient').notNullable
      table.timestamp('created_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
