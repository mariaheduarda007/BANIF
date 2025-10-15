import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'address'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('street').nullable()
      table.string('neighborhood').notNullable()
      table.integer('number').notNullable()
      table.string('city').notNullable()
      table.string('state').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
