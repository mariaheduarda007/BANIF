import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'addresses'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('street').nullable()
      table.string('neighborhood').notNullable()
      table.string('number').notNullable()
      table.string('city').notNullable()
      table.string('state').notNullable()

      // table.timestamp('created_at')
      // table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
