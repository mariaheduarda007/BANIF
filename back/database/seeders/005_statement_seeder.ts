import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Statement from '#models/statement'

export default class extends BaseSeeder {
  async run() {
    await Statement.createMany([
      {
        id: 1,
        value: 40,
        type: false,
        origin: "Investimento",
        account_number_fk:'12345678900'
      },
      
    ])
  }
}
