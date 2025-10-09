import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'transaction'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('amount').notNullable()
      table.dateTime('date', { useTz: true }).notNullable()
      table.boolean('type').notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
