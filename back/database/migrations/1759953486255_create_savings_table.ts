import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'savings'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.float('value').notNullable()
      table.integer('id_user_fk').unsigned().references('id').inTable('users')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}